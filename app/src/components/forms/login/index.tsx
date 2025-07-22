'use client'
import { ApiSignIn } from "@/types/api-sign-in";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

function FormLogin() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()

    async function login(event: SyntheticEvent) {
        event.preventDefault()

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })

        if (result?.error) {
            console.log(result)
            return
        }

        router.replace('/usuario')

    }
    return (
        <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 w-8/12 flex flex-col mr-4 gap-1.5">
            <h1 className="text-xl font-semibold text-content-emphasis">Login</h1>
            <form onSubmit={login} method="POST">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" />Email
                    <input type="text" id='email'
                        className="border border-sky-600 rounded-sm"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" />Senha
                    <input type="password"
                        id='password'
                        className="border border-sky-600 rounded-sm"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <div className="flex justify-between gap-1.5 mt-1.5">
                    <div><button className="bg-sky-600 p-2 rounded-sm w-24 text-white" type="submit">Logar</button></div>
                    <div className="mt-5 ml-59"><Link className="text-sky-600" href={'/usuario/cadastro'}>Cadastro</Link></div>
                </div>
            </form>
        </div>
    )
}

export default FormLogin;