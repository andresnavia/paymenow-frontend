import createCrudApi from "./createCrudApi"
import { ENDPOINTS } from "../config"

const pagosApi = createCrudApi(ENDPOINTS.pagos)

export default pagosApi
