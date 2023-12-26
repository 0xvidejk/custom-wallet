import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserLocalProfile } from "helpers/tauriHelpers";
import { setAccountLocalData } from "store/slices/accountSlice";

import CustomToastContainer from "components/common/CustomToastContainer";
import LoadingScreen from "components/common/LoadingScreen";
import styles from "components/Layout/styles";

import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const [isGettingLocalData, setIsGettingLocalData] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const retireveLocalData = async (): Promise<void> => {
      const userLocalData = await getUserLocalProfile();
      setIsGettingLocalData(false);
      if (userLocalData) {
        dispatch(setAccountLocalData(userLocalData));
        navigate("/welcome-back");
      } else {
        navigate("/");
      }
    };

    retireveLocalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={styles.container}>
      {isGettingLocalData ? <LoadingScreen /> : <Outlet />}
      <CustomToastContainer />
    </div>
  );
};

export default Layout;
