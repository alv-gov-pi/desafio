export type Setor = {
    id: Number,
    nome: string,
    sigla: string
}

export type Servico = {
    id: Number,
    nome: string,
    setor_ofetante: Setor
}

export type Usuario = {
    id: Number,
    nome: string,
    email: string,
    password: string,
    esta_ativo: boolean,
    genero: string,
    setor: Setor
    cadastrado_em: Date,   
}

export type Atendimento = {
    id: Number,
    servico: Servico,
    solicitante: Usuario,
    responsavel: Usuario,
    atendido: boolean
    cadastrado_em: Date
}

export type AvaliacaoAtendimento = {
    id: Number,
    nota: number,
    genero_solicitante: string
    servico_solicitado: Servico,
    setor_solicitante: Setor,
    cadastrado_em: Date
}

export type PainelAvaliacaoServico = {
    id: Number,
    nome: string,
    servico_avaliado: Servico,
    esta_visivel: true
}

export type ApiSignIn = {
    id: Number,
    usuario: Usuario,
    refresh: string,
    access: string
}

