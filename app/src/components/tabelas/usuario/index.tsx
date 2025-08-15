'use client'
import { Usuario } from "@/types/usuario";
import { Table, TableTr, TableTd, TableThead, TableTh, TableTbody, TableScrollContainer, Switch } from '@mantine/core';
import BotaoCopiar from "@/components/buttons/copiar";
import { formataStringDate } from "@/utils/databr";
import { IconCheck, IconX } from '@tabler/icons-react';
import CardPadrao from "@/components/card";


interface props { usuarios: Usuario[], token: string, onChange: (id: number, status: boolean) => void }

export default function TabelaUsuario({ usuarios, token, onChange }: props) {
    const linhasUsuarios = usuarios;
    return (
        <CardPadrao titulo="Membros da Equipe">
            <TableScrollContainer minWidth={400} maxHeight={300}>
                <Table withColumnBorders withTableBorder highlightOnHover striped stickyHeader={false} verticalSpacing={'sm'}>
                    <TableThead>
                        <TableTr>
                            <TableTh>Data Cadastro</TableTh>
                            <TableTh>Membro</TableTh>
                            <TableTh>Ativo</TableTh>
                            <TableTh>e-mail</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        {
                            linhasUsuarios.map((usuario, key) => (

                                <TableTr key={`${key}`}>
                                    <TableTd>{formataStringDate(usuario.cadastrado_em)}</TableTd>
                                    <TableTd>{usuario.nome}</TableTd>
                                    <TableTd>
                                        {
                                            <Switch

                                                checked={usuario.esta_ativo}
                                                label={usuario.esta_ativo ? 'Sim' : 'Não'}
                                                thumbIcon={
                                                    usuario.esta_ativo ? (
                                                        <IconCheck size={12} color="var(--mantine-color-teal-6)" stroke={3} />
                                                    ) : (
                                                        <IconX size={12} color="var(--mantine-color-red-6)" stroke={3} />
                                                    )
                                                }
                                                onChange={(event) => onChange(usuario.id, event.currentTarget.checked)}
                                            />
                                        }
                                    </TableTd>
                                    <TableTd className="flex">{`${usuario.email}`}
                                        <BotaoCopiar informacao={usuario.email}></BotaoCopiar>
                                    </TableTd>

                                </TableTr>
                            ))
                        }
                    </TableTbody>
                </Table>
            </TableScrollContainer >
        </CardPadrao>
    )
}