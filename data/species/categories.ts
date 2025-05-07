export type SpeciesCategory = 'microorganisms' | 'fungi' | 'bacteria' | 'protozoa' | 'algae'

export const categories = [
  {
    id: 'microorganisms',
    name: 'Microorganisms',
    description: 'Microscopic organisms including bacteria, archaea, fungi, algae, protozoa, and viruses'
  },
  {
    id: 'fungi',
    name: 'Fungi',
    description: 'Eukaryotic organisms that include microorganisms such as yeasts and molds, as well as macroscopic fungi'
  },
  {
    id: 'bacteria',
    name: 'Bacteria',
    description: 'Single-celled microorganisms that lack a nucleus and are found in nearly every habitat on Earth'
  },
  {
    id: 'protozoa',
    name: 'Protozoa',
    description: 'Single-celled eukaryotic microorganisms that can move on their own'
  },
  {
    id: 'algae',
    name: 'Algae',
    description: 'Simple aquatic organisms that can photosynthesize like plants'
  }
]

export default categories 