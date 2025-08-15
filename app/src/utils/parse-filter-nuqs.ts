import { createSearchParamsCache, parseAsString } from "nuqs/server"

export const filtrarUsuarioParams = createSearchParamsCache(
    {
        nome: parseAsString.withDefault(''),
        mes: parseAsString.withDefault(''),
        genero: parseAsString.withDefault(''),
        status: parseAsString.withDefault(''),
    }
)