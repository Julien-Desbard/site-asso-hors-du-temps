import type { Field, GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';
import { gereFonds } from '../lib/acces.ts';

// Contenu de la page autonome du fonds de dotation (reprise du dépliant PDF 4 pages).
// Modifiable par les comptes « admin » et « fonds » (Christine).
//
// Images : chaque photo a un champ « upload » facultatif. Tant qu'il est vide, le site
// affiche la photo extraite du PDF (dossier public/fonds/), dont le chemin est gardé
// dans un champ caché `*_defaut`. Déposer une photo HD suffit donc à la remplacer.

const photo = (name: string, label: string): Field[] => [
  {
    name,
    type: 'upload',
    relationTo: 'media',
    label,
    admin: { description: 'Laisser vide pour garder la photo actuelle (extraite du dépliant PDF).' },
  },
  { name: `${name}_defaut`, type: 'text', admin: { hidden: true } },
];

const paragraphes = 'Laisser une ligne vide entre deux paragraphes.';

export const FondsDotation: GlobalConfig = {
  slug: 'fonds-dotation',
  label: 'Fonds de dotation',
  access: {
    read: () => true,
    update: gereFonds,
  },
  hooks: {
    afterChange: [revalidateGlobalChange('fonds-dotation')],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '1. Couverture',
          fields: [
            ...photo('photo_couverture', 'Photo de la maison'),
            { name: 'titre', type: 'text', label: 'Grand titre', required: true },
            { name: 'projet_titre', type: 'text', label: 'Projet — titre' },
            { name: 'projet_texte', type: 'textarea', label: 'Projet — texte', admin: { description: paragraphes } },
            {
              name: 'collecte',
              type: 'group',
              label: 'État des lieux et objectifs (thermomètre)',
              admin: {
                description:
                  'Le thermomètre se remplit automatiquement : montant récolté ÷ (montant récolté + objectif supplémentaire).',
              },
              fields: [
                { name: 'titre', type: 'text', label: 'Titre de l’encadré' },
                { name: 'recolte', type: 'number', label: 'Déjà récolté (€)', required: true, min: 0 },
                { name: 'objectif_libelle', type: 'text', label: 'Libellé de l’objectif' },
                { name: 'objectif', type: 'number', label: 'Objectif supplémentaire (€)', required: true, min: 0 },
                { name: 'echeance', type: 'text', label: 'Échéance', admin: { description: 'Ex. : d’ici décembre 2026' } },
              ],
            },
          ],
        },
        {
          label: '2. Le fonds',
          fields: [
            { name: 'fonds_titre', type: 'text', label: 'Titre' },
            { name: 'fonds_sous_titre', type: 'text', label: 'Sous-titre' },
            ...photo('fonds_photo', 'Photo'),
            { name: 'fonds_texte', type: 'textarea', label: 'Texte', admin: { description: paragraphes } },
            {
              name: 'pastilles',
              type: 'array',
              label: 'Pastilles',
              labels: { singular: 'Pastille', plural: 'Pastilles' },
              fields: [
                { name: 'titre', type: 'text', label: 'Titre', required: true },
                { name: 'texte', type: 'textarea', label: 'Texte' },
              ],
            },
            {
              name: 'arguments',
              type: 'array',
              label: 'Arguments',
              labels: { singular: 'Argument', plural: 'Arguments' },
              fields: [{ name: 'texte', type: 'text', label: 'Texte', required: true }],
            },
            { name: 'participer_titre', type: 'text', label: 'Comment participer — titre' },
            { name: 'participer_intro', type: 'text', label: 'Comment participer — avant l’adresse mail' },
            { name: 'participer_details', type: 'textarea', label: 'Comment participer — après l’adresse mail' },
            { name: 'don_libelle', type: 'text', label: 'Bouton de don — libellé' },
            { name: 'don_url', type: 'text', label: 'Bouton de don — lien (HelloAsso)' },
          ],
        },
        {
          label: '3. L’association',
          fields: [
            { name: 'refuge_titre', type: 'text', label: 'Bandeau — titre' },
            {
              name: 'refuge_verbes',
              type: 'array',
              label: 'Bandeau — lignes',
              labels: { singular: 'Ligne', plural: 'Lignes' },
              fields: [{ name: 'texte', type: 'text', label: 'Texte', required: true }],
            },
            { name: 'asso_texte', type: 'textarea', label: 'Présentation de l’association', admin: { description: paragraphes } },
            { name: 'asso_lien_libelle', type: 'text', label: 'Lien « en savoir plus » — libellé' },
            { name: 'asso_lien_url', type: 'text', label: 'Lien « en savoir plus » — adresse' },
            { name: 'chiffres_annee', type: 'text', label: 'Chiffres clés — année' },
            {
              name: 'chiffres',
              type: 'array',
              label: 'Chiffres clés',
              labels: { singular: 'Chiffre', plural: 'Chiffres' },
              fields: [
                { name: 'valeur', type: 'text', label: 'Valeur', required: true },
                { name: 'libelle', type: 'text', label: 'Libellé', required: true },
                {
                  name: 'icone',
                  type: 'select',
                  label: 'Pictogramme',
                  defaultValue: 'maison',
                  options: [
                    { label: 'Maison', value: 'maison' },
                    { label: 'Lit', value: 'lit' },
                    { label: 'Femme', value: 'femme' },
                    { label: 'Homme', value: 'homme' },
                    { label: 'Repas', value: 'repas' },
                  ],
                },
              ],
            },
            { name: 'problematiques_titre', type: 'text', label: 'Problématiques — titre' },
            { name: 'problematiques_note', type: 'text', label: 'Problématiques — note' },
            {
              name: 'problematiques',
              type: 'array',
              label: 'Problématiques (barres)',
              labels: { singular: 'Problématique', plural: 'Problématiques' },
              fields: [
                { name: 'pourcentage', type: 'number', label: 'Pourcentage', required: true, min: 0, max: 100 },
                { name: 'libelle', type: 'text', label: 'Libellé', required: true },
              ],
            },
          ],
        },
        {
          label: '4. Témoignages',
          fields: [
            {
              name: 'temoignages',
              type: 'array',
              label: 'Témoignages',
              labels: { singular: 'Témoignage', plural: 'Témoignages' },
              admin: { description: 'Affichés en damier : photo, citation, photo, citation…' },
              fields: [
                { name: 'citation', type: 'textarea', label: 'Citation', required: true },
                ...photo('photo', 'Photo'),
              ],
            },
          ],
        },
        {
          label: 'Pied de page',
          fields: [
            { name: 'pied_nom', type: 'text', label: 'Nom' },
            { name: 'pied_adresse', type: 'text', label: 'Adresse' },
            { name: 'pied_telephone', type: 'text', label: 'Téléphone' },
            { name: 'pied_email', type: 'email', label: 'Adresse mail' },
          ],
        },
      ],
    },
  ],
};
