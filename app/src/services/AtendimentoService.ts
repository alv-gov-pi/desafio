import { Atendimento } from "@/types/atendimento";
import { BaseService } from "./BaseService";
import { InteracaoAtendimento } from "@/types/interacao-atendimento";
import { AvaliacaoAtendimento } from "@/types/avaliacao-atendimento";
import { QuantidadeAtendimentoPorResponsavel } from "@/types/quantidade-atendimento-por-responsavel";
import { AtendimentoPorData } from "@/types/atendimento-por-data";
import { AtendimentoTotais } from "@/types/atendimentos-totais";
import { AvaliacaoAtendimentoPorSetor } from "@/types/avaliacao-atendimento-por-setor";
import { AvaliacaoAtendimentoPorServico } from "@/types/avaliacao-atendimento-por-servico";
import HTTPMethod from "http-method-enum";
import { ErroRequest } from "@/erro/ErroRequest";

export class AtendimentoService extends BaseService {

    constructor(token: string) {
        super(token)
        this.dominio = 'atendimento';
    }

    async obterSolicitacoesPorSolicitanteId(solicitanteId: number): Promise<Atendimento[]> {
        const response = await fetch(`${this.baseUrl}/solicitacoes/por-solicitante/${solicitanteId}`, {
            method: HTTPMethod.GET,
            headers: this.obterHeaders()
        })
        const solicitacoes: Atendimento[] = await response.json()
        return solicitacoes
    }

    async exluirAtendimento(id: number) {
        const response = await fetch(`${this.obterUrlDominio()}/${id}/`, {
            method: HTTPMethod.DELETE,
            headers: this.obterHeaders()
        })
    }

    async obterAtendimentoPorId(idAtendimento: string): Promise<Atendimento> {
        const response = await fetch(`${this.obterUrlDominio()}/${idAtendimento}/`, {
            method: HTTPMethod.GET,
            headers: this.obterHeaders()
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar os dados ${response}`);
        }

        const atendimento: Atendimento = await response.json();
        return atendimento;
    }

    async adicionarAtendimento(atendimento: Atendimento) {
        const response = await fetch(`${this.obterUrlDominio()}/`, {
            method: HTTPMethod.POST,
            headers: this.obterHeaders(),
            body: JSON.stringify({
                "servico": atendimento.servico,
                "solicitante": atendimento.solicitante,
                "observacao": atendimento.observacao
            })
        })

        if (!response.ok) {
            throw new ErroRequest(response);
        }

        const novoAtendimento: Atendimento = await response.json();
        return novoAtendimento;

    }

    async finalizarAtendimento(atendimento: Atendimento) {
        const data = JSON.stringify({
            "id": atendimento.id,
            "responsavel": atendimento.responsavel,
            "servico": atendimento.servico,
            "solicitante": atendimento.solicitante,
            "solucao": atendimento.solucao,
            "atendido": true,
            "resolvido_em": new Date()
        })
        console.log(data)
        const response = await fetch(`${this.obterUrlDominio()}/${atendimento.id}/`, {
            method: HTTPMethod.PUT,
            headers: this.obterHeaders(),
            body: data,
        });
    }

    async adicionarAvaliacaoAtendimento(avaliacaoAtendimento: AvaliacaoAtendimento, idAtendimento: number) {
        console.log(avaliacaoAtendimento)
        const response = await fetch(`${this.obterUrlDominio()}/${idAtendimento}/avaliacao/`, {
            method: HTTPMethod.POST,
            headers: this.obterHeaders(),
            body: JSON.stringify(avaliacaoAtendimento)
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar avaliacao de atendimento ${response}`);
        }

        const novaAvaliacaoAtendimento: AvaliacaoAtendimento = await response.json();
        return novaAvaliacaoAtendimento;
    }

