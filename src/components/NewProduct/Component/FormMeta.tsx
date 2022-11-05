import React from 'react';
import { DropDownBrands } from './DropdownBrands';
import { DropDownTags } from './DropdownTags';

export const FormMeta: React.FC = () => {
  return (
    <figure className="ps-block--form-box">
      <figcaption>Meta</figcaption>
      <div className="ps-block__content">
        <div className="form-group form-group--select">
          <div className="form-group">
            <label>
              Thương hiệu<sup>*</sup>
            </label>
            <DropDownBrands />
          </div>
        </div>
        <div className="form-group">
          <label>Tags</label>
          <DropDownTags />
        </div>
      </div>
    </figure>
  );
};
