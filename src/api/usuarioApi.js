import { ENDPOINTS } from "../config";
import createCrudApi from "./createCrudApi";

const usuarioApi = createCrudApi(ENDPOINTS.usuario);

export default usuarioApi;
