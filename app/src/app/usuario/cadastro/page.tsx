import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FormCadastroUsuario from "@/components/forms/usuario/cadastro";
import TemplateNaoAtenticado from "@/components/template/nao-autenticado/template";
import { SetorService } from "@/services/SetorService";
import { getServerSession } from "next-auth";
export default async  function PaginaCadastro() {
    const session = await getServerSession(authOptions)
    const token: string  = session?.user.access;
    const setorService: SetorService = new SetorService(token);
    const setores = await setorService.obterTodosSetores();
    return (
        <TemplateNaoAtenticado>
            <FormCadastroUsuario setores={setores}/>
        </TemplateNaoAtenticado>
    );
}