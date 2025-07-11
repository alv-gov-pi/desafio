import TemplateApp from "@/components/template/autenticado/template";
import { Setor } from "@/types/setor";

export default async function setor({ params }: { params: Promise<{ id: number }>}){
    const { id } = await params;
    const response = await fetch(`http://localhost:8000/setor/${id}`, {
        method: "GET"
    })

    const setor: Setor = await response.json();
    console.log(setor)
    return (
        <TemplateApp>
            <h1>Serviços da {setor.nome}({setor.sigla})</h1>
        </TemplateApp>
    );
}