import React, { useEffect, useState } from 'react';
import { OrderConfirm } from './OrderConfirm';
import { OrderInfoCustomer } from './OrderInfoCustomer';
import { OrderListProductAddToCart } from './OrderListProductAddToCart';

export const FormOrderStepsData: React.FC<any> = ({ step }) => {
  const [content, setContent] = useState<JSX.Element>(<></>);

  useEffect(() => {
    handleStepChange(step);
  }, [step]);

  const handleStepChange = (index: number) => {
    if (index === 0) {
      setContent(<OrderListProductAddToCart />);
      return;
    }
    if (index === 1) {
      setContent(<OrderInfoCustomer />);

      return;
    }
    if (index === 2) {
      setContent(<OrderConfirm />);

      return;
    }
  };

  return <>{content}</>;
};
