import FormLogin from '../../components/forms/login';
import BackgroundLadoEsquerdo from '../../components/backgrounds';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from '../api/auth/[...nextauth]/route';

async function PaginaLogin() {
    const session = await getServerSession(authOptions)
    if (session) {
            redirect('/usuario')
        }
    return(
        <main className='grid grid-cols-2 gap-4'>
            <BackgroundLadoEsquerdo/>
            <FormLogin/>
        </main>
    );
}

export default PaginaLogin;