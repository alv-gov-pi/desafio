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
    <form action={signup} className='grid content-center gap-2 w-150'>
        <div className="grid">
          <label htmlFor="nome"/>Nome Completo
          <input type="text" id='nome' className="border border-sky-600 rounded-sm" name="nome"/>
        </div>
        <div className="grid">
          <label htmlFor="email"/>Email
          <input type="text" id='email' className="border border-sky-600 rounded-sm" name="email"/>
        </div>
        <div className="grid">
          <label htmlFor="genero"/>Genero
          <select name="genero" id="genero" className="border border-sky-600 rounded-sm">
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
        <div className="grid">
              <label htmlFor="password"/>Senha
              <input type="password" id='password' className="border border-sky-600 rounded-sm" name="password"/>
        </div>
        <div className="grid">
          <label htmlFor="setor"/>Setor
          <SelectSetor />
        </div>
        <div className="grid grid-cols-2 content-between">
            <div><button className="bg-green-600 p-2 rounded-sm w-24 text-white" type="submit">Salvar</button></div>
        </div>
    </form>
    )
}

export default FormCadastroUsuario;