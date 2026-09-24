import createCrudApi from "./createCrudApi"
import { ENDPOINTS } from "../config"

const parametrosApi = createCrudApi(ENDPOINTS.parametros)

export default parametrosApi
