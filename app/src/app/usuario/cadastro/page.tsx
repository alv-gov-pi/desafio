import FormCadastroUsuario from "@/components/forms/usuario/cadastro";
import TemplateNaoAtenticado from "@/components/template/nao-autenticado/template";
export default function PaginaCadastro() {
    return (
        <TemplateNaoAtenticado>
            <FormCadastroUsuario />
        </TemplateNaoAtenticado>

    );
}