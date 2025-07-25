'use client'
export default function SelectGenero({ sigla, onChange }: {sigla: string, onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void}) {
    return (
        <select name="genero" id="genero" className="border border-sky-600 rounded-sm" defaultValue={sigla} onChange={onChange}>
            <option value="F" >Feminino</option>
            <option value="M" >Masculino</option>
        </select>
    )
}