import React from 'react';

export const FormProductSpecs: React.FC = () => {
  return (
    <figure className="ps-block--form-box">
      <figcaption>Thông tin cấu hình</figcaption>
      <div className="ps-block__content">
        {/* {createKey === "1" ? (
      <ConfigInfo
        maxLength={maxLength}
        maxLengthTextArea={maxLengthTextArea}
        defaultValue={dataUpdate[0] ? dataUpdate[0].contentInfo : ""}
      />
    ) : (
      createKey === "2" && (
        <InfoPrintComponent
          maxLength={maxLength}
          maxLengthTextArea={maxLengthTextArea}
          defaultValue={dataUpdate[0] ? dataUpdate[0].contentInfo : ""}
        />
      )
    )} */}
      </div>
    </figure>
  );
};
