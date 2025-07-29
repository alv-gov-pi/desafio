import HTTPMethod from "http-method-enum";

export class AuthService {
    protected baseUrl = 'http://localhost:8000';
    async login(email: string, password: string) {
        const data = JSON.stringify({email: email,  password: password})
        const response = await fetch(`${this.baseUrl}/signin`, {
          method: HTTPMethod.POST,
          headers: {
                'Content-Type': 'application/json',
            },
          body: data
        })
        return response;
    }


}