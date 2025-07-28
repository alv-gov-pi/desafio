
export function formataParaTresDigitos(num: number): string {
  return String(num).padStart(3, '0');
}