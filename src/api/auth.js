import { ENDPOINTS } from "../config";
import axiosClient from "./axiosClient";

const authApi = {
  register: async (payload) => {
    const { data } = await axiosClient.post(
      `${ENDPOINTS.auth}/register`,
      payload,
    );
    return data;
  },
};

export default authApi;
