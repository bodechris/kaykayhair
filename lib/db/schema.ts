import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const contentStatus = pgEnum("content_status", ["draft", "published", "archived"]);
export const orderStatus = pgEnum("order_status", ["cart", "pending", "paid", "fulfilled", "cancelled", "refunded"]);
export const bookingStatus = pgEnum("booking_status", ["pending_payment", "confirmed", "checked_in", "in_progress", "completed", "cancelled", "no_show", "rescheduled"]);
export const carePlusStatus = pgEnum("care_plus_status", ["trial", "active", "paused", "cancelled", "past_due"]);
export const leadStatus = pgEnum("lead_status", ["new", "subscribed", "unsubscribed", "converted"]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").default("").notNull(),
  priceCents: integer("price_cents").notNull().default(0),
  compareAtPriceCents: integer("compare_at_price_cents"),
  sku: text("sku"),
  inventory: integer("inventory").default(0).notNull(),
  imageUrl: text("image_url"),
  status: contentStatus("status").default("draft").notNull(),
  featured: boolean("featured").default(false).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
  ...timestamps,
});

export const carts = pgTable("carts", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email"),
  userId: text("user_id"),
  status: orderStatus("status").default("cart").notNull(),
  subtotalCents: integer("subtotal_cents").default(0).notNull(),
  recoveredAt: timestamp("recovered_at", { withTimezone: true }),
  lastActivityAt: timestamp("last_activity_at", { withTimezone: true }).defaultNow().notNull(),
  ...timestamps,
});

export const cartItems = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  cartId: uuid("cart_id").references(() => carts.id, { onDelete: "cascade" }).notNull(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "restrict" }).notNull(),
  quantity: integer("quantity").default(1).notNull(),
  unitPriceCents: integer("unit_price_cents").default(0).notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  reference: text("reference").notNull().unique(),
  email: text("email").notNull(),
  phone: text("phone"),
  customerName: text("customer_name"),
  status: orderStatus("status").default("pending").notNull(),
  subtotalCents: integer("subtotal_cents").default(0).notNull(),
  totalCents: integer("total_cents").default(0).notNull(),
  paymentProvider: text("payment_provider"),
  paymentReference: text("payment_reference"),
  ...timestamps,
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "restrict" }),
  name: text("name").notNull(),
  quantity: integer("quantity").default(1).notNull(),
  unitPriceCents: integer("unit_price_cents").default(0).notNull(),
});

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category"),
  description: text("description").default("").notNull(),
  imageUrl: text("image_url"),
  fromPriceCents: integer("from_price_cents").default(0).notNull(),
  depositType: text("deposit_type").default("fixed").notNull(),
  depositValue: integer("deposit_value").default(0).notNull(),
  durationMinutes: integer("duration_minutes").default(60).notNull(),
  bufferBeforeMinutes: integer("buffer_before_minutes").default(0).notNull(),
  bufferAfterMinutes: integer("buffer_after_minutes").default(0).notNull(),
  status: contentStatus("status").default("draft").notNull(),
  bookingNotes: text("booking_notes"),
  ...timestamps,
});

export const serviceVariants = pgTable("service_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  serviceId: uuid("service_id").references(() => services.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  priceCents: integer("price_cents").default(0).notNull(),
  durationMinutes: integer("duration_minutes").default(60).notNull(),
  depositCents: integer("deposit_cents"),
  sortOrder: integer("sort_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
});

export const serviceQuestions = pgTable("service_questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  serviceId: uuid("service_id").references(() => services.id, { onDelete: "cascade" }).notNull(),
  variantId: uuid("variant_id").references(() => serviceVariants.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  type: text("type").notNull(),
  required: boolean("required").default(false).notNull(),
  helpText: text("help_text"),
  options: jsonb("options").$type<Array<{ label: string; value: string; priceDeltaCents?: number; durationDeltaMinutes?: number }>>().default([]).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  reference: text("reference").notNull().unique(),
  userId: text("user_id"),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  status: bookingStatus("status").default("pending_payment").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
  depositCents: integer("deposit_cents").default(0).notNull(),
  totalCents: integer("total_cents").default(0).notNull(),
  notes: text("notes"),
  answers: jsonb("answers").$type<Record<string, unknown>>().default({}).notNull(),
  sourceLookId: text("source_look_id"),
  ...timestamps,
});