    async adicionarInterecaoAtendimento(interacao: InteracaoAtendimento): Promise<InteracaoAtendimento> {
        const response = await fetch(`${this.obterUrlDominio()}/${interacao.idAtendimento}/interacao/adicionar/`, {
            method: HTTPMethod.POST,
            headers: this.obterHeaders(),
            body: JSON.stringify({ 'atendimento': interacao.idAtendimento, 'texto': interacao.texto, 'tipoUsuario': interacao.tipoUsuario })
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar interacao ${response}`);
        }

        const interacaoAtendimento: InteracaoAtendimento = await response.json();
        return interacaoAtendimento;
    }

    async obterInteracoesPorAtendimeto(idAtendimento: string): Promise<InteracaoAtendimento[]> {
        const response = await fetch(`${this.obterUrlDominio()}/${idAtendimento}/interacoes/`, {
            method: HTTPMethod.GET,
            headers: this.obterHeaders()
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar os dados do atentimento ${idAtendimento}: Detalhes ${JSON.stringify(response)}`);
        }

        const interacoes: InteracaoAtendimento[] = await response.json();
        return interacoes;
    }

    async atualizaResponsavel(idUsuarioLogado: Number, atendimento: Atendimento): Promise<Atendimento> {
        const response = await fetch(`${this.obterUrlDominio()}/${atendimento.id}/`, {
            method: HTTPMethod.PUT,
            headers: this.obterHeaders(),
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

    async obterEstatisticasAtentimentoPorData(): Promise<AtendimentoPorData[]> {

        const response = await fetch(`${this.obterUrlDominio()}/estatisticas/por-data/`, {
            method: HTTPMethod.GET,
            headers: this.obterHeaders()
        })

        const atendimentosPorData: AtendimentoPorData[] = await response.json()
        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }
        return atendimentosPorData

    }

    async obterEstatisticasTotais(): Promise<AtendimentoTotais> {

        const response = await fetch(`${this.obterUrlDominio()}/estatisticas/totais/`, {
            method: HTTPMethod.GET,
            headers: this.obterHeaders()
        })

        const atendimentosTotais: AtendimentoTotais = await response.json()
        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }
        return atendimentosTotais

    }

    async obterEstatisticasAvaliacaoPorSetorSolicitante(): Promise<AvaliacaoAtendimentoPorSetor[]> {

        const response = await fetch(`${this.obterUrlDominio()}/relatorio/avaliacao/por-sertor-solicitante/`, {
            method: HTTPMethod.GET,
            headers: this.obterHeaders()
        })

        const avaliacaoAtendimentoPorSetor: AvaliacaoAtendimentoPorSetor[] = await response.json()
        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }
        return avaliacaoAtendimentoPorSetor;

    }

    async obterEstatisticasAvaliacaoPorServicoSolicitado(): Promise<AvaliacaoAtendimentoPorServico[]> {

        const response = await fetch(`${this.obterUrlDominio()}/estatisticas/avaliacao/por-servico-solicitado`, {
            method: HTTPMethod.GET,
            headers: this.obterHeaders()
        })

        const avaliacaoAtendimentoPorServico: AvaliacaoAtendimentoPorServico[] = await response.json()
        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }
        return avaliacaoAtendimentoPorServico;

    }

    async obterAtentimentoPorServicos(servicos_string: String): Promise<Atendimento[]> {

        const response = await fetch(`${this.obterUrlDominio()}/por-setor/?ids=${servicos_string}`, {
            method: HTTPMethod.GET,
            headers: this.obterHeaders()
        })

        if (!response.ok) {
            throw new Error(`Erro ao solicitar os dados dos atendimentos, detalhes: ${response}`);
        }

        const atendimentos: Atendimento[] = await response.json()
        return atendimentos
    }

    async obterQuantidadedeAtendimentosPorResponsavel(): Promise<QuantidadeAtendimentoPorResponsavel[]> {
        const response = await fetch(`${this.obterUrlDominio()}/por-responsavel/`, {
            method: HTTPMethod.GET,
            headers: this.obterHeaders()
        });

        if (!response.ok) {
            console.log("response ", response.statusText, response.url, response.status, response.headers, response.body, response.type, response.bodyUsed)
            throw new Error(`Erro ao solicitar os atendimentos por ${response}`);
        }

        const quantidadeAtendimentoPorResponsavel: QuantidadeAtendimentoPorResponsavel[] = await response.json();
        return quantidadeAtendimentoPorResponsavel;
    }

}