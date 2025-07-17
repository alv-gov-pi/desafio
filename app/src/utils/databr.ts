export function formataStringDate(dataString: Date): string {
        const cadastradoEm = new Date(dataString);
        return cadastradoEm.toLocaleDateString("pt-BR");
}