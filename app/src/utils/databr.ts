export function formataStringDate(dataString: string | Date): string {
        console.log(dataString)
        const cadastradoEm = new Date(dataString);
        return cadastradoEm.toLocaleDateString("pt-BR");
}