import { Form } from 'antd';
import { TreeCategory } from '../../StatusProduct/StatusProduct';

export const FormCategories: React.FC = () => {
  return (
    <figure className="ps-block--form-box">
      <figcaption>Category</figcaption>
      <div className="ps-block__content">
        <div className="form-group">
          <label>
            Danh mục<sup>*</sup>
          </label>
          <TreeCategory />
        </div>
      </div>
    </figure>
  );
};
