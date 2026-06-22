import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (!process.env.REVALIDATION_SECRET || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const model = (body?.model as string | undefined) ?? 'articles';

  // Tags correspondent aux clés utilisées dans lib/strapi.ts
  const ALLOWED_TAGS = ['articles', 'membre-equipes', 'etape-accueils', 'frise-historiques', 'historique', 'parametre', 'dimanche', 'accueil-page'];
  const tag = ALLOWED_TAGS.includes(model) ? model : 'articles';

  revalidateTag(tag);

  return NextResponse.json({ revalidated: true, tag });
}
