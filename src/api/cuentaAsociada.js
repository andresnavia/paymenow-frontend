import createCrudApi from "./createCrudApi"
import { ENDPOINTS } from "../config"

const cuentaAsociadaApi = createCrudApi(ENDPOINTS.cuentaAsociada)

export default cuentaAsociadaApi
