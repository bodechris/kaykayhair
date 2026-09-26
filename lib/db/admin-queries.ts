import { count, desc, eq } from "drizzle-orm";
import { db } from "./client";
import {
  bookings,
  carePlusMemberships,
  carts,
  heroSlides,
  leads,
  lookbookItems,
  orders,
  products,
  services,
  testimonials,
  transformationItems,
} from "./schema";

export type AdminMetric = { label: string; value: number; hint?: string };

export async function getAdminOverview(): Promise<AdminMetric[]> {
  // if (!databaseConfigured) {
  //   return [
  //     { label: "Bookings", value: 0, hint: "Connect Postgres to go live" },
  //     { label: "Orders", value: 0, hint: "Connect Postgres to go live" },
  //     { label: "Care+ members", value: 0, hint: "Connect Postgres to go live" },
  //     { label: "Leads", value: 0, hint: "Connect Postgres to go live" },
  //   ];
  // }

  const [[bookingCount], [orderCount], [careCount], [leadCount]] = await Promise.all([
    db.select({ value: count() }).from(bookings),
    db.select({ value: count() }).from(orders),
    db.select({ value: count() }).from(carePlusMemberships).where(eq(carePlusMemberships.status, "active")),
    db.select({ value: count() }).from(leads),
  ]);

  return [
    { label: "Bookings", value: bookingCount.value },
    { label: "Orders", value: orderCount.value },
    { label: "Care+ members", value: careCount.value },
    { label: "Leads", value: leadCount.value },
  ];
}

export async function getModuleCounts() {
  // if (!databaseConfigured) {
  //   return {
  //     products: 0,
  //     services: 0,
  //     lookbook: 0,
  //     transformations: 0,
  //     testimonials: 0,
  //     heroSlides: 0,
  //     abandonedCarts: 0,
  //   };
  // }

  const results = await Promise.all([
    db.select({ value: count() }).from(products),
    db.select({ value: count() }).from(services),
    db.select({ value: count() }).from(lookbookItems),
    db.select({ value: count() }).from(transformationItems),
    db.select({ value: count() }).from(testimonials),
    db.select({ value: count() }).from(heroSlides),
    db.select({ value: count() }).from(carts).where(eq(carts.status, "cart")),
  ]);

  return {
    products: results[0][0].value,
    services: results[1][0].value,
    lookbook: results[2][0].value,
    transformations: results[3][0].value,
    testimonials: results[4][0].value,
    heroSlides: results[5][0].value,
    abandonedCarts: results[6][0].value,
  };
}

export async function getRecentBookings(limit = 5) {
  // if (!databaseConfigured) return [];
  return db.select().from(bookings).orderBy(desc(bookings.createdAt)).limit(limit);
}

export async function getRecentOrders(limit = 5) {
  // if (!databaseConfigured) return [];
  return db.select().from(orders).orderBy(desc(orders.createdAt)).limit(limit);
}
