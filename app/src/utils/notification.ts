import { notifications } from '@mantine/notifications';

export default function mostrarNotificacao(titulo: string, mensagem: string, cor?: string ) {
    notifications.show({
      title: titulo,
      message: mensagem,
      position: 'top-right',
      color: cor
    })
}