'use client'
import { Usuario } from "@/models/Auth";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function TabelaUsuario() {
    const [usuarios, setUsuarios] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/usuarios.json')
        .then(res => res.json())
        .then(data => setUsuarios(data.results))

    }, [])
    
    return (
        <table className="border-separate border-spacing-3 border border-gray-400">
            <caption className="caption-top">
                    Todos os Usuários
            </caption>
            <thead>
                <tr>
                    <th className="border border-gray-300 dark:border-gray-600">Nome</th>
                    <th className="border border-gray-300 dark:border-gray-600">E-mail</th>
                    <th className="border border-gray-300 dark:border-gray-600">Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios.map((usuario: Usuario) => (
                        <tr >
                            <td className="border border-gray-300 dark:border-gray-700">{usuario.nome}</td>
                            <td className="border border-gray-300 dark:border-gray-700">{usuario.email}</td>
                            <td className="border border-gray-300 dark:border-gray-700">
                                <button >Editar</button><button>Apagar</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}