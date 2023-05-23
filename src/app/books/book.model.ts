export type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  coverUrl: string;
  category: string;
  quantity: number;
};

export type BookData = {
  [s: string]: Omit<Book, 'id'>;
};
