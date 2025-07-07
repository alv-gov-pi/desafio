import { signIn } from "@/auth";

export async function GET(request: Request) {
    return signIn('CredentialsProvedor', {
        redirectTo: 'http://localhost:3000/login'
    })
}