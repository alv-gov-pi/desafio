'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, Paper, Flex, TextInput, Button, Group, Text, rem } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { InteracaoAtendimento } from '@/types/interacao-atendimento';
import { AtendimentoService } from '@/services/AtendimentoService';


export function Interacao({interacoes, idAtendimento, tipoUsuario}: {interacoes: InteracaoAtendimento[], idAtendimento: string, tipoUsuario: string}) {
  const atendimentoService = new AtendimentoService;
  const [listaInteracoes, setListaInteracoes] = useState(interacoes);
  const [novaInteracao, setNovaInteracao] = useState('');
  const chatEndRef = useRef(null);

  // Função para rolar automaticamente para a última mensagem
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Rola para o final do chat sempre que novas mensagens são adicionadas
  useEffect(() => {
    scrollToBottom();
  }, [listaInteracoes]);

  // Lógica para enviar uma nova mensagem
  const handleSendMessage = () => {
    if (novaInteracao.trim() === '') return;

    const novaInteracaoChat: InteracaoAtendimento = {
      texto: novaInteracao,
      tipoUsuario: tipoUsuario,
      idAtendimento: idAtendimento
    };
    atendimentoService.adicionarInterecaoAtendimento(novaInteracaoChat);
    setListaInteracoes([...listaInteracoes, novaInteracaoChat]);
    setNovaInteracao('');
  };

  const adicionarInteracao = (event : any) => {
    if (event.key === 'Enter') {
      console.log(event)
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12">
                <h1 className="text-xl font-semibold text-content-emphasis">Interações</h1>
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        width: '100%',
        maxWidth: rem(1500),
        margin: '0 auto',
        border: '1px solid var(--mantine-color-gray-3)',
        borderRadius: 'var(--mantine-radius-md)',
      }}
    >
      {/* Área das Mensagens (Scrollável) */}
      <Box
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 'var(--mantine-spacing-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--mantine-spacing-sm)',
        }}
      >
        {listaInteracoes.map((message, key) => {
          const isUser = message.tipoUsuario === 'S';
          console.log(message.tipoUsuario)
          return (
            <Flex
              key={key}
              justify={isUser ? 'flex-end' : 'flex-start'}
            >
              <Paper
                shadow="sm"
                p="sm"
                radius="lg"
                style={{
                  maxWidth: '100%',
                  backgroundColor: isUser ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-gray-1)',
                  color: isUser ? 'white' : 'var(--mantine-color-black)',
                }}
              >
                <Text>{message.texto}</Text>
              </Paper>
            </Flex>
          );
        })}
        {/* Referência para rolar para o final */}
        <div ref={chatEndRef} />
      </Box>

      {/* Área do Campo de Entrada */}
      <Box p="md" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
        <Group wrap="nowrap" gap="sm">
          <TextInput
            flex={1}
            placeholder="Adicione informações para o usuário"
            value={novaInteracao}
            onChange={(event) => setNovaInteracao(event.currentTarget.value)}
            onKeyDown={adicionarInteracao}
            radius="xl"
          />
          <Button
            onClick={handleSendMessage}
            radius="xl"
            disabled={!novaInteracao.trim()}
            leftSection={<IconSend size={16} />}
          >
            Enviar
          </Button>
        </Group>
      </Box>
    </Box>
    </div>
  );
}