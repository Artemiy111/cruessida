import { db } from '~~/server/db'
import { type UserDbCreate, users, products, type ProductDbCreate } from '~~/server/db/schema'
import { hash } from 'argon2'

const seedProducts: ProductDbCreate[] = [
  {
    section: 'woman',
    title: 'Куртка кожаная',
    price: 18750,
    image: 'https://optim.tildacdn.com/tild6631-3038-4639-a366-636130396164/-/cover/520x920/center/center/-/format/webp/9K1A9955.jpg'
  },
  {
    section: 'woman',
    title: 'Куртка кожаная с мехом',
    price: 18000,
    image: 'https://optim.tildacdn.com/tild3336-6536-4262-b563-626432663561/-/cover/520x920/center/center/-/format/webp/IMG_3391.jpg'
  },
  {
    section: 'woman',
    title: 'Плащ кожанный',
    price: 20000,
    image: 'https://optim.tildacdn.com/tild6336-3532-4337-b032-643239363436/-/resize/600x800/-/format/webp/9K1A2765-1.jpg'
  },
  {
    section: 'woman',
    title: 'Куртка из текстиля, двухсторонняя',
    price: 15000,
    image: 'https://optim.tildacdn.com/tild3137-3039-4839-b736-633931373461/-/resize/600x800/-/format/webp/9K1A5645.jpg'
  },
  {
    section: 'woman',
    title: 'Пальто, мех чернобурки',
    price: 24000,
    image: 'https://optim.tildacdn.com/tild3739-3238-4235-b135-623437333461/-/resize/600x800/-/format/webp/9K1A5908.jpg'
  },
  {
    section: 'man',
    title: 'Пальто кашемир, отделка мехом норки',
    price: 28000,
    image: 'https://thumb.tildacdn.com/tild6662-3633-4337-b363-346133303434/-/resize/600x800/-/format/webp/8a4724bb-9066-4f69-a.jpg'
  },
  {
    section: 'man',
    title: 'Куртка мужская, натуральный мех',
    price: 19750,
    image: 'https://thumb.tildacdn.com/tild6631-3930-4262-b431-373661326465/-/resize/600x800/-/format/webp/9K1A0003.jpg'
  },
  {
    section: 'man',
    title: 'Куртка мужская, натуральная кожа',
    price: 30000,
    image: 'https://thumb.tildacdn.com/tild3232-3432-4264-b535-383861623937/-/resize/600x800/-/format/webp/9K1A2460.jpg'
  },
  {
    section: 'man',
    title: 'Шуба норковая мужская',
    price: 90000,
    image: 'https://thumb.tildacdn.com/tild6666-6332-4337-a639-326239313135/-/resize/600x800/-/format/webp/5c61eff7-1117-4c22-a.jpg'
  }
]

const seed = async () => {
  const seedUsers: UserDbCreate[] = [
    {
      name: 'Юзер',
      phone: '+79999999999',
      email: 'user@google.com',
      passwordHash: await hash('00000000'),
    },
  ]

  console.log('seeding...')

  await db.insert(products).values(seedProducts)
  await db.insert(users).values(seedUsers)

  console.log('seeded!')
}

seed()
