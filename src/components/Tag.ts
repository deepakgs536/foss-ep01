export type Tag = 'Nature' | 'City' | 'People' | 'Abstract' | 'Architecture' | 'Animals' | 'Travel' | 'Objects'

export interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  tags: Tag[]
}
