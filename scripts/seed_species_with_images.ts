import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import mime from 'mime'
import { fileURLToPath } from 'url'
import { randomUUID } from 'crypto'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// Get current file's directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get Supabase credentials from environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('⚠️ Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const DATA_DIR = path.join(__dirname, '../data/species')

async function seedSpecies() {
  if (!fs.existsSync(DATA_DIR)) {
    console.error(`❌ Data directory not found: ${DATA_DIR}`)
    process.exit(1)
  }

  const speciesDirs = fs.readdirSync(DATA_DIR)

  if (!speciesDirs.length) {
    console.log(`📭 No species entries found in ${DATA_DIR} — nothing to seed.`)
    return
  }

  console.log(`📂 Found ${speciesDirs.length} species directories in ${DATA_DIR}`)

  for (const dirName of speciesDirs) {
    const entryPath = path.join(DATA_DIR, dirName, 'entry.json')
    const imagesPath = path.join(DATA_DIR, dirName, 'images')

    if (!fs.existsSync(entryPath)) continue

    const species = JSON.parse(fs.readFileSync(entryPath, 'utf-8'))

    // ✅ Add ID if missing
    if (!species.id) {
      species.id = randomUUID()
    }

    // Insert or update species
    const { data: inserted, error } = await supabase
      .from('species_references')
      .upsert([species], { onConflict: 'slug' })

    if (error) {
      console.error(`❌ Failed to insert ${species.slug}:`, error)
      continue
    }

    // Get species ID (if not returned in response)
    const speciesId = (inserted as Array<{ id: string }> | null)?.[0]?.id || (
      await supabase
        .from('species_references')
        .select('id')
        .eq('slug', species.slug)
        .single()
    )?.data?.id

    if (!speciesId) {
      console.error(`❌ Could not find ID for ${species.slug}`)
      continue
    }

    // Upload and register images
    if (fs.existsSync(imagesPath)) {
      const files = fs.readdirSync(imagesPath)

      for (const filename of files) {
        const filePath = path.join(imagesPath, filename)
        const fileBuffer = fs.readFileSync(filePath)
        const contentType = mime.getType(filePath) || 'image/jpeg'

        const storagePath = `${species.slug}/${filename}`

        const { error: uploadError } = await supabase.storage
          .from('species')
          .upload(storagePath, fileBuffer, {
            contentType,
            upsert: true
          })

        if (uploadError) {
          console.error(`❌ Failed to upload ${filename}:`, uploadError)
          continue
        }

        const { data: publicUrlData } = supabase
          .storage
          .from('species')
          .getPublicUrl(storagePath)

        const publicUrl = publicUrlData?.publicUrl

        if (!publicUrl) {
          console.warn(`⚠️ No public URL found for ${filename}, skipping DB insert`)
          continue
        }

        const { error: insertError } = await supabase.from('species_images').insert({
          species_id: speciesId,
          image_url: publicUrl,
          caption: filename.replace(/\.[^/.]+$/, '') // remove extension
        })

        if (insertError) {
          console.error(`❌ Failed to insert image record for ${filename}:`, insertError)
        } else {
          console.log(`✅ Uploaded and registered image: ${filename}`)
        }
      }
    }

    console.log(`✅ Done with species: ${species.slug}`)
  }

  console.log('🎉 Seeding complete. All species synced.')
}

seedSpecies()
