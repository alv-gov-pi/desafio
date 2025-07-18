'use client'
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import Image from 'next/image'
export default function FooterApp() {
    return (
        < footer className="w-screen bg-blue-600 text-white mt-2 flex justify-between">
            <div className='flex flex-col justify-center'>
                <div className='flex row-auto gap-1'><span>{<IconPhone size={16} stroke={1.5} />}</span>+55 (86) 99490‑9683</div>
                <div className='flex row-auto gap-1'><span>{<IconMail size={16} stroke={1.5} />}</span>gabinete@seplan.pi.gov.br</div>
                <div className='flex row-auto gap-1'><span>{<IconMapPin size={16} stroke={1.5} />}</span>Av. Miguel Rosa, 3190 • Centro/Sul • CEP: 64.001-495 • Teresina-PI</div>
            </div>
            <div className='mr-5'><Image src="/logo-rodape.png" alt='logo rodapé' width={193} height={114}/></div>
        </footer>
    );
}