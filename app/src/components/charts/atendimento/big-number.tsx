'use client'
import { Paper } from '@mantine/core';
type props = { titulo: string, 
    numero: string, 
    cor: string 
}
export default function BigNumber({ titulo, numero, cor }: props) {
    return (
        <Paper shadow="xs" p="xl" className='flex flex-col justify-between' withBorder >
            <div className='flex justify-center text-2xl'>{titulo}</div>
            <div className={`flex justify-center ${cor}   text-8xl`}>{numero}</div>
        </Paper >
    );
}