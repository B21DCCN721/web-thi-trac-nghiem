import axiosClient from "../../configs/axiosClient";
import { setAuth, clearAuth, setLoading } from "../slices/authSlice";

export const checkAuth = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const res = await axiosClient.get("api/auth/decode-token"); // Trả về user từ cookie
    dispatch(setAuth(res.data.user));
  } catch (error) {
    dispatch(clearAuth());
  }
};
