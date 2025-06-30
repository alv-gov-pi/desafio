export type Setor = {
    nome: string,
    sigle: string
}

export type Servico = {
    nome: string,
    setor_ofetante: Setor
}

export type Usuario = {
    nome: string,
    email: string,
    password: string,
    esta_ativo: boolean,
    genero: string,
    setor: Setor
    cadastrado_em: Date
}

export type Atendimento = {
    servico: Servico,
    solicitante: Usuario,
    responsavel: Usuario,
    atendido: boolean
    cadastrado_em: Date
}

export type AvaliacaoAtendimento = {
    nota: number,
    genero_solicitante: string
    servico_solicitado: Servico,
    setor_solicitante: Setor,
    cadastrado_em: Date
}

export type PainelAvaliacaoServico = {
    nome: string,
    servico_avaliado: Servico,
    esta_visivel: true
}

export type ApiSignIn = {
    usuario: Usuario,
    refresh: string,
    access: string
}

