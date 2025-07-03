import FormLogin from '../../components/forms/login';
import BackgroundLadoEsquerdo from '../../components/backgrounds';
function PaginaLogin() {
    return(
        <main className='grid grid-cols-2 gap-4'>
            <BackgroundLadoEsquerdo/>
            <FormLogin/>
        </main>
    );
}

export default PaginaLogin;