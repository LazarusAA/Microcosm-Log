import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Species } from '@/types'

interface SpeciesCardProps {
  species: Species
}

const SpeciesCard = ({ species }: SpeciesCardProps) => {
  return (
    <Link href={`/logbook/${species.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
        <div className="relative h-48">
          {species.image_url ? (
            <Image
              src={species.image_url}
              alt={species.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{species.name}</h3>
          <p className="text-sm italic text-gray-600 mb-2">{species.scientific_name}</p>
          <p className="text-sm text-gray-700 line-clamp-3">{species.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default SpeciesCard 