import { ENDPOINTS } from "../config";
import createCrudApi from "./createCrudApi";

const rolApi = createCrudApi(ENDPOINTS.rol);

export default rolApi;
