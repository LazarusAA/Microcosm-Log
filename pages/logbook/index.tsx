import { useState, useMemo } from 'react'
import Head from 'next/head'
import SpeciesCard from '@/components/species/SpeciesCard'
import { Species } from '@/types'
import sampleData from '@/data/species/sample.json'
import categories from '@/data/species/categories'

export default function Logbook() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  
  // Use the sample data from JSON file
  const speciesData = sampleData as Species[]
  
  // Filter and search species
  const filteredSpecies = useMemo(() => {
    return speciesData.filter(species => {
      // Filter by category
      const matchesCategory = activeFilter === 'all' || species.category === activeFilter
      
      // Filter by search query
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = 
        searchQuery === '' || 
        species.name.toLowerCase().includes(searchLower) || 
        species.scientific_name.toLowerCase().includes(searchLower) ||
        species.description.toLowerCase().includes(searchLower)
      
      return matchesCategory && matchesSearch
    })
  }, [speciesData, activeFilter, searchQuery])
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Logbook | Microcosm Log</title>
        <meta name="description" content="Explore our curated collection of microorganisms and fungi" />
      </Head>
      
      <h1 className="text-3xl font-bold mb-6">Microcosm Logbook</h1>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search species..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeFilter === 'microorganisms'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveFilter('microorganisms')}
        >
          Microorganisms
        </button>
        
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeFilter === 'fungi'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveFilter('fungi')}
        >
          Fungi
        </button>
        
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeFilter === 'bacteria'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveFilter('bacteria')}
        >
          Bacteria
        </button>
      </div>
      
      {/* Results count */}
      <p className="text-gray-600 mb-4">
        Showing {filteredSpecies.length} of {speciesData.length} species
      </p>
      
      {/* Species Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSpecies.length > 0 ? (
          filteredSpecies.map((species) => (
            <SpeciesCard key={species.id} species={species} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No species found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('')
                setActiveFilter('all')
              }}
              className="mt-4 text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 