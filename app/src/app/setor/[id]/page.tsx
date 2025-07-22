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
            <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12">
                <h1 className="text-xl font-semibold text-content-emphasis">Serviços da {setor.nome}({setor.sigla})</h1>
                <div className="flex flex-col gap-5 justify-center mt-2">
                    {servicos.map((servico) => <CardServico key={`${servico.id}`} servico={servico} />)}
                </div>
            </div>
        </TemplateApp>
    );
}