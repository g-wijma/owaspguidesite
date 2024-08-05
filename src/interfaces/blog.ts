import type { StrapiRichTextNode } from "../lib/richtext";

export default interface Blog {
    id: number;
    Title: string;
    Author: string;
    Date: string;
    Body: StrapiRichTextNode[];
  }