'use client'
import { SetorService } from "@/services/SetorService"
import { Setor } from "@/types/setor"
import { useEffect, useState } from "react";

export default function SelectSetor({ id_setor_atual, onChange  }: {id_setor_atual?: string, onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void}) {
    const setorService: SetorService = new SetorService();
    const [setores, setSetores ] = useState<Setor[]>([]);
    useEffect(() => {
         const buscarSetores = async () => {
            const setoresRecuperados: Setor[] = await setorService.obterTodosSetores();
            setSetores(setoresRecuperados);
         }
         buscarSetores()
    }, [setores])
   
    return (
        <select name="setor" id="setor" className="border border-sky-600 rounded-sm" defaultValue={id_setor_atual} onChange={onChange}>
            {setores.map((setor: Setor) => (
                <option key={setor.id.toString()} value={setor.id}>{setor.nome}</option>
            ))}
        </select>
    )
}