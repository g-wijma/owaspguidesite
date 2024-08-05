import type { StrapiRichTextNode } from "../lib/richtext";

export default interface Principle {
    id: number;
    Title: string;
    Body: StrapiRichTextNode[];
  }