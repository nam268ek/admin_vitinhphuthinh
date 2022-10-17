export interface ICategories {
  id: string;
  name: string;
  category: string;
  index: string;
  parent?: ICategories;
}
export interface ITableListCategoryProps {
  setItemEdit: React.Dispatch<React.SetStateAction<ICategories[]>>;
  categories: ICategories[];
}
export interface ICreateCategoryProps {
  itemEdit: ICategories[];
}
export interface IStateCategories {
  loading: boolean;
  listAllCategory: ICategories[];
}
