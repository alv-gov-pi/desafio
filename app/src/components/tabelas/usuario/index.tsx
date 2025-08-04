'use client'
import { Usuario } from "@/types/usuario";
import { Table, TableTr, TableTd, TableThead, TableTh, TableTbody, TableScrollContainer } from '@mantine/core';
import BotaoCopiar from "@/components/buttons/copiar";

export default function TabelaUsuario({ usuarios }: { usuarios: Usuario[] }) {
    return (

        <TableScrollContainer minWidth={400} maxHeight={300}>
            <Table withColumnBorders withTableBorder highlightOnHover striped stickyHeader={false} verticalSpacing={'sm'}>
                <TableThead>
                    <TableTr>
                        <TableTh>Membro</TableTh>
                        <TableTh>email</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    {
                        usuarios.map((usuario, key) => (

                            <TableTr key={`${key}`}>
                                <TableTd>{`${usuario.nome}`}</TableTd>
                                <TableTd className="flex">{`${usuario.email}`}
                                    <BotaoCopiar informacao={usuario.email}></BotaoCopiar>
                                </TableTd>
                            </TableTr>
                        ))
                    }
                </TableTbody>
            </Table>
        </TableScrollContainer >
    )
}