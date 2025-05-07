import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('species')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error
      
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching species:', error)
      return res.status(500).json({ error: 'Error fetching species' })
    }
  } else if (req.method === 'POST') {
    // This would have authentication and validation
    try {
      const { data, error } = await supabase
        .from('species')
        .insert(req.body)
        .select()

      if (error) throw error
      
      return res.status(201).json(data[0])
    } catch (error) {
      console.error('Error creating species:', error)
      return res.status(500).json({ error: 'Error creating species' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
} 