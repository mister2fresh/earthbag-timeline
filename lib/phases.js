// lib/phases.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export function getAllPhases() {
  // Get all directories in content folder
  const phaseFolders = fs.readdirSync(contentDirectory)
  
  const phases = phaseFolders
    .map((folder) => {
      const phaseFilePath = path.join(contentDirectory, folder, 'phase.md')
      
      // Skip if phase.md doesn't exist
      if (!fs.existsSync(phaseFilePath)) {
        return null
      }
      
      const fileContents = fs.readFileSync(phaseFilePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: folder,
        title: data.title || folder,
        date: data.date || '',
        order: data.order || 0,
        coverImage: data.coverImage || `/images/${folder}/cover.jpg`,
        content: content || '',
      }
    })
    .filter(Boolean) // Remove nulls
    .sort((a, b) => a.order - b.order) // Sort by order field
  
  return phases
}

export function getPhaseBySlug(slug) {
  const phaseFilePath = path.join(contentDirectory, slug, 'phase.md')
  const fileContents = fs.readFileSync(phaseFilePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    order: data.order || 0,
    coverImage: data.coverImage || `/images/${slug}/cover.jpg`,
    content: content || '',
  }
}
