export interface Photo {
  id: string
  name: string
  url: string
}

export interface Orphanage {
  id: string
  name: string
  description: string
  phone: string
  latitude: number
  longitude: number
  visiting_instructions: string
  are_open_on_the_weekend: boolean
  visiting_hours: string
  photos: Photo[]
}
