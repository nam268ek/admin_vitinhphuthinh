import { NAME_ACTION } from '../../../constants/const';

export interface ICategories {
  id: string;
  name: string;
  category: string;
  index: string;
  parent: string;
}
export interface IStateCategories {
  loading: boolean;
  itemSelected: ICategories[];
  categories: ICategories[];
  action: NAME_ACTION;
}
