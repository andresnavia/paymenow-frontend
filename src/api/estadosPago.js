import createCrudApi from "./createCrudApi"
import { ENDPOINTS } from "../config"

const estadosPagoApi = createCrudApi(ENDPOINTS.estadosPago)

export default estadosPagoApi
