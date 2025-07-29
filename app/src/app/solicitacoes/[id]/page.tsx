import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TemplateApp from "@/components/template/autenticado/template";
import { SetorService } from "@/services/SetorService";
import { Servico } from "@/types/servico";
import { Setor } from "@/types/setor";
import { getServerSession } from "next-auth";

export default async function solicititacoes({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions)
    const token: string  = session?.user.access;
    const setorService: SetorService = new SetorService(token);


    const setor: Setor = await setorService.obterSetorePorId(id);


    const servicos: Servico[] = await setorService.obterServicosPorSetorId(id);
  
    return (
        <TemplateApp>
            <div><h1>Suas Solicitações em Atendimento:</h1></div>     
        </TemplateApp>
    );
}