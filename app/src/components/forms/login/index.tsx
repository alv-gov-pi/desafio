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
        const result = await signIn('Credentials', {
            email,
            password,
            redirect: false
        })

        if (result?.error) {
            console.log(result)
            return
        }

        router.replace('/admin')
        
    }
    return(
            <form onSubmit={login} className='grid content-center gap-2 w-150'>
                <div className="grid">
                    <label htmlFor="email"/>Email
                    <input type="text" id='email'  
                    className="border border-sky-600 rounded-sm" 
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="grid">
                    <label htmlFor="password"/>Senha
                    <input type="password" 
                    id='password'   
                    className="border border-sky-600 rounded-sm" 
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-2 content-between">
                    <div><button className="bg-sky-600 p-2 rounded-sm w-24 text-white" type="submit">Logar</button></div>
                    <div className="mt-5 ml-59"><Link className="text-sky-600" href={'/usuario/cadastro'}>Cadastro</Link></div>
                </div>
        </form> 
    )
}

export default FormLogin;