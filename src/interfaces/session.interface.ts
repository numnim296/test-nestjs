import { users } from '@prisma/client'

export interface UserSession extends Omit<users, 'password'> {
  // roles: string[]
}
