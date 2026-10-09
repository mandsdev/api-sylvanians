export function useCollection(): {
  ownedProductCodes: ReturnType<typeof useState<string[]>>
  toggle: (productCode: string) => void
} {
  const ownedProductCodes = useState<string[]>('ownedProductCodes', () => [])
  function toggle(productCode: string): void {
    if (ownedProductCodes.value.includes(productCode)) {
      ownedProductCodes.value = ownedProductCodes.value.filter((code) => code !== productCode)
    } else {
      ownedProductCodes.value = [...ownedProductCodes.value, productCode]
    }
  }
  return { ownedProductCodes, toggle }
}
