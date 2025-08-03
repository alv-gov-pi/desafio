'use client'
import SelectSetor from "@/components/select/setor";
import { SignupService } from "@/services/SignupService";
import { Setor } from "@/types/setor";
import { Usuario } from "@/types/usuario";
import { redirect } from "next/navigation";
import { useState } from "react";

function FormCadastroUsuario({setores}: {setores: Setor[]}) {

   const sigupService = new SignupService();
   const [novoUsuario, setNovoUsuario] = useState({});
  async function cadastrar(e:any) {
    e.preventDefault();
    const usuario: Usuario = {...novoUsuario};
    console.log(usuario);
    sigupService.cadastrar(usuario);
  }
  async function voltar(e) {
      e.preventDefault();
     redirect('/');
  }
  return (
    <div className="flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-6/12 justify-center items-center">
      <h1 className="text-xl font-semibold text-content-emphasis">Cadastro</h1>
      <form  className='flexF flex-col gap-2 w-4/12 h-4/12'>
        <div className="flex flex-col">
          <label htmlFor="nome" />Nome Completo
          <input type="text" id='nome' className="border border-sky-600 rounded-sm" name="nome" onChange={(e) => setNovoUsuario({...novoUsuario, 'nome': e.target.value})}/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" />Email
          <input type="text" id='email' className="border border-sky-600 rounded-sm" name="email"  onChange={(e) => setNovoUsuario({...novoUsuario, 'email': e.target.value})}/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="genero" />Genero
          <select name="genero" id="genero" className="border border-sky-600 rounded-sm"  onChange={(e) => setNovoUsuario({...novoUsuario, 'genero': e.target.value})}>
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" />Senha
          <input type="password" id='password' className="border border-sky-600 rounded-sm" name="password"  onChange={(e) => setNovoUsuario({...novoUsuario, 'password': e.target.value})}/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="setor" />Setor
          <SelectSetor setores={setores}  onChange={(e) => setNovoUsuario({...novoUsuario, 'setor': e.target.value})}/>
        </div>
        <div className="flex justify-end mt-1  gap-2">
            <button className="bg-green-600 p-2 rounded-sm w-16 text-white" type="submit" onClick={e => cadastrar(e)}>Salvar</button>
            <button className="bg-blue-600 p-2 rounded-sm w-16 text-white" onClick={e => voltar(e)}>Voltar</button> 
        </div>
      </form>
    </div>
  )
}

export default FormCadastroUsuario;