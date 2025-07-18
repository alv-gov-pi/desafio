import { Setor } from "@/types/setor"

export default async function SelectSetor({ id_setor_atual }: {id_setor_atual?: string}) {
    
    const setores: Setor[] = await fetch(`http://localhost:8000/setores.json`)
        .then(res => res.json())
  
    return (
        <select name="setor" id="setor" className="border border-sky-600 rounded-sm" defaultValue={id_setor_atual}>
            {setores.map((setor: Setor) => (
                <option key={setor.id.toString()} value={setor.id.toString()}>{setor.nome}</option>
            ))}
        </select>
    )
}