export type StrapiRichTextNode = {
    type:
      | 'text'
      | 'heading'
      | 'paragraph'
      | 'list'
      | 'list-item'
      | 'link'
      | 'quote'
      | 'code'
      | 'image';
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    format?: 'unordered' | 'ordered';
    text?: string;
    url?: string;
    bold?: boolean;
    code?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    image?: {
      alternativeText: string;
      url: string;
      width?: number;
      height?: number;
      // ...
    };
    children?: StrapiRichTextNode[];
  };


export function resolveRichText(nodes: StrapiRichTextNode[]) {
    return nodes.map((c) => resolveRichTextNode(c)).join('');
  }
  
  function resolveRichTextNode(node: StrapiRichTextNode) {
    let html = '';
    const children = node.children ? node.children.map((c) => resolveRichTextNode(c)).join('') : '';
  
    switch (node.type) {
      case 'heading':
        html = `<h${node.level}>${children}</h${node.level}>`;
        break;
      case 'text':
        if (node.text) {
          let tmp = node.text.replaceAll('\n', '<br />');
  
          if (node.bold) tmp = `<b>${tmp}</b>`;
          if (node.code) tmp = `<code>${tmp}</code>`;
          if (node.italic) tmp = `<i>${tmp}</i>`;
          if (node.strikethrough) tmp = `<s>${tmp}</s>`;
          if (node.underline) tmp = `<u>${tmp}</u>`;
  
          html = tmp;
        }
        break;
      case 'paragraph':
        html = `<p>${children}</p>`;
        break;
      case 'link':
        html = `<a href="${node.url}">${children}</a>`;
        break;
      case 'list':
        switch (node.format) {
          case 'ordered':
            html = `<ol>${children}</ol>`;
            break;
          case 'unordered':
            html = `<ul>${children}</ul>`;
            break;
        }
        break;
      case 'list-item':
        html = `<li>${children}</li>`;
        break;
      case 'quote':
        html = `<blockquote>${children}</blockquote>`;
        break;
      case 'code':
        html = `<pre>${children}</pre>`;
        break;
      case 'image':
        if (node.image) {
          html = `<img src="${node.image.url}" height="${node.image.height}" width="${node.image.width}" alt="${node.image.alternativeText}" />`;
        }
        break;
    }
  
    return html;
  }