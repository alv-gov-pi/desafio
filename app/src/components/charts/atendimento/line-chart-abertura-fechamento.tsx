'use client'
import { AtendimentoPorData } from '@/types/atendimento-por-data';
import { LineChart } from '@mantine/charts';
import { Title , Paper } from '@mantine/core';
export default function LineChartAberturaFechamento({atendimentosPorData}:{atendimentosPorData: AtendimentoPorData[]}) {
    
    return (
    <Paper shadow="xs" p="xl"  withBorder >
        <Title order={4}>Número de chamados abertos e fechados por dia</Title>
        <LineChart
            h={280}
            withLegend
            data={atendimentosPorData}
            dataKey="data"
            yAxisLabel="Quantidade"
            xAxisLabel="Data"
            series={[
                { name: 'atendidos', color: 'teal' },
                { name: 'nao_atendidos', color: 'red' },
            ]}
            curveType="linear"
        />
    </Paper >
    );
}