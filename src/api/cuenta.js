import createCrudApi from "./createCrudApi";
import { ENDPOINTS } from "../config";
import axiosClient from "./axiosClient";

const cuentaApi = createCrudApi(ENDPOINTS.cuenta);
cuentaApi.contar = async () => {
  const { data } = await axiosClient.get(`${ENDPOINTS.cuenta}/contar`);
  return data;
};
export default cuentaApi;
