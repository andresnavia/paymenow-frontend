import createCrudApi from "./createCrudApi";
import { ENDPOINTS } from "../config";
import axiosClient from "./axiosClient";

const pagosApi = createCrudApi(ENDPOINTS.pagos);
pagosApi.contar = async () => {
  const { data } = await axiosClient.get(`${ENDPOINTS.pagos}/contar`);
  return data;
};
export default pagosApi;
