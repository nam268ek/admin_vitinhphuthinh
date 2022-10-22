export interface ICategories {
  id: string;
  name: string;
  category: string;
  index: string;
  parent: ICategories[];
}
export interface IStateCategories {
  loading: boolean;
  itemSelected: ICategories[];
  categories: ICategories[];
}
