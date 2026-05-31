import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero scrib="Vos données" title="Politique de confidentialité" />
      <section className="section">
        <div className="wrap">
          <div className="prose">
            <h3>Données collectées</h3>
            <p>Ce site collecte uniquement les données que vous nous transmettez volontairement via le formulaire de contact (prénom, nom, adresse e-mail, téléphone, message). Aucun cookie de traçage ni outil d&rsquo;analyse tiers n&rsquo;est utilisé.</p>

            <h3>Finalité</h3>
            <p>Ces données sont utilisées exclusivement pour répondre à votre message. Elles ne sont jamais transmises à des tiers ni utilisées à des fins commerciales.</p>

            <h3>Conservation</h3>
            <p>Les données sont conservées le temps nécessaire au traitement de votre demande, puis supprimées.</p>

            <h3>Vos droits</h3>
            <p>Conformément au RGPD, vous disposez d&rsquo;un droit d&rsquo;accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à : <a href="mailto:asso.horsdutemps@gmail.com" style={{ color: 'var(--brick)' }}>asso.horsdutemps@gmail.com</a>.</p>

            <h3>Responsable du traitement</h3>
            <p>Association Ensemble pour l&rsquo;Hors du Temps — 24 rue de la Fusilière, 38160 Saint-Marcellin.</p>
          </div>
        </div>
      </section>
    </>
  );
}
