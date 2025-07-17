'use client'
import { NavLink } from '@mantine/core';
import { IconUser ,IconHome2, IconTicket, IconLogout2, IconChartBar, IconFileBarcode } from '@tabler/icons-react';
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function HeaderApp({ usuario_id }: { usuario_id: number }) {
    const router = useRouter()

    async function logout(event: any) {
        event.preventDefault()
        await signOut({
            redirect: false
        })

        router.replace('/')
    }
    return (
        <header className="w-screen bg-blue-600 text-white">
            <nav>
                <ul className='flex justify-end justify-items-center gap-4 mr-4'>
                    <i><NavLink
                        href={`/usuario/${usuario_id}/solicitacoes`}
                        label="Solicitações"
                        leftSection={<IconFileBarcode size={16} stroke={1.5} />}
                    /></i>
                    <i><NavLink
                        href={"/paineis"}
                        label="Paineis"
                        leftSection={<IconChartBar size={16} stroke={1.5} />}
                    /></i>
                    <i><NavLink
                        href={`/usuario/${usuario_id}/atendimentos`}
                        label="Atendimentos"
                        leftSection={<IconTicket size={16} stroke={1.5} />}
                    /></i>
                    <i><NavLink
                        href={`/usuario/`}
                        label="Home"
                        leftSection={<IconHome2 size={16} stroke={1.5} />}
                    /></i>
                    <i><NavLink
                        href={`/usuario/${usuario_id}`}
                        label="Perfil"
                        leftSection={<IconUser size={16} stroke={1.5} />}
                    /></i>
                    <i><NavLink
                        href={"/"}
                        label="Sair"
                        onClick={event => logout(event)}
                        leftSection={<IconLogout2 size={16} stroke={1.5} />}
                    /></i>
                </ul>
            </nav>
        </header>
    );
}