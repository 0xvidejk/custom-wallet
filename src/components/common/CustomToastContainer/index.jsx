import React from "react";
import { ToastContainer } from "react-toastify";

import { slideAnimation } from "components/common/CustomToastContainer/toastAnimations";
const CustomToastContainer = () => {
  return <ToastContainer transition={slideAnimation} limit={1} />;
};

export default CustomToastContainer;
