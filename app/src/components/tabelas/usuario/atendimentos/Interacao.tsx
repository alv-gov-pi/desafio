'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, Paper, Flex, TextInput, Button, Group, Text, rem } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { InteracaoAtendimento } from '@/types/interacao-atendimento';


export function Interacao({interacoes}: {interacoes: InteracaoAtendimento[]}) {
  const [messages, setMessages] = useState(interacoes);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  // Função para rolar automaticamente para a última mensagem
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Rola para o final do chat sempre que novas mensagens são adicionadas
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Lógica para enviar uma nova mensagem
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    // Alterna o remetente para simular uma conversa
    const newSender = messages.length % 2 === 0 ? 'solicitante' : 'atendente';

    const newChat: Interacao = {
      id: messages.length + 1,
      texto: newMessage,
      tipoUsuario: newSender,
      idAtendimento: 1
    };

    setMessages([...messages, newChat]);
    setNewMessage('');
  };

  const adicionarInteracao = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        width: '100%',
        maxWidth: rem(2000),
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
        {messages.map((message) => {
          const isUser = message.tipoUsuario === 'S';
          console.log(message.tipoUsuario)
          return (
            <Flex
              key={message.id}
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
            value={newMessage}
            onChange={(event) => setNewMessage(event.currentTarget.value)}
            onKeyDown={adicionarInteracao}
            radius="xl"
          />
          <Button
            onClick={handleSendMessage}
            radius="xl"
            disabled={!newMessage.trim()}
            leftSection={<IconSend size={16} />}
          >
            Enviar
          </Button>
        </Group>
      </Box>
    </Box>
  );
}