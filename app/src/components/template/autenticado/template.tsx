import HeaderApp from "./header/header";
import FooterApp from "./footer";
export default function TemplateApp({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeaderApp usuario_id={7} />
            <main className="flex justify-center w-screen h-10/12">
                {children}
            </main>
            <FooterApp />
        </>
    );
}