import FormLogin from '@/components/forms/login';
import BackgroundLadoEsquerdo from '@/components/backgrounds';

export default function TemplateNaoAtenticado({ children }: { children: React.ReactNode }) {
    return (
        <main className='flex justify-center justify-items-center items-center w-screen h-screen'>
            {children}
        </main>
    );
}