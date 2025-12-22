'use server'

import {prisma} from '@/lib/prisma'
import { getUser } from '@/lib/auth-server' 

export async function toggleFavorite(tripId: string) {
  const user = await getUser()
  if (!user) return { error: 'Not authenticated' }

  const existing = await prisma.favorite.findFirst({
    where: { userId: user.id, tripId },
  })

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } })
    return { favorited: false }
  }

  await prisma.favorite.create({
    data: {
      userId: user.id,
      tripId,
    },
  })
  
  return { favorited: true }
}
