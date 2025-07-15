import TemplateApp from "@/components/template/autenticado/template";
import { Servico } from "@/types/servico";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Usuario } from "@/types/usuario";
import { Atendimento } from "@/types/atendimento";

export default async function confirmacao({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions)
    
    const emailUsuario = session?.user?.email;
    const response = await fetch(`http://localhost:8000/servico/${id}`, {
        method: "GET"
    })
    const servico: Servico = await response.json();

    const responseSolicitante = await fetch(`http://localhost:8000/usuario/por-email/${emailUsuario}/`, {
        method: "GET"
    })
    const solicitante : Usuario = await responseSolicitante.json();
    console.log(solicitante.nome);
    const atendimentoFormada = new FormData;
    atendimentoFormada.append('servico', `${servico.id}`)
    atendimentoFormada.append('solicitante', `${solicitante.id}`)
    const responseAtendimento = await fetch(`http://localhost:8000/atendimentos/`, {
        method: "POST",
        body: atendimentoFormada
    })

    const atendimento: Atendimento = await responseAtendimento.json();
  
    return (
        <TemplateApp>
            <div><h1>Você solicitou o serviço {servico.nome}, foi registrado com identificador {`${atendimento.id}`}, a equipe da unidade em breve começara a atuar no seu caso.</h1></div>
        </TemplateApp>
    );
}