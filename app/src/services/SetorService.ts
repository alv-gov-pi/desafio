import { BaseService } from "./BaseService";
import { Setor } from "@/types/setor";
export class SetorService extends BaseService {
    constructor() {
        super()
        this.dominio = 'setor';
    }

    async obterTodosSetores(): Promise<Setor[]> {
        const response = await fetch(`${this.obterUrlDominio()}es/`, {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error(`Erro ao recuperar os setores ${response}`);
        }

        const setores: Setor[] = await response.json();
        return setores;
    }
}