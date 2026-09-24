import createCrudApi from "./createCrudApi"
import { ENDPOINTS } from "../config"

const plataformaApi = createCrudApi(ENDPOINTS.plataforma)

export default plataformaApi
