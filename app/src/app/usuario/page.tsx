import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ButtonLogout from "@/components/buttons/logout"
import HeaderApp from "@/components/template/autenticado/header/header";
import CardSetor from "@/components/card/setor/card-setor";
import { redirect } from "next/navigation";

export default async function UserHome() {
    const session = await getServerSession(authOptions)
    const response = await fetch(`http://localhost:8000/usuario/setores.json`, {
        method: "GET"
    })
    const setores = [{ "id": 1, "nome": "Secretaria de Planejamento do Piaui", "sigla": "SEPLAN", "setor_superior": null }, 
        { "id": 2, "nome": "Diretoria de Tecnologia da Informação e Inovação", "sigla": "DITI", "setor_superior": 1 }, 
        { "id": 3, "nome": "Núcleo de Controle Interno", "sigla": "NCI", "setor_superior": 1 }, 
        { "id": 4, "nome": "Assessoria Técnica", "sigla": "ASTEC", "setor_superior": 1 }, 
        { "id": 5, "nome": "Assessoria Técnica de Comunicação", "sigla": "ASCOM", "setor_superior": 1 }, 
        { "id": 6, "nome": "Diretoria Administrativa e Financeira", "sigla": "DAFIN", "setor_superior": 1 }, 
        { "id": 7, "nome": "Superintendência de Estudos Econômicos e Sociais", "sigla": "CEPRO", "setor_superior": 1 }]
    if (!session) {
        redirect('/')
    }

    return (
        <main>
            <HeaderApp usuario_id={7} />
            <h1>Bem vindo, {session?.user?.name} ! as seguintes secretarias ofertam serviços: </h1>
            <div className="flex flex-row gap-5 flex-wrap justify-center mt-2">
                {setores.map(s => <CardSetor key={s.id} setor={s} />)}
            </div>

            <ButtonLogout />
        </main>
    )
}