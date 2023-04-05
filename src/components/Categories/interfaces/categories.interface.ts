import { NAME_ACTION } from '../../../constants/const';

export interface Path {
  id: string;
  name: string;
}
export interface ICategories {
  id: string;
  name: string;
  category: string;
  slug: string;
  parent: string;
  path: Path[];
  updatedAt: string;
}
export interface IStateCategories {
  loading: boolean;
  itemSelected: ICategories[];
  categories: ICategories[];
  action: NAME_ACTION;
}
