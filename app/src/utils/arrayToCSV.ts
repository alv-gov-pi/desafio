
export default function gerarCSV(dados: Object[], nomeArquivo: string = 'dados.csv'): void {
  const cabecalho = Object.keys(dados[0]).join(',') + '\n';
  const linhas = dados.map(obj =>
    Object.values(obj)
      .map(valor => `"${valor}"`) // Adiciona aspas duplas para lidar com vírgulas dentro dos valores
      .join(',')
  );
  const csv = cabecalho + linhas.join('\n');

  // Cria um Blob com o conteúdo CSV
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  // Cria um link para download
  const link = document.createElement('a');
  if (link.download !== undefined) { // feature detection
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', nomeArquivo);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('Este navegador não suporta download automático.');
  }
}
