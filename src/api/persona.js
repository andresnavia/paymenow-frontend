import createCrudApi from "./createCrudApi";
import axiosClient from "./axiosClient";
import { ENDPOINTS } from "../config";

const personaApi = createCrudApi(ENDPOINTS.persona);

personaApi.getPaginated = async ({ page, size }) => {
  const { data } = await axiosClient.get(`${ENDPOINTS.persona}/paginado`, {
    params: { page, size },
  });
  return data;
};
personaApi.getByIdentificacion = async (identificacion) => {
  const { data } = await axiosClient.get(
    `${ENDPOINTS.persona}/identificacion/${identificacion}`,
  );
  return data;
};
export default personaApi;
