import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'
import { getUser } from '@/lib/auth-server'

export async function GET() {
  const user = await getUser()
  if (!user) return NextResponse.json({ favorites: [] })

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    include: { trip: true },
  })

  return NextResponse.json({ favorites })
}
