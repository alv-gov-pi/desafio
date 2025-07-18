export abstract class BaseService {
    private baseUrl = 'http://localhost:8000'
    protected dominio = ''

    public obterUrlDominio() {
        return `${this.baseUrl}/${this.dominio}`
    }
}