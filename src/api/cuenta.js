import createCrudApi from "./createCrudApi"
import { ENDPOINTS } from "../config"

const cuentaApi = createCrudApi(ENDPOINTS.cuenta)

export default cuentaApi
