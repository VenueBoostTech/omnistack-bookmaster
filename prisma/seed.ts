// // prisma/seed.ts
// const { PrismaClient } = require('@prisma/client')
// const { createClient } = require('@supabase/supabase-js')
// const bcrypt = require('bcrypt')

// const prisma = new PrismaClient()

// // Check environment variables
// if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
//   console.error('Required environment variables:', {
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Present' : 'Missing',
//     key: process.env.SUPABASE_SERVICE_KEY ? 'Present' : 'Missing'
//   })
//   throw new Error('Missing required Supabase environment variables')
// }

// // Initialize Supabase client
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_KEY
// )

// async function createSupabaseUser(email: string, password: string) {
//   const { data: user, error } = await supabase.auth.admin.createUser({
//     email,
//     password,
//     email_confirm: true
//   })

//   if (error) {
//     throw new Error(`Failed to create Supabase user: ${error.message}`)
//   }

//   return user.user
// }

// async function clearExistingData() {
//   console.log('Clearing existing data...')
  
//   // Delete in correct order due to foreign key constraints
//   await prisma.transaction.deleteMany({})
//   await prisma.vendor.deleteMany({})
//   await prisma.account.deleteMany({})
//   await prisma.user.deleteMany({})
//   await prisma.client.deleteMany({})
  
//   console.log('Existing data cleared')
// }

// async function main() {
//   try {
//     // Clear existing data first
//     await clearExistingData()

//     // First create the user in Supabase
//     // const supabaseUser = await createSupabaseUser('finance@metroshop.al', 'BM-Mshop!-2025x')
//     // console.log('Created Supabase user:', supabaseUser)

//     // Create the client
//     const client = await prisma.client.create({
//       data: {
//         name: 'Metroshop.al',
//         code: 'MSHOP',
//         taxId: 'L72119451A',
//         address: 'Rruga Myslym Shyri, Tirana, Albania',
//         phone: '+355 69 123 4567',
//         email: 'info@metroshop.al',
//         defaultCurrency: 'ALL',
//         supabaseId: '31659dc1-0829-4fad-b091-71acb043f6bc',
//         status: 'ACTIVE',
//       }
//     })
//     console.log('Created client:', client)

    

//     // Hash password for local storage
//     const hashedPassword = await bcrypt.hash('BM-Mshop!-2025x', 12)

//     // Create the BookMaster admin user
//     const user = await prisma.user.create({
//       data: {
//         email: 'finance@metroshop.al',
//         name: 'Metroshop Finance Admin',
//         password: hashedPassword, // Added the hashed password
//         role: 'ADMIN',
//         clientId: client.id,
//         supabaseId: '31659dc1-0829-4fad-b091-71acb043f6bc'
//       }
//     })
//     console.log('Created Prisma user:', user)

//     console.log('Seeding completed successfully!')
//   } catch (error) {
//     console.error('Error during seeding:', error)
//     throw error
//   }
// }

// main()
//   .catch((e) => {
//     console.error("Error during seeding:", e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
 await prisma.client.update({
   where: { id: '6795785555dcaaa39e3f5cb1' },
   data: { omniGatewayId: '67957d78172a3de27fd14a9a' }
 })
}

main()
 .catch(e => {
   console.error(e)
   process.exit(1)
 })
 .finally(async () => {
   await prisma.$disconnect()
 })
