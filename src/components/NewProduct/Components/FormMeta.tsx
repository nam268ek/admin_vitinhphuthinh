import React from 'react';
import { DropDownBrands } from './DropdownBrands';
import { DropDownTags } from './DropdownTags';

export const FormMeta: React.FC<any> = ({ handleChange }) => {
  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">Meta</figcaption>
      <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
        <div className="form-group form-group--select">
          <div className="mb-5">
            <label className="mb-3 text-sm font-normal">
              Thương hiệu<sup className="text-red-600 ml-1">*</sup>
            </label>
            <DropDownBrands handleChange={handleChange} />
          </div>
        </div>
        <div className="mb-5">
          <label className="mb-3 text-sm font-normal">
            Tags<sup className="text-red-600 ml-1">*</sup>
          </label>
          <DropDownTags handleChange={handleChange} />
        </div>
      </div>
    </figure>
  );
};
