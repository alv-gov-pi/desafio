import TemplateApp from "@/components/template/autenticado/template";

export default async function confirmacao({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;

    const response = await fetch(`http://localhost:8000/atendimento/${id}/`, {
        method: "DELETE"
    })
    
    
    return (
        <TemplateApp>
            <div><h1>Você Excluiu a solicitação com sucesso!!!</h1></div>
        </TemplateApp>
    );
}