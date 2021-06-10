export interface PostTag {
  name: string;
  color: string;
  category: Category;
}

export enum Category {
  Game = '#f50',
  Event = '#2db7f5',
}
