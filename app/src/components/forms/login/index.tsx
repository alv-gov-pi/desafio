import Link from "next/link";
import { ApiSignIn } from "@/models/Auth";
function FormLogin() {
    async function login(formData: FormData) {
        'use server'
        try {
            const email = formData.get('email')
            const password = formData.get('password')
            const response = await fetch(`http://localhost:8000/signin`, {
                method: "POST",
                body: formData
            })
            const data: ApiSignIn = await response.json()
            console.log(`nome: ${data.usuario.nome} access:${data.access} refresh:${data.refresh} `)
        } catch (error) {
            console.log(error)
        }
    }
    return(
            <form action={login} className='grid content-center gap-2 w-150'>
                <div className="grid">
                    <label htmlFor="email"/>Email
                    <input type="text" id='email' className="border border-sky-600 rounded-sm" name="email"/>
                </div>
                <div className="grid">
                    <label htmlFor="password"/>Senha
                    <input type="password" id='password' className="border border-sky-600 rounded-sm" name="password"/>
                </div>
                <div className="grid grid-cols-2 content-between">
                    <div><button className="bg-sky-600 p-2 rounded-sm w-24 text-white" type="submit">Logar</button></div>
                    <div className="mt-5 ml-59"><a href="http://" className="text-sky-600">Cadastro</a></div>
                </div>
        </form> 
    )
}

export default FormLogin;