import { Form } from 'react-router-dom';
import { TreeCategory } from '../../StatusProduct/StatusProduct';

export const FormCategories = () => {
  return (
    <Form name="categories">
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
    </Form>
  );
};
