import { relations } from 'drizzle-orm'
import { sqliteTable, int, text, unique } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  phone: text().notNull(),
  passwordHash: text().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  feedbacks: many(feedbacks),
  cartItems: many(cartItems),
}))

export type UserDb = typeof users.$inferSelect
export type UserDbCreate = typeof users.$inferInsert

export const productSections = ['man', 'woman'] as const
export type ProductSection = typeof productSections[number]

export const products = sqliteTable('products', {
  section: text({ enum: productSections }).notNull(),
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  image: text().notNull(),
  price: int().notNull(),
})


export type ProductDb = typeof products.$inferSelect
export type ProductDbCreate = typeof products.$inferInsert

export const productsRelations = relations(products, ({ many }) => ({
  cartItems: many(cartItems),
}))

export const banners = sqliteTable('banners', {
  id: int().primaryKey({ autoIncrement: true }),
  image: text().notNull(),
  productId: int().notNull().references(() => products.id),
})

export type BannerDbCreate = typeof banners.$inferInsert

export const feedbacks = sqliteTable('feedbacks', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  message: text().notNull(),
})

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  user: one(users, {
    fields: [feedbacks.userId],
    references: [users.id],
    relationName: 'user',
  }),
}))

export type FeedbackDb = typeof feedbacks.$inferSelect
export type FeedbackDbCreate = typeof feedbacks.$inferInsert

export const cartItems = sqliteTable('cart_items', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull().references(() => users.id),
  productId: int().notNull().references(() => products.id),
  quantity: int().notNull(),
}, (t) => ({
  uniqueProductForUser: unique().on(t.userId, t.productId),
}))

export type CartItemDb = typeof cartItems.$inferSelect
export type CartItemDbCreate = typeof cartItems.$inferInsert

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
    relationName: 'product',
  }),
  user: one(users, {
    fields: [cartItems.userId],
    references: [users.id],
    relationName: 'user',
  }),
}))

export const orders = sqliteTable('orders', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull().references(() => users.id),
  createdAt: int().notNull().$defaultFn(() => Date.now()),
})

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
    relationName: 'user',
  }),
  items: many(orderItems)
}))

export const orderItems = sqliteTable('order_items', {
  id: int().primaryKey({ autoIncrement: true }),
  orderId: int().notNull().references(() => orders.id),
  productId: int().notNull().references(() => products.id),
  quantity: int().notNull(),
  totalPrice: int().notNull(),
}, (t) => ({
  uniqueProductForOrder: unique().on(t.orderId, t.productId),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
    relationName: 'order',
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
    relationName: 'product',
  }),
}))

export type OrderDb = typeof orders.$inferSelect
export type OrderDbCreate = typeof orders.$inferInsert



