import axios, { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"

const AUTH_SERVER = 'http://localhost:8000'

export const useApi = async <TypeDataResponse>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: object,
    withAth: Boolean = true): Promise<{
        data?: TypeDataResponse, 
        detail: string}> => {

    try{
        const request = await axios(`${AUTH_SERVER}/${endpoint}`, {
            method,
            data: method != 'GET' && data,
            params: method == 'GET' && data
        })

        return {
            data: request.data,
            detail: ''
        }
    }catch (e) {
        const error = e as AxiosError<ApiError>
        return {
            data: undefined,
            detail: error.response?.data.name || error.message
        }
    }

}