import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CardSetor from "@/components/card/setor/card-setor";
import TemplateApp from "@/components/template/autenticado/template";
import { redirect } from "next/navigation";
import { Setor } from "@/types/setor";

export default async function UserHome() {
    const session = await getServerSession(authOptions)
    const response = await fetch(`http://localhost:8000/setores.json`, {
        method: "GET"
    })
    const setores: Setor[] = await response.json()

    if (!session) {
        redirect('/')
    }

    return (
        <TemplateApp>
            <div>
                <h1>Bem vindo, {session?.user?.name} ! as seguintes secretarias ofertam serviços: </h1>
                <div className="flex flex-row gap-5 flex-wrap justify-center mt-2 h-10/12">
                    {setores.map(s => <CardSetor key={`${s.id}`} setor={s} />)}
                </div>
            </div>
        </TemplateApp>
    )
}