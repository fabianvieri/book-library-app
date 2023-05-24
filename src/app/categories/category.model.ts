export type Category = {
    id: string;
    name: string;
    desc: string;
  };
  
  export type CategoryData = {
    [s: string]: Omit<Category, 'id'>;
  };
  