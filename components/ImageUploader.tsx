import React, { useState, ChangeEvent } from 'react'
import { supabase } from '@/lib/supabase/client'

type ImageUploaderProps = {
  userId: string
  bucket: 'observations' | 'species'
  onUpload: (publicUrl: string, path: string) => void
  label?: string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ userId, bucket, onUpload, label = 'Upload Image' }) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files?.[0]
    if (!file || !userId) return

    const filePath = `${userId}/${Date.now()}_${file.name}`

    setUploading(true)

    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    setUploading(false)

    if (uploadError) {
      setError(uploadError.message)
      return
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    onUpload(urlData.publicUrl, filePath)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      {uploading && <p className="text-xs text-gray-500">Uploading...</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

/* EXAMPLE USAGE

export default ImageUploader

import ImageUploader from '@/components/ImageUploader'
import { useUser } from '@/hooks/useUser'

const ObservationForm = () => {
  const user = useUser()

  const handleUpload = (publicUrl: string, path: string) => {
    console.log('Image uploaded to:', publicUrl)
    // Save `publicUrl` or `path` to Supabase `observation_images` table
  }

  if (!user) return null

  return (
    <ImageUploader
      userId={user.id}
      bucket="observations"
      onUpload={handleUpload}
      label="Attach an image to your observation"
    />
  )
} */

