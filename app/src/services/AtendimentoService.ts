import { Atendimento } from "@/types/atendimento";
import { BaseService } from "./BaseService";

export class AtendimentoService extends BaseService {
    protected dominio: string = 'atendimento';

    async obterAtendimentoPorId(idAtendimento: number): Promise<Atendimento | undefined> {
         try {
            const response = await fetch(`${this.obterUrlDominio()}/${idAtendimento}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar os dados');
            }

            const atendimento: Atendimento = await response.json();
            return atendimento;

        } catch (err) {
            console.error(err);
        }
    }

    async atualizaResponsavel(idUsuarioLogado: Number, atendimento: Atendimento): Promise<Atendimento | undefined> {
        try {
            const response = await fetch(`${this.obterUrlDominio()}/${atendimento.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": atendimento.id,
                    "responsavel": idUsuarioLogado,
                    "servico": atendimento.servico,
                    "solicitante": atendimento.solicitante
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar os dados');
            }

            const data = await response.json();
            return data;

        } catch (err) {
            console.error(err);
        }
    }

    async obterAtentimentoPorServicos(servicos_string: String): Promise<Atendimento[] | null> {
        try {
            console.log(`${this.obterUrlDominio()}/por-setor/?ids=${servicos_string}/`)
            const response = await fetch(`http://localhost:8000/atendimentos/por-setor/?ids=9`, {
                method: "GET"
            })
            
            const atendimentos: Atendimento[] = await response.json()
            return atendimentos
        } catch (error) {
            console.log(error)
        }
        
        return null
    }


}