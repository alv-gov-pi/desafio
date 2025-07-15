import { Setor } from '@/types/setor';
import { Card, Image, Text, Button, Group, CardSection } from '@mantine/core';

export default function CardSetor({setor}: {setor: Setor}) {
  return (
    <Card shadow="sm" className='h-4/12 w-4/12' padding="xs" radius="xs"  withBorder>
      <CardSection>
        <Image
          src="default-setor-profile.png"
          height={100}
          alt="Norway"
        />
      </CardSection>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{setor.sigla}</Text>
      </Group>

      <Text size="sm" c="dimmed">
        {setor.nome}
      </Text>
      <Button component='a' variant="filled" href={`/setor/${setor.id}`}>Acessar</Button>
    </Card>
  );
}