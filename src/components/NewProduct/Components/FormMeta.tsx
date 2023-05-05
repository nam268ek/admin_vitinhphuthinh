import React from 'react';
import { DropDownBrands } from './DropdownBrands';
import TagList from './TagList';

export const FormMeta: React.FC<any> = ({ handleChange, onChangeUpdate }) => {
  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">Meta</figcaption>
      <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0 flex flex-col">
        <div className="">
          <label className="mb-3 text-sm font-normal">
            Thương hiệu<sup className="text-red-600 ml-1">*</sup>
          </label>
          <DropDownBrands handleChange={handleChange} />
        </div>
        <div className="my-3 flex space-x-2 items-start">
          <label className="text-sm font-normal">
            Tags<sup className="text-red-600 ml-1">*</sup>
          </label>
          <TagList onChangeUpdate={onChangeUpdate} />
        </div>
      </div>
    </figure>
  );
};
