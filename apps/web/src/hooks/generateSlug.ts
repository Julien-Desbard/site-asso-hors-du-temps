import type { FieldHook } from 'payload';

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Le slug reste stable après la création : on ne le régénère que si le
// champ est encore vide, pour ne pas casser une URL déjà publiée/partagée
// si le titre est modifié plus tard.
export const generateSlug: FieldHook = async ({ siblingData, originalDoc, value, req }) => {
  if (value) return value;

  const titre = siblingData?.titre ?? originalDoc?.titre;
  if (!titre) return value;

  const base = slugify(titre);
  let slug = base;
  let suffix = 2;

  while (
    (
      await req.payload.find({
        collection: 'articles',
        where: {
          slug: { equals: slug },
          ...(originalDoc?.id ? { id: { not_equals: originalDoc.id } } : {}),
        },
        limit: 1,
        req,
      })
    ).totalDocs > 0
  ) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
};
