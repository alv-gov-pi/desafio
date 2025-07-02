import FormLogin from './FormLogin';
import BackgroundLadoEsquerdo from './BackgroundLadoEsquerdo';
function PaginaLogin() {
    return(
        <main className='grid grid-cols-2 gap-4'>
            <BackgroundLadoEsquerdo/>
            <FormLogin/>
        </main>
    );
}

export default PaginaLogin;