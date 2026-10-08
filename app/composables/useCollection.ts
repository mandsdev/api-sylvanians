export const useCollection = () => {
  const ownedProductCodes = useState<string[]>('ownedProductCodes', () => [])
  
  const toggle = (productCode: string) => {
  if (ownedProductCodes.value.includes(productCode)) {
    ownedProductCodes.value =
      ownedProductCodes.value.filter((code) => code !== productCode)
  } else {
    ownedProductCodes.value.push(productCode)
  }
}

  return { ownedProductCodes, toggle }
}

