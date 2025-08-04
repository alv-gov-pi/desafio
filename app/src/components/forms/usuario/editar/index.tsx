'use client'
import SelectGenero from "@/components/select/genero";
import SelectSetor from "@/components/select/setor";
import { SetorService } from "@/services/SetorService";
import { UsuarioService } from "@/services/UsuarioService";
import { Setor } from "@/types/setor";
import { Usuario } from "@/types/usuario";
import mostrarNotificacao from "@/utils/notification";
import { SyntheticEvent, useState } from "react";

function FormEditarUsuario({ usuario, token, setores }: { usuario: Usuario, token: string, setores: Setor[] }) {
  const usuarioService = new UsuarioService(token);
  const setorService: SetorService = new SetorService(token);
  const [usuarioEdidado, setUsuarioEditado ] = useState(usuario);
  async function atualizar(event: SyntheticEvent) {
    event.preventDefault();
    const response = await usuarioService.atualizarUsuario(usuarioEdidado);
    if(!!response){
      mostrarNotificacao('Dados atualizados com sucesso', '👏 Obrigado por nos manter atualizados!!!')
    }else {
      mostrarNotificacao('Erro ao atualizar os dados', '🫤 Forneça dados válidos !!!')
    }

  }

  return (
    <div className="flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-6/12 justify-center items-center">
      <h1 className="text-xl font-semibold text-content-emphasis">Edite seus dados </h1>
      <form method="POST" className='flex flex-col w-150' onSubmit={atualizar}>
        <div className="flex flex-col">
          <label htmlFor="nome" />Nome Completo
          <input type="text" id='nome' className="border border-sky-600 rounded-sm" name="nome" defaultValue={usuarioEdidado.nome} onChange={(e) => setUsuarioEditado({...usuarioEdidado, 'nome': e.target.value})}/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" />Email
          <input type="text" id='email' className="border border-sky-600 rounded-sm" name="email" defaultValue={usuarioEdidado.email} onChange={(e) => setUsuarioEditado({...usuarioEdidado, 'email': e.target.value})}/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="genero">Genero</label>
          <SelectGenero sigla={usuarioEdidado.genero} onChange={(e) => setUsuarioEditado({...usuarioEdidado, 'genero': e.target.value})}/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="setor"/>Setor

          <SelectSetor id_setor_atual={String(usuarioEdidado.setor)} setores={setores} onChange={(e) => setUsuarioEditado({...usuarioEdidado, 'setor': Number(e.target.value)})} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" />Nova senha
          <input type="password" id='nova_password' className="border border-sky-600 rounded-sm" name="nova_password" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirma_password" />Confirme a Nova senha
          <input type="password" id='confirma_password' className="border border-sky-600 rounded-sm" name="confirma_password" />
        </div>
        <div className="flex">
          <div><button className="bg-green-600 p-2 rounded-sm w-24 text-white mt-2" type="submit">Salvar</button></div>
        </div>
      </form>
    </div>
  )
}

export default FormEditarUsuario;