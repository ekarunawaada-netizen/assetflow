import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const creators = await prisma.creator.findMany()
    console.log('Creators:', creators.length)
    if (creators.length > 0) {
      console.log('First creator ID:', creators[0].id)
    } else {
      console.log('No creators found!')
    }
    
    const assets = await prisma.asset.findMany()
    console.log('Assets:', assets.length)
  } catch (e) {
    console.error('Database error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
