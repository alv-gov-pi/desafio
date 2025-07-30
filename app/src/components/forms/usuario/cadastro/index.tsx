import SelectSetor from "@/components/select/setor";
import { Setor } from "@/types/setor";

function FormCadastroUsuario({setores}: {setores: Setor[]}) {
  async function signup(formData: FormData) {
    'use server'
    try {
      const response = await fetch(`http://localhost:8000/signup`, {
        method: "POST",
        body: formData
      })

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-6/12 justify-center items-center">
      <h1 className="text-xl font-semibold text-content-emphasis">Cadastro</h1>
      <form action={signup} className='flexF flex-col gap-2 w-4/12 h-4/12'>
        <div className="flex flex-col">
          <label htmlFor="nome" />Nome Completo
          <input type="text" id='nome' className="border border-sky-600 rounded-sm" name="nome" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" />Email
          <input type="text" id='email' className="border border-sky-600 rounded-sm" name="email" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="genero" />Genero
          <select name="genero" id="genero" className="border border-sky-600 rounded-sm">
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" />Senha
          <input type="password" id='password' className="border border-sky-600 rounded-sm" name="password" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="setor" />Setor
          <SelectSetor setores={setores}/>
        </div>
        <div className="flex content-between">
          <div><button className="bg-green-600 p-2 rounded-sm w-24 text-white" type="submit">Salvar</button></div>
        </div>
      </form>
    </div>
  )
}

export default FormCadastroUsuario;