'use client'
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
export default function BotaoCopiar({informacao}: {informacao: string}) {
    return (
        <CopyButton value={informacao} timeout={2000}>
            {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copiado' : 'copiar'} withArrow position="right">
                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    </ActionIcon>
                </Tooltip>
            )}
        </CopyButton>
    )

}