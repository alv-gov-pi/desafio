import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ButtonLogout from "@/components/buttons/logout"

export default async function UserHome () {
    const session = await getServerSession(authOptions)
    console.error(`print da session: ${JSON.stringify(session)}`)
    return (
        <main>
            <h1>Bem vindo {session?.user?.name} </h1>
            <ButtonLogout />
        </main>
    )
}