import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ButtonLogout from "@/components/buttons/logout"

export default async function UserHome () {
    const session = await getServerSession(authOptions)
    console.log(`session: ${JSON.stringify(session)}`)
    return (
        <main>
            <h1>Bem vindo Nome do usuario</h1>
            <ButtonLogout />
        </main>
    )
}