export function onlyNumbers(inputValue: string | number | null): string {
  if (inputValue === null || inputValue === undefined) return ''
  const regex = /[^0-9-]/g
  return inputValue.toString().replace(regex, '')
}
