import TemplateApp from "@/components/template/autenticado/template";
import { Servico } from "@/types/servico";
import { Setor } from "@/types/setor";
import CardServico from "@/components/card/servico";
import { SetorService } from "@/services/SetorService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function setor({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions)
    const token: string  = session?.user.access;
    const setorService: SetorService = new SetorService(token);
    const setor: Setor = await setorService.obterSetorePorId(id);
    const servicos: Servico[] = await setorService.obterServicosPorSetorId(id);
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