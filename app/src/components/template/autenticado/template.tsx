import HeaderApp from "./header/header";
import FooterApp from "./footer";
export default function TemplateApp({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen justify-between">
            <HeaderApp usuario_id={7} />
            <main className="flex flex-col justify-center items-center w-screen">
                {children}
            </main>
            <FooterApp />
        </div>
    );
}