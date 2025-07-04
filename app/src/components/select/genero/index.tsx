
export default function SelectGenero({ sigla }: {sigla: string}) {
    return (
        <select name="genero" id="genero" className="border border-sky-600 rounded-sm" defaultValue={sigla}>
            <option value="F" >Feminino</option>
            <option value="M" >Masculino</option>
        </select>
    )
}