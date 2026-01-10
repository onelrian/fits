import { pgTable, serial, text, timestamp, boolean, uuid, integer, decimal, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ---------------- Enums ----------------
export const roleEnum = pgEnum('role', ['customer', 'admin']);
export const stockStatusEnum = pgEnum('stock_status', ['in_stock', 'limited', 'out_of_stock', 'coming_soon']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled']);

// ---------------- Tables ----------------

// Users table (linked to Supabase Auth)
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(), // Foreign key to Supabase auth.users can be handled conceptually or via triggers manually if we want strict FKs, but usually for Supabase we just match UUIDs.
    email: text('email').notNull().unique(),
    fullName: text('full_name'),
    role: roleEnum('role').default('customer').notNull(),
    stripeCustomerId: text('stripe_customer_id'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Categories
export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    image: text('image'), // URL
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Products
export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    categoryId: integer('category_id').references(() => categories.id),
    stockQuantity: integer('stock_quantity').notNull().default(0),
    stockStatus: stockStatusEnum('stock_status').default('in_stock').notNull(),
    isFeatured: boolean('is_featured').default(false).notNull(),
    isArchived: boolean('is_archived').default(false).notNull(), // Soft delete
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Product Images
export const productImages = pgTable('product_images', {
    id: serial('id').primaryKey(),
    productId: integer('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
    url: text('url').notNull(),
    altText: text('alt_text'),
    order: integer('order').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Product Variants (Simplified for now - we can expand to a full EAV or Variant model later)
// For Phase 2, we promised strict variants. Let's do a simple implementation.
export const variants = pgTable('variants', {
    id: serial('id').primaryKey(),
    productId: integer('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
    name: text('name').notNull(), // e.g. "Size: L", "Color: Red"
    stockQuantity: integer('stock_quantity').notNull().default(0),
    priceAdjustment: decimal('price_adjustment', { precision: 10, scale: 2 }).default('0'),
});

// Orders
export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    orderNumber: text('order_number').notNull().unique(), // FITS-YYYYMMDD-00001
    userId: uuid('user_id').references(() => users.id),
    status: orderStatusEnum('status').default('pending').notNull(),
    totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
    shippingAddressId: integer('shipping_address_id'), // Link to address table later
    notes: text('notes'),
    stripePaymentIntentId: text('stripe_payment_intent_id'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Order Items
export const orderItems = pgTable('order_items', {
    id: serial('id').primaryKey(),
    orderId: integer('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
    productId: integer('product_id').references(() => products.id).notNull(),
    variantId: integer('variant_id').references(() => variants.id),
    quantity: integer('quantity').notNull(),
    priceAtTime: decimal('price_at_time', { precision: 10, scale: 2 }).notNull(),
});

// Addresses
export const addresses = pgTable('addresses', {
    id: serial('id').primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    fullName: text('full_name').notNull(),
    streetAddress: text('street_address').notNull(),
    city: text('city').notNull(),
    state: text('state').notNull(),
    zipCode: text('zip_code').notNull(),
    country: text('country').notNull(),
    isDefault: boolean('is_default').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Reviews
export const reviews = pgTable('reviews', {
    id: serial('id').primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    productId: integer('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
    rating: integer('rating').notNull(), // 1-5
    comment: text('comment'),
    isApproved: boolean('is_approved').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ---------------- Relations ----------------

export const usersRelations = relations(users, ({ many }) => ({
    orders: many(orders),
    addresses: many(addresses),
    reviews: many(reviews),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
    category: one(categories, {
        fields: [products.categoryId],
        references: [categories.id],
    }),
    images: many(productImages),
    variants: many(variants),
    reviews: many(reviews),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
    products: many(products),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
    items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
    product: one(products, {
        fields: [orderItems.productId],
        references: [products.id],
    }),
    variant: one(variants, {
        fields: [orderItems.variantId],
        references: [variants.id],
    }),
}));
