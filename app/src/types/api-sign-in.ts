import { Usuario } from "./usuario"

export type ApiSignIn = {
    id: Number,
    usuario: Usuario,
    refresh: string,
    access: string
}