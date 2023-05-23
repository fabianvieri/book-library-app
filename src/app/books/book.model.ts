export type Book = {
  title: string;
  author: string;
  publisher: string;
  coverUrl: string;
  category: string;
  quantity: number;
};

export type BookData = {
  [s: string]: Book;
};
