'use client'
import { Setor } from "@/types/setor"

export default function SelectSetor({ id_setor_atual, setores, onChange  }: {id_setor_atual?: string, setores: Setor[], onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void}) {
   
    return (
        <select name="setor" id="setor" className="border border-sky-600 rounded-sm" defaultValue={id_setor_atual} onChange={onChange}>
            {setores.map((setor: Setor) => (
                <option key={setor.id.toString()} value={setor.id}>{setor.nome}</option>
            ))}
        </select>
    )
}