export const bookingServices = pgTable("booking_services", {
  bookingId: uuid("booking_id").references(() => bookings.id, { onDelete: "cascade" }).notNull(),
  serviceId: uuid("service_id").references(() => services.id, { onDelete: "restrict" }).notNull(),
  variantId: uuid("variant_id").references(() => serviceVariants.id, { onDelete: "restrict" }),
  name: text("name").notNull(),
  priceCents: integer("price_cents").default(0).notNull(),
  durationMinutes: integer("duration_minutes").default(0).notNull(),
}, (table) => [primaryKey({ columns: [table.bookingId, table.serviceId] })]);

export const carePlusPlans = pgTable("care_plus_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  priceCents: integer("price_cents").notNull(),
  description: text("description").default("").notNull(),
  benefits: jsonb("benefits").$type<string[]>().default([]).notNull(),
  status: contentStatus("status").default("published").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  ...timestamps,
});

export const carePlusMemberships = pgTable("care_plus_memberships", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id"),
  email: text("email").notNull(),
  customerName: text("customer_name"),
  planId: uuid("plan_id").references(() => carePlusPlans.id, { onDelete: "restrict" }).notNull(),
  status: carePlusStatus("status").default("active").notNull(),
  provider: text("provider"),
  providerSubscriptionId: text("provider_subscription_id"),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
  ...timestamps,
});

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  phone: text("phone"),
  status: leadStatus("status").default("new").notNull(),
  source: text("source").default("website").notNull(),
  campaign: text("campaign"),
  consentAt: timestamp("consent_at", { withTimezone: true }),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
  ...timestamps,
});

export const leadMagnets = pgTable("lead_magnets", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").default("").notNull(),
  assetUrl: text("asset_url"),
  ctaLabel: text("cta_label").default("Get it free").notNull(),
  status: contentStatus("status").default("draft").notNull(),
  ...timestamps,
});

export const lookbookItems = pgTable("lookbook_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").default("").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),
  relatedServiceSlug: text("related_service_slug"),
  relatedVariantSlug: text("related_variant_slug"),
  relatedProductSlugs: jsonb("related_product_slugs").$type<string[]>().default([]).notNull(),
  featured: boolean("featured").default(false).notNull(),
  status: contentStatus("status").default("draft").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  ...timestamps,
});

export const transformationItems = pgTable("transformation_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  outcome: text("outcome").default("").notNull(),
  beforeImageUrl: text("before_image_url").notNull(),
  afterImageUrl: text("after_image_url").notNull(),
  category: text("category").notNull(),
  relatedServiceSlug: text("related_service_slug"),
  relatedVariantSlug: text("related_variant_slug"),
  relatedProductSlugs: jsonb("related_product_slugs").$type<string[]>().default([]).notNull(),
  carePlusPlanSlug: text("care_plus_plan_slug"),
  status: contentStatus("status").default("draft").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  ...timestamps,
});

export const userCollections = pgTable("user_collections", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  ...timestamps,
});

export const savedItems = pgTable("saved_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  collectionId: uuid("collection_id").references(() => userCollections.id, { onDelete: "set null" }),
  itemType: text("item_type").notNull(),
  itemId: text("item_id").notNull(),
  loved: boolean("loved").default(false).notNull(),
  ...timestamps,
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").default(5).notNull(),
  imageUrl: text("image_url"),
  service: text("service"),
  featured: boolean("featured").default(false).notNull(),
  status: contentStatus("status").default("draft").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  ...timestamps,
});

export const heroSlides = pgTable("hero_slides", {
  id: uuid("id").defaultRandom().primaryKey(),
  eyebrow: text("eyebrow"),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  mobileImageUrl: text("mobile_image_url"),
  ctaLabel: text("cta_label"),
  ctaHref: text("cta_href"),
  secondaryCtaLabel: text("secondary_cta_label"),
  secondaryCtaHref: text("secondary_cta_href"),
  status: contentStatus("status").default("draft").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  ...timestamps,
});


export * from "./auth-schema"