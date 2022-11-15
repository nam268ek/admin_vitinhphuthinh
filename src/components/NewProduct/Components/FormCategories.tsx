import { TreeCategory } from './TreeCategory';

export const FormCategories: React.FC<any> = ({ handleChange }) => {
  return (
    <figure className="ps-block--form-box">
      <figcaption>Category</figcaption>
      <div className="ps-block__content">
        <div className="form-group">
          <label>
            Danh mục<sup>*</sup>
          </label>
          <TreeCategory handleChange={handleChange} />
        </div>
      </div>
    </figure>
  );
};
