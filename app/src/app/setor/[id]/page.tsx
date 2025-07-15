import TemplateApp from "@/components/template/autenticado/template";
import { Servico } from "@/types/servico";
import { Setor } from "@/types/setor";
import CardServico from "@/components/card/servico";

export default async function setor({ params }: { params: Promise<{ id: number }> }) {
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
            <div><h1>Serviços da {setor.nome}({setor.sigla})</h1></div>
            <div className="flex flex-col gap-5 justify-center mt-2">
                {servicos.map((servico) => <CardServico key={`${servico.id}`} servico={servico} />)}
            </div>
        </TemplateApp>
    );
}