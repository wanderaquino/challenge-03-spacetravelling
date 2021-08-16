import Prismic from '@prismicio/client';
import { DefaultClient } from '@prismicio/client/types/client';
import { Document } from '@prismicio/client/types/documents';
import PrismicDOM from "prismic-dom"
import { PromiseCompletionFunction } from 'yargs';

export function getPrismicClient(req?: unknown): DefaultClient {
  const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, {
    req,
  });

  return prismic;
}

export function linkResolver (document: Document) {
  if(document.type === "post") {
    return `/post/${document.uid}`;
  }

  return "/";
}