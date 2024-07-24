import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/authSlice";
import { initializeApiClient } from "@/app/apiClient";

const InitializeUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeApiClient();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch(setUser({ user: JSON.parse(user), token }));
    }
  }, [dispatch]);

  return null;
};

export default InitializeUser;
