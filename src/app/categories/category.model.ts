export type Category = {
  id: string;
  name: string;
  desc: string;
  isDeleted: boolean;
};

export type CategoryData = {
  [s: string]: Omit<Category, 'id'>;
};
