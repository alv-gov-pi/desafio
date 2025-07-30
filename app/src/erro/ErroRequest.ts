
export class ErroRequest extends Error {
    constructor(response: Response){
        super(`${response.status}(${response.statusText}: ${response.url})`)
        this.name = "Erro ao realizar request!"
        Object.setPrototypeOf(this, ErroRequest.prototype);
    }
}