import TemplateApp from "@/components/template/autenticado/template";
import { Servico } from "@/types/servico";
import { Setor } from "@/types/setor";

export default async function solicititacoes({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;

    const response = await fetch(`http://localhost:8000/setor/${id}`, {
        method: "GET"
    })

    const setor: Setor = await response.json();

    const responseServicos = await fetch(`http://localhost:8000/servicos-filtrados/?setor_ofertante=${id}`, {
        method: "GET"
    })

    const servicos: Servico[] = await responseServicos.json()
  
    return (
        <TemplateApp>
            <div><h1>Suas Solicitações em Atendimento:</h1></div>     
        </TemplateApp>
    );
}