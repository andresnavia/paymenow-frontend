import createCrudApi from "./createCrudApi";
import { ENDPOINTS } from "../config";
import axiosClient from "./axiosClient";

const plataformaApi = createCrudApi(ENDPOINTS.plataforma);
plataformaApi.contar = async () => {
  const { data } = await axiosClient.get(`${ENDPOINTS.plataforma}/contar`);
  return data;
};
export default plataformaApi;
