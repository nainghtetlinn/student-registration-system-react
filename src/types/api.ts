export type BaseEntity = {
  id: string
  createdAt: number
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export type User = Entity<{
  name: string
  email: string
  role: 'ADMIN' | 'USER'
}>

export type AuthResponse = {
  jwt: string
  user: User
}
