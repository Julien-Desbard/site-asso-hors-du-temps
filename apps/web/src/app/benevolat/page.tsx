import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import Callout from '@/components/Callout';
import PageHero from '@/components/PageHero';
import { getParametres } from '@/lib/strapi';
import type { Parametre } from '@hors-du-temps/types';

export const metadata: Metadata = {
  title: "Bénévolat — L'Hors du Temps",
  description:
    "Donnez de votre temps ou de vos compétences à L'Hors du Temps : missions de bénévolat et mécénat de compétences.",
};

export default async function BenevolatPage() {
  let parametre: Parametre | null = null;
  try {
    parametre = await getParametres();
  } catch { /* Strapi indisponible */ }

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Bénévolat', url: 'https://assohorsdutemps.fr/benevolat' }]} />
      <PageHero
        scrib="Donner un peu de son temps"
        title="Bénévolat"
        lead="La maison vit grâce à l'engagement de ses bénévoles, que ce soit pour des permanences de quelques heures, d'une journée, d'une nuit, pour un Dimanche Ensemble ou encore pour mettre au service des compétences particulières : il y a mille façons d'aider, et une place pour vous. Voici 2 façons concrètes de nous rejoindre :"
      />

      {/* INTRO */}
      <section className="section">
        <div className="wrap">
          <div className="prose">
            <p>Vous êtes bienvenus pour rejoindre cette aventure humaine. L&rsquo;Hors du temps existe grâce aux bénévoles. Ils apportent leur présence, leur écoute et leur sensibilité dans une relation d&rsquo;égal à égal où la personne accueillie se sent respectée. Aux côtés du couple résident et des salariés, les bénévoles contribuent à faire de ce lieu, un lieu aux multiples visages. Si vous habitez la région et souhaitez donner un peu de votre temps en participant à la vie de la maison, vous pouvez rencontrer l&rsquo;équipe d&rsquo;accueil qui vous dira quelles sont les valeurs et les pratiques de la maison pour entourer les personnes accueillies.</p>
          </div>
        </div>
      </section>

      {/* DEUX PISTES */}
      <section className="section section-cream">
        <div className="wrap">
          <h2 className="sr-only">Deux façons de nous rejoindre</h2>
          <div className="duo">
            <div className="act-card">
              <span className="act-eyebrow">Bénévolat</span>
              <h3>Devenir bénévole</h3>
              <p>Rejoignez l&rsquo;équipe en retrouvant toutes nos missions sur la plateforme JeVeuxAider du gouvernement.</p>
              <a
                className="btn btn-teal"
                href="https://www.jeveuxaider.gouv.fr/organisations/18543-ensemble-pour-l-hors-du-temps"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir nos missions sur JeVeuxAider →
              </a>
            </div>
            <div className="act-card act-card-brick">
              <span className="act-eyebrow">Partager ses compétences</span>
              <h3>Mécénat de compétences</h3>
              <p>Vous êtes salarié d&rsquo;une entreprise et souhaitez mettre votre expertise au service d&rsquo;un projet qui a du sens ? N&rsquo;hésitez pas à consulter nos offres de mécénat de compétences sur la plateforme TousBénévoles.</p>
              <a
                className="btn btn-primary"
                href={parametre?.mecenat_url ?? 'https://www.tousbenevoles.org'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Découvrir nos missions sur TousBénévoles
              </a>
            </div>
          </div>
        </div>
      </section>

      <Callout
        title="Une autre idée pour aider ?"
        text="Vous avez une compétence, un réseau, du matériel ou simplement de l'enthousiasme à partager ? Écrivez-nous, on trouvera comment faire ensemble."
        ctaLabel="Nous écrire"
        ctaHref="/nous-contacter"
      />
    </>
  );
}
