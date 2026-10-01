import familiesData from '../data/sylvanians.json'

const customFamilies = [
  {
    id: '1',
    productCode: '5655',
    name: 'Família dos Coelhos Chocolate',
    originalName: 'Chocolate Rabbit Family',
    species: 'Coelho',
    category: 'Famílias',
    image: 'https://www.sylvanianfamilies.com/assets/includes_gl/img/products/2356_1659686016973.jpg',
    story: 'Uma família de coelhos. O pai Frasier Chocolate adora planejar todos os tipos de eventos e festas divertidas para a Vila Sylvanian.',
    members: ['Frasier (Pai)', 'Teri (Mãe)', 'Coco (Irmão)', 'Freya (Irmã)'],
  },
  {
    id: '2',
    productCode: '5530',
    name: 'Família dos Gatos Meia-Noite',
    originalName: 'Midnight Cat Family',
    species: 'Gatos meia-noite',
    category: 'Famílias',
    image: 'https://www.sylvanianfamilies.com/assets/common/characters/img/detail/022.jpg',
    story: 'Uma família muito divertida e mágica, eles possuem conhecimentos sobre truques fantásticos e misticismo.',
    members: ['James Midnight (Pai)', 'Allison Midnight (Mãe)', 'Emile Midnight (Irmão mais velho)', 'Chantelle Midnight (Irmã mais velha)', 'Gloria Midnight (Bebê menina)', 'Reggie Midnight (Bebê menino)'],
    releaseYear: '2020',
  },
  {
    id: '3',
    productCode: '5306',
    name: 'Família dos Gatos Malhados',
    originalName: 'Tuxedo Cat Family',
    species: 'Gatos',
    category: 'Famílias',
    image: 'https://www.sylvanianfamilies.com/assets/common/characters/img/detail/010.jpg',
    story: 'Uma das famílias mais elegantes e ativas do vilarejo de Sylvania, adoram moda e esportes.',
    members: ['Mason Marlowe (Pai)', 'Natalie Marlowe (Mãe)', 'Felicia Marlowe (Irmã mais velha)', 'Lily e Rose Marlowe (Irmãs gêmeas)', 'Trigêmeos (Peppermint, Angelica e Midnight)'],
    releaseYear: '2008',
  },
]

const families = [
  ...customFamilies,
  ...familiesData.filter((family) =>
    !customFamilies.some((customFamily) => customFamily.productCode === family.productCode)
  ),
]

const normalize = (value: string | undefined) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')

export default defineEventHandler((event) => {
  const query = normalize(String(getQuery(event).name ?? '').trim())

  const results = families.filter((family) => {
    const searchableValues = [
      family.name,
      family.originalName,
      family.species,
      family.category,
      family.productCode,
      family.story,
      family.members?.join(' '),
    ]

    return searchableValues.some((value) => normalize(value).includes(query))
  })

  return { total: results.length, results }
})