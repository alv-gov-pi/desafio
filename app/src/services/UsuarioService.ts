import { Usuario } from "@/types/usuario";
import { BaseService } from "./BaseService";

export class UsuarioService extends BaseService {
    constructor() {
        super()
        this.dominio = 'usuario';
    }

    async atualizarUsuario(usuario: Usuario): Promise<Usuario> {
        console.log(`atualizarUsuario: ${JSON.stringify(usuario)}`)
        const response = await fetch(`${this.obterUrlDominio()}/${usuario.id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario)
        })

        if (!response.ok) {
            throw new Error(`Erro ao atualizar o usuario ${response.text}`);
        }

        const usuarioAtualizado: Usuario = await response.json();
        return usuarioAtualizado;
    }

    async obterUsuarioPorId(usuarioId : number ): Promise<Usuario> {
        const response = await fetch(`${this.obterUrlDominio()}/${usuarioId}`, {
            method: "GET"
        })

        if (!response.ok) {
            throw new Error(`Erro ao recuperar o usuario ${response.text}`);
        }

        const usuario: Usuario = await response.json();
        return usuario
    }
}