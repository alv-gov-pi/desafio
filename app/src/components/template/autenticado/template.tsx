import HeaderApp from "./header/header";
import FooterApp from "./footer";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export  default async function TemplateApp({ children }: { children: React.ReactNode }) {
    const  session = await getServerSession(authOptions)
    return (
        <div className="flex flex-col h-screen justify-between">
            <HeaderApp usuario_id={session?.user.id} />
            <main className="flex flex-col justify-center items-center w-screen">
                {children}
            </main>
            <FooterApp />
        </div>
    );
}