import HTTPMethod from "http-method-enum";
import { BaseService } from "./BaseService";
import { Servico } from "@/types/servico";
export class ServicoService extends BaseService {
    constructor(token: string) {
        super(token)
        this.dominio = 'servico';
    }

    async obterServicoPorId(id: number) {
        const response = await fetch(`${this.obterUrlDominio()}/${id}`, {
            method: HTTPMethod.GET, 
            headers: this.obterHeaders()
        })

        if (!response.ok) {
            console.log(response)
            throw new Error(`Erro ao recuperar os setores ${JSON.stringify(response)}`);
        }

        const servico: Servico = await response.json();
        return servico;
    }
}