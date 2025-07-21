import { Atendimento } from "@/types/atendimento";
import { BaseService } from "./BaseService";
import { InteracaoAtendimento } from "@/types/interacao-atendimento";

export class AtendimentoService extends BaseService {
    protected dominio: string = 'atendimento';

    async obterAtendimentoPorId(idAtendimento: string): Promise<Atendimento> {
        const response = await fetch(`${this.obterUrlDominio()}/${idAtendimento}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar os dados ${response}`);
        }

        const atendimento: Atendimento = await response.json();
        return atendimento;
    }

    async obterInteracoesPorAtendimeto(idAtendimento: string): Promise<InteracaoAtendimento[]> {
        const response = await fetch(`http://localhost:8000/atendimento/${idAtendimento}/interacoes/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar os dados ${response}`);
        }

        const interacoes: InteracaoAtendimento[] = await response.json();
        return interacoes;
    }

    async atualizaResponsavel(idUsuarioLogado: Number, atendimento: Atendimento): Promise<Atendimento> {
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
    }

    async obterAtentimentoPorServicos(servicos_string: String): Promise<Atendimento[] > {
        try {
            console.log(`${this.obterUrlDominio()}/por-setor/?ids=${servicos_string}/`)
            const response = await fetch(`http://localhost:8000/atendimentos/por-setor/?ids=9`, {
                method: "GET"
            })

            const atendimentos: Atendimento[] = await response.json()
            return atendimentos
        } catch (error) {
             throw new Error(`Erro ao solicitar os dados, detalhes: ${error}`);
        }
    }
}