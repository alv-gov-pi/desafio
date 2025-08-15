import { useQueryState } from 'nuqs';

// Definimos os valores válidos
type Genero = 'M' | 'F' | '';

export function useGeneroFiltro() {
  const [genero, setGenero] = useQueryState(
    'genero',
    {
      // Valor padrão: string vazia = todos
      defaultValue: '',
      // Mapeia valores válidos
      parse: (value): Genero => {
        if (value === 'M' || value === 'F') {
          return value;
        }
        return '';
      }
    }
  );

  return { genero, setGenero } as const;
}