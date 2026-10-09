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
type SylvaniansFetch = ReturnType<typeof useFetch<SylvaniansResponse>>

interface UseSylvaniansReturn {
  search: Ref<string>
  response: SylvaniansFetch['data']
  error: SylvaniansFetch['error']
  pending: SylvaniansFetch['pending']
}

export function useSylvanians(): UseSylvaniansReturn {
  const search = ref('')
  const {
    data: response,
    error,
    pending,
  } = useFetch<SylvaniansResponse>('/api/sylvanians', {
    query: { name: search },
  })

  return { search, response, error, pending }
}
