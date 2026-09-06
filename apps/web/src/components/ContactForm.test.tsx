import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
import type { SendContactResult } from '@/app/actions/sendContact';

const { sendContactMock } = vi.hoisted(() => ({
  sendContactMock: vi.fn<() => Promise<SendContactResult>>(),
}));
// L'action étant mockée, MIN_SUBMIT_DELAY_MS n'est jamais évalué : le
// `useRef(Date.now())` du montage est sans conséquence ici, on vérifie seulement
// que la valeur est bien transmise.
vi.mock('@/app/actions/sendContact', () => ({ sendContact: sendContactMock }));

// Toujours `await user.…` puis `await screen.findBy…` : un `expect` synchrone après un
// clic qui déclenche la validation RHF produirait un avertissement act().
// Ne pas combiner `vi.useFakeTimers()` avec user-event v14 (il attend de vrais timers).
async function remplirFormulaire(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Prénom *'), 'Marie');
  await user.type(screen.getByLabelText('Nom *'), 'Dupont');
  await user.type(screen.getByLabelText('Courriel *'), 'marie@example.com');
  await user.type(
    screen.getByLabelText('Votre message *'),
    'Bonjour, je souhaite en savoir plus sur votre association.',
  );
}

function afficher() {
  return { user: userEvent.setup(), ...render(<ContactForm />) };
}

describe('ContactForm — honeypot', () => {
  it('expose le champ piège au DOM mais le masque aux technologies d’assistance', () => {
    afficher();

    // Un bot lit le DOM : il voit le champ et le remplit.
    expect(screen.getByLabelText('Site web')).toBeInTheDocument();
    // Un humain (ou un lecteur d'écran) ne le voit pas : `aria-hidden` l'exclut.
    expect(screen.queryByRole('textbox', { name: 'Site web' })).toBeNull();
  });
});

describe('ContactForm — validation côté client', () => {
  it('affiche les erreurs Zod et n’appelle pas l’action serveur', async () => {
    const { user } = afficher();

    await user.click(screen.getByRole('button', { name: 'Envoyer mon message' }));

    expect(await screen.findByText('Prénom requis')).toBeInTheDocument();
    expect(screen.getByText('Nom requis')).toBeInTheDocument();
    expect(screen.getByText('Adresse e-mail invalide')).toBeInTheDocument();
    expect(screen.getByText('Message trop court (10 caractères min.)')).toBeInTheDocument();
    expect(sendContactMock).not.toHaveBeenCalled();
  });

  it('refuse un message trop court même si le reste est valide', async () => {
    const { user } = afficher();

    await user.type(screen.getByLabelText('Prénom *'), 'Marie');
    await user.type(screen.getByLabelText('Nom *'), 'Dupont');
    await user.type(screen.getByLabelText('Courriel *'), 'marie@example.com');
    await user.type(screen.getByLabelText('Votre message *'), 'Court');
    await user.click(screen.getByRole('button', { name: 'Envoyer mon message' }));

    expect(await screen.findByText('Message trop court (10 caractères min.)')).toBeInTheDocument();
    expect(sendContactMock).not.toHaveBeenCalled();
  });
});

describe('ContactForm — soumission', () => {
  it('transmet les champs et l’horodatage de montage à l’action', async () => {
    sendContactMock.mockResolvedValue({ ok: true });
    const { user } = afficher();

    await remplirFormulaire(user);
    await user.type(screen.getByLabelText('Téléphone'), '0601020304');
    await user.type(screen.getByLabelText('Objet'), 'Une question');
    await user.click(screen.getByRole('button', { name: 'Envoyer mon message' }));

    await screen.findByText('Merci, votre message est parti !');
    expect(sendContactMock).toHaveBeenCalledWith(
      expect.objectContaining({
        prenom: 'Marie',
        nom: 'Dupont',
        email: 'marie@example.com',
        tel: '0601020304',
        sujet: 'Une question',
        message: 'Bonjour, je souhaite en savoir plus sur votre association.',
        site_web: '',
        startedAt: expect.any(Number),
      }),
    );
  });

  it('bascule vers le panneau de succès et retire le formulaire', async () => {
    sendContactMock.mockResolvedValue({ ok: true });
    const { user } = afficher();

    await remplirFormulaire(user);
    await user.click(screen.getByRole('button', { name: 'Envoyer mon message' }));

    expect(await screen.findByText('Merci, votre message est parti !')).toBeInTheDocument();
    expect(screen.queryByLabelText('Prénom *')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Envoyer mon message' })).toBeNull();
  });

  it('affiche l’erreur serveur en gardant le formulaire à l’écran', async () => {
    sendContactMock.mockResolvedValue({ ok: false, error: "L'envoi a échoué." });
    const { user } = afficher();

    await remplirFormulaire(user);
    await user.click(screen.getByRole('button', { name: 'Envoyer mon message' }));

    expect(await screen.findByText("L'envoi a échoué.")).toBeInTheDocument();
    expect(screen.getByLabelText('Prénom *')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Envoyer mon message' })).toBeInTheDocument();
  });

  it('désactive le bouton pendant l’envoi', async () => {
    // Promesse à résolution manuelle : on observe l'état intermédiaire isSubmitting.
    let resoudre: (resultat: SendContactResult) => void;
    sendContactMock.mockReturnValue(
      new Promise<SendContactResult>((res) => {
        resoudre = res;
      }),
    );
    const { user } = afficher();

    await remplirFormulaire(user);
    await user.click(screen.getByRole('button', { name: 'Envoyer mon message' }));

    const bouton = await screen.findByRole('button', { name: 'Envoi en cours…' });
    expect(bouton).toBeDisabled();

    // On libère l'action dans un `act` pour que React traite le re-rendu qui suit.
    await act(async () => {
      resoudre({ ok: true });
    });

    expect(screen.getByText('Merci, votre message est parti !')).toBeInTheDocument();
  });
});
