import { cloneDeep } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/Slices/PrimarySlice";
import { getAllProducts } from "../redux/Slices/productSlice";
import { originalProduct } from "../Services/general.service";

const Dashboard: React.FC = () => {
//   const dispatch = useDispatch();

//   React.useEffect(() => {
//     const handleProducts = () => {
//       let product = cloneDeep(originalProduct);
//       product.role = "";
//       dispatch(setIsLoading(true));
//       dispatch(getAllProducts(product));
//       dispatch(setIsLoading(false));
//     };
//   }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};
export default Dashboard;
