import FormLogin from '@/components/forms/login';
import BackgroundLadoEsquerdo from '@/components/backgrounds';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import TemplateNaoAtenticado from '@/components/template/nao-autenticado/template';

async function PaginaLogin() {
    const session = await getServerSession(authOptions)
    if (session) {
            redirect('/usuario')
        }
    return(
        <TemplateNaoAtenticado>
            <BackgroundLadoEsquerdo/>
            <FormLogin/>
        </TemplateNaoAtenticado>
    );
}

export default PaginaLogin;