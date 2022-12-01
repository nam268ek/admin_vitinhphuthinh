import { TreeCategory } from './TreeCategory';

export const FormCategories: React.FC<any> = ({ handleChange }) => {
  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">
        Category
      </figcaption>
      <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
        <div className="mb-5">
          <label className="mb-3 text-sm font-normal">
            Danh mục<sup className="text-red-600 ml-1">*</sup>
          </label>
          <TreeCategory handleChange={handleChange} />
        </div>
      </div>
    </figure>
  );
};
