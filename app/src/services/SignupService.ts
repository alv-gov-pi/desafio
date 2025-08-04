import { Usuario } from "@/types/usuario";
import { BaseService } from "./BaseService";
import { redirect } from "next/navigation";

export class SignupService extends BaseService {
    async cadastrar(usuario: Usuario) {
        try {
            const response = await fetch(`${this.baseUrl}/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: usuario.nome,
                    email: usuario.email,
                    genero: usuario.genero,
                    password: usuario.password,
                    setor: usuario.setor
                })
            })
            console.log(`${response.ok} ${response.text} ${response}`)
            if (response.ok) {
                redirect('/')
            }

        } catch (error) {
            console.log(error)
        }
    }
}