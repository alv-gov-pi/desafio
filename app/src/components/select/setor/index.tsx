import { Setor } from "@/models/Auth"


export default async function SelectSetor() {
    
    const setores: Setor[] = await fetch(`http://localhost:8000/setores.json`)
        .then(res => res.json())
        .then(data => data.results)

    return (
        <select name="setor" id="setor" className="border border-sky-600 rounded-sm">
            {setores.map((setor: Setor) => (
                <option key={setor.id.toString()} defaultValue={setor.id.toString()}>{setor.nome}</option>
            ))}
        </select>
    )
}