import { Usuario } from "@/types/usuario";
import { BaseService } from "./BaseService";
import HTTPMethod from "http-method-enum";

export class UsuarioService extends BaseService {
    constructor(token: string) {
        super(token)
        this.dominio = 'usuario';
    }

    async atualizarUsuario(usuario: Usuario): Promise<Usuario> {
        console.log(`atualizarUsuario: ${JSON.stringify(usuario)}`)
        const response = await fetch(`${this.obterUrlDominio()}/${usuario.id}/`, {
            method: HTTPMethod.PUT,
            headers: this.obterHeaders(),
            body: JSON.stringify(usuario)
        })

        if (!response.ok) {
            throw new Error(`Erro ao atualizar o usuario ${response.text}`);
        }

        const usuarioAtualizado: Usuario = await response.json();
        return usuarioAtualizado;
    }

    async obterUsuarios(): Promise<Usuario[]> {
        const response = await fetch(`${this.obterUrlDominio()}`, {
            method: HTTPMethod.GET, 
            headers: this.obterHeaders()
        })

        if (!response.ok) {
            throw new Error(`Erro ao recuperar os usuarios ${response.text}`);
        }

        const usuarios: Usuario[] = await response.json();
        return usuarios;
    }

    async alterarStatus(usuarioId: number, novoStatus: boolean){
        const response = await fetch(`${this.obterUrlDominio()}/${usuarioId}/`, {
            method: HTTPMethod.PATCH,
            headers: this.obterHeaders(),
            body: JSON.stringify({ esta_ativo: novoStatus }),
        })

        if (!response.ok) {
            throw new Error(`Erro ao atualizar o status do usuario, detalhes: ${response.text()}`);
        }

        const usuarioAtualizado: Usuario = await response.json();
        return usuarioAtualizado;
    }
    async obterUsuariosPorSetor(setorId: number): Promise<Usuario[]> {
        const response = await fetch(`${this.obterUrlDominio()}/por-setor/${setorId}/`, {
            method: HTTPMethod.GET, 
            headers: this.obterHeaders()
        })

        if (!response.ok) {
            throw new Error(`Erro ao recuperar os membros do setor ${response.text}`);
        }

        const usuarios: Usuario[] = await response.json();
        return usuarios;
    }

    async obterUsuarioPorId(usuarioId : number ): Promise<Usuario> {
        const response = await fetch(`${this.obterUrlDominio()}/${usuarioId}`, {
            method: HTTPMethod.GET, 
            headers: this.obterHeaders()
        })

        if (!response.ok) {
            throw new Error(`Erro ao recuperar o usuario ${response.text}`);
        }

        const usuario: Usuario = await response.json();
        return usuario
    }
}