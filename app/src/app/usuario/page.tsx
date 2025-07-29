import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CardSetor from "@/components/card/setor/card-setor";
import TemplateApp from "@/components/template/autenticado/template";
import { redirect } from "next/navigation";
import { Setor } from "@/types/setor";
import { SetorService } from "@/services/SetorService";

export default async function UserHome() {
    const session = await getServerSession(authOptions)
    const token: string  = session?.user.access;
    const setorService: SetorService = new SetorService(token);
    const setores: Setor[] = await setorService.obterTodosSetores();

    if (!session) {
        redirect('/')
    }

    return (
        <TemplateApp>
            <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12 flex flex-col">
                <h1 className="text-xl font-semibold text-content-emphasis">Bem vindo, {session?.user?.name} ! os seguintes orgãos ofertam serviços: </h1>
                <div className="flex flex-row gap-2 flex-wrap mt-2 justify-center">
                    {setores.map(s => <CardSetor key={`${s.id}`} setor={s} />)}
                </div>
            </div>
        </TemplateApp>
    )
}