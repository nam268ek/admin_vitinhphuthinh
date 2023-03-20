import { NAME_ACTION } from '../../../constants/const';

export interface ICategories {
  id: string;
  name: string;
  category: string;
  categoryCode: string;
  index: string;
  parent: string | undefined;
}
export interface IStateCategories {
  loading: boolean;
  itemSelected: ICategories[];
  categories: ICategories[];
  action: NAME_ACTION;
}
