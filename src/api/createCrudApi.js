import axiosClient from './axiosClient'

/**
 * Crea un objeto con las 5 operaciones REST estándar para una entidad.
 * Mantiene cada archivo de src/api/*.js corto y consistente.
 */
export default function createCrudApi(basePath) {
  return {
    getAll: async (params) => {
      const { data } = await axiosClient.get(basePath, { params })
      return Array.isArray(data) ? data : data?.content ?? data
    },
    getById: async (id) => {
      const { data } = await axiosClient.get(`${basePath}/${id}`)
      return data
    },
    create: async (payload) => {
      const { data } = await axiosClient.post(basePath, payload)
      return data
    },
    update: async (id, payload) => {
      const { data } = await axiosClient.put(`${basePath}/${id}`, payload)
      return data
    },
    remove: async (id) => {
      await axiosClient.delete(`${basePath}/${id}`)
    },
  }
}
