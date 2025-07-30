import HTTPMethod from "http-method-enum";
import { BaseService } from "./BaseService";
import { Setor } from "@/types/setor";
import { Servico } from "@/types/servico";
export class SetorService extends BaseService {
    constructor(token: string) {
        super(token)
        this.dominio = 'setor';
    }

    async obterTodosSetores(): Promise<Setor[]> {
        const response = await fetch(`${this.obterUrlDominio()}/`, {
            method: HTTPMethod.GET,
           
        })

        if (!response.ok) {
            console.log(response)
            throw new Error(`Erro ao recuperar os setores detalhes: status(${response.status} | ${response.statusText}) url(${response.url})`);
        }

        const setores: Setor[] = await response.json();
        return setores;
    }

    async obterSetorePorId(setorId: number): Promise<Setor> {
        const response = await fetch(`${this.obterUrlDominio()}/${setorId}`, {
            method: HTTPMethod.GET,
            headers: this.obterHeaders()
        })

        if (!response.ok) {
            console.log(response)
            throw new Error(`Erro ao recuperar os setores ${JSON.stringify(response)}`);
        }

        const setor: Setor = await response.json();
        return setor;
    }

    async obterServicosPorSetorId(servicoId: number): Promise<Servico[]> {
        const response = await fetch(`${this.baseUrl}/servicos-filtrados/?setor_ofertante=${servicoId}`, {
            method: HTTPMethod.GET,
            headers: this.obterHeaders()
        })

        if (!response.ok) {
            console.log(response)
            throw new Error(`Erro ao recuperar os serviços do setor ${JSON.stringify(response)}`);
        }

        const servicos: Servico[] = await response.json();

        return servicos;

    }
}