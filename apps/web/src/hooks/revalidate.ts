import { revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload';

export const revalidateCollectionChange =
  (tag: string): CollectionAfterChangeHook =>
  ({ doc }) => {
    revalidateTag(tag);
    return doc;
  };

export const revalidateCollectionDelete =
  (tag: string): CollectionAfterDeleteHook =>
  ({ doc }) => {
    revalidateTag(tag);
    return doc;
  };

export const revalidateGlobalChange =
  (tag: string): GlobalAfterChangeHook =>
  ({ doc }) => {
    revalidateTag(tag);
    return doc;
  };
