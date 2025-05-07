import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Species } from '@/types'
import sampleData from '@/data/species/sample.json'

export default function SpeciesDetail() {
  const router = useRouter()
  const { slug } = router.query
  
  // In a real app, we would fetch this from an API or static props
  const speciesData = sampleData as Species[]
  const species = speciesData.find(s => s.id === slug)
  
  if (!species && !router.isFallback) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Species Not Found</h1>
        <p className="mb-8">The species you're looking for doesn't exist in our database.</p>
        <Link href="/logbook" className="text-blue-600 hover:underline">
          Return to Logbook
        </Link>
      </div>
    )
  }
  
  // Show loading state while waiting for data
  if (router.isFallback || !species) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading...</p>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{species.name} | Microcosm Log</title>
        <meta name="description" content={species.description.substring(0, 160)} />
      </Head>
      
      <Link href="/logbook" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Logbook
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/3 relative h-64 md:h-auto">
            {species.image_url ? (
              <Image
                src={species.image_url}
                alt={species.name}
                className="object-cover w-full h-full"
                width={500}
                height={500}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">{species.name}</h1>
            <p className="text-xl italic text-gray-600 mb-4">{species.scientific_name}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{species.description}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Habitat</h2>
              <p className="text-gray-700">{species.habitat}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 