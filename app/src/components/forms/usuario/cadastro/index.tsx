import SelectSetor from "@/components/select/setor";

function FormCadastroUsuario() {
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
    <form action={signup} className='flex flex-col gap-2 w-4/12 h-4/12'>
        <div className="flex flex-col">
          <label htmlFor="nome"/>Nome Completo
          <input type="text" id='nome' className="border border-sky-600 rounded-sm" name="nome"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email"/>Email
          <input type="text" id='email' className="border border-sky-600 rounded-sm" name="email"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="genero"/>Genero
          <select name="genero" id="genero" className="border border-sky-600 rounded-sm">
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
        <div className="flex flex-col">
              <label htmlFor="password"/>Senha
              <input type="password" id='password' className="border border-sky-600 rounded-sm" name="password"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="setor"/>Setor
          <SelectSetor />
        </div>
        <div className="flex content-between">
            <div><button className="bg-green-600 p-2 rounded-sm w-24 text-white" type="submit">Salvar</button></div>
        </div>
    </form>
    )
}

export default FormCadastroUsuario;