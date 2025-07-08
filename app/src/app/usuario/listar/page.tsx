'use client'
import TabelaUsuario from "@/components/tabelas/usuario";
import { useState, useEffect } from "react";
export default function listarUsuario() {
    const [posts, setUsuarios] = useState([])
    useEffect(() => {
        fetch('localhost:8000/usuarios')
        .then(res => res.json())
        .then(data => setUsuarios(data.usuarios))
    }, [])
    return(
        <main>
            <h1>Todos os Usuários</h1>
            <TabelaUsuario/>
        </main>
    )
}