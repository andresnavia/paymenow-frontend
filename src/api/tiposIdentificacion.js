import createCrudApi from "./createCrudApi";
import { ENDPOINTS } from "../config";

const tiposIdentificacionApi = createCrudApi(ENDPOINTS.tiposIdentificacion);

export default tiposIdentificacionApi;
