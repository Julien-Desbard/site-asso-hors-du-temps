import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import Callout from '@/components/Callout';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: "Bénévolat — L'Hors du Temps",
  description:
    "Donnez de votre temps ou de vos compétences à L'Hors du Temps : missions de bénévolat et mécénat de compétences.",
};

export default function BenevolatPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Bénévolat', url: 'https://assohorsdutemps.fr/benevolat' }]} />
      <PageHero
        scrib="Donner un peu de son temps"
        title="Bénévolat"
        lead="La maison vit grâce à l'engagement de ses bénévoles. Quelques heures, un dimanche, une compétence : il y a mille façons d'aider, et une place pour vous."
      />

      {/* INTRO */}
      <section className="section">
        <div className="wrap">
          <div className="prose">
            <p>Accueillir, cuisiner, jardiner, bricoler, conduire, animer un Dimanche Ensemble, tenir les comptes, communiquer… <strong>Les besoins sont variés</strong>, et chacun peut trouver une manière de contribuer qui lui ressemble, selon ses envies et sa disponibilité.</p>
            <p>Que vous ayez une heure par mois ou une compétence précise à offrir, votre aide compte. Voici deux façons concrètes de nous rejoindre.</p>
          </div>
        </div>
      </section>

      {/* DEUX PISTES */}
      <section className="section section-cream">
        <div className="wrap">
          <h2 className="sr-only">Deux façons de nous rejoindre</h2>
          <div className="duo">
            <div className="act-card">
              <span className="act-eyebrow">Donner de son temps</span>
              <h3>Devenir bénévole</h3>
              <p>Rejoignez l&rsquo;équipe pour l&rsquo;accueil, le jardin, les repas, le transport ou les Dimanches Ensemble. Retrouvez nos missions et candidatez directement sur la plateforme JeVeuxAider du gouvernement.</p>
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
              <span className="act-eyebrow">Donner de ses compétences</span>
              <h3>Mécénat de compétences</h3>
              <p>Vous êtes salarié d&rsquo;une entreprise et souhaitez mettre votre expertise au service d&rsquo;un projet utile ? Nous recherchons un appui pour la création et l&rsquo;administration du fonds de dotation destiné au rachat de la maison.</p>
              <a
                className="btn btn-primary"
                href="https://www.mecenatdecompetences.org/les-missions-de-mecenat/creation-et-administration-d-un-fond-de-dotation-destine-au-rachat-d-un-lieu-de-repit-79779"
                target="_blank"
                rel="noopener noreferrer"
              >
                Découvrir la mission de mécénat →
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
