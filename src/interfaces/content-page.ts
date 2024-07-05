export default interface ContentPage {
    id: number;
    attributes: {
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }