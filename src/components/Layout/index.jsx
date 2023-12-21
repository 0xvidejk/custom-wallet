import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { invoke } from "@tauri-apps/api";
import {
  setEncryptedWalletData,
  setPasswordHash,
} from "store/slices/accountSlice";

import styles from "components/Layout/styles";

import "react-toastify/dist/ReactToastify.css";

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    invoke("get_user_profile").then((data) => {
      if (data) {
        dispatch(setPasswordHash(data.password_hash));
        dispatch(setEncryptedWalletData(data.encrypted_wallet_data));
        navigate("/welcome-back");
      } else {
        navigate("/");
      }
    });
  }, [navigate, dispatch]);

  return (
    <div css={styles.container}>
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default Layout;
