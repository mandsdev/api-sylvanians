interface Sylvanian {
  id: string
  productCode: string
  name: string
  originalName: string
  species: string
  category: string
  image: string
  story: string
  members: string[]
  releaseYear?: string
}

interface SylvaniansResponse {
  total: number
  results: Sylvanian[]
}

export const useSylvanians = () => {
  const search = ref('')
  const { data: response, error, pending } = useFetch<SylvaniansResponse>('/api/sylvanians', {
    query: { name: search }
  })

  return { search, response, error, pending }
}
