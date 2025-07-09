import SelectGenero from "@/components/select/genero";
import SelectSetor from "@/components/select/setor";
import { Usuario } from "@/types/usuario";

function FormEditarUsuario({usuario}: {usuario: Usuario}) {
    async function atualizar(formData: FormData) {
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
    <form action={atualizar} className='grid content-center gap-2 w-150'>
        <div className="grid">
          <label htmlFor="nome"/>Nome Completo
          <input type="text" id='nome' className="border border-sky-600 rounded-sm" name="nome" defaultValue={usuario.nome}/>
        </div>
        <div className="grid">
          <label htmlFor="email"/>Email
          <input type="text" id='email' className="border border-sky-600 rounded-sm" name="email" defaultValue={usuario.email}/>
        </div>
        <div className="grid">
          <label htmlFor="genero"/>Genero
          <SelectGenero sigla={usuario.genero}/>
        </div>
        <div className="grid">
          <label htmlFor="setor"/>Setor
          
          <SelectSetor id_setor_atual={String(usuario.setor)}/>
        </div>
        <div className="grid">
              <label htmlFor="password"/>Nova senha
              <input type="password" id='nova_password' className="border border-sky-600 rounded-sm" name="nova_password"/>
        </div>
        <div className="grid">
              <label htmlFor="password"/>Confirme a Nova senha
              <input type="password" id='confirma_password' className="border border-sky-600 rounded-sm" name="confirma_password"/>
        </div>
        <div className="grid grid-cols-2 content-between">
            <div><button className="bg-green-600 p-2 rounded-sm w-24 text-white" type="submit">Salvar</button></div>
        </div>
    </form>
    )
}

export default FormEditarUsuario;