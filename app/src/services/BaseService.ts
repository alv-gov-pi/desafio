export abstract class BaseService {
    
    protected baseUrl = 'http://localhost:8000'
    protected token: string;
    protected dominio = ''
    protected urlDominio: string;
    constructor(token: string) {
        this.token = token;
        this.urlDominio = `${this.baseUrl}/${this.dominio}`;
    }

    public obterUrlDominio(): string {
        return `${this.baseUrl}/${this.dominio}`;
    }

    protected obterHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        }
    }
}