import { ApiSignIn, Usuario } from "@/models/Auth"
import { useApi } from "./api"

const signIn = async({email, password}: {email: string, password: string}) => {
    const response = await useApi<ApiSignIn>('signin', 'POST', {email, password}, false)
    return response
}

const obterUmUsuario = async(id: number) => {
    const response = await useApi<Usuario>(`usuario/${id}`, 'GET')
}

const cadastrarUmUsuario = async({nome, email, password, genero}: {nome: string, email: string, password: string, genero: string}) => {
    const response = await useApi('usuarios', 'POST', {nome, email, password, genero})
    return response
}

const deletarUmUsuario = async(id: number) => {
    const response = await useApi<Usuario>(`usuario/${id}`, 'DELETE')
}

//Exporta todas as funções 
export const useRequest = () => ({
    signIn,
    obterUmUsuario,
    cadastrarUmUsuario,
    deletarUmUsuario
})