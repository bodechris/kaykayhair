import { asc } from "drizzle-orm"

import { AdminPageHeader } from "@/components/admin/AdminPage"
import ServiceEditor from "@/components/admin/ServiceEditor"
import VariantEditor from "@/components/admin/VariantEditor"
import { db } from "@/lib/db/client"
import {
  services,
  serviceVariants,
  serviceQuestions,
} from "@/lib/db/schema"

function money(cents: number | null | undefined) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format((cents ?? 0) / 100)
}

function duration(minutes: number | null | undefined) {
  const value = minutes ?? 0

  if (value < 60) return `${value} min`

  const hours = Math.floor(value / 60)
  const mins = value % 60

  return mins ? `${hours}h ${mins}m` : `${hours}h`
}

export default async function Page() {
  const [serviceRows, variantRows, questionRows] = await Promise.all([
    db.select().from(services).orderBy(asc(services.name)),
    db
      .select()
      .from(serviceVariants)
      .orderBy(asc(serviceVariants.sortOrder)),
    db
      .select()
      .from(serviceQuestions)
      .orderBy(asc(serviceQuestions.sortOrder)),
  ])

  const variantsByService = new Map<string, typeof variantRows>()
  const questionsByService = new Map<string, typeof questionRows>()

  for (const variant of variantRows) {
    const current = variantsByService.get(variant.serviceId) ?? []
    current.push(variant)
    variantsByService.set(variant.serviceId, current)
  }

  for (const question of questionRows) {
    const current = questionsByService.get(question.serviceId) ?? []
    current.push(question)
    questionsByService.set(question.serviceId, current)
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Bookings"
        title="Services"
        description="Manage the services, pricing, durations and booking questions customers see when booking."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="Services" value={serviceRows.length} />
        <StatCard label="Variants" value={variantRows.length} />
        <StatCard label="Booking questions" value={questionRows.length} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {serviceRows.map((service) => {
          const variants = variantsByService.get(service.id) ?? []
          const questions = questionsByService.get(service.id) ?? []

          return (
            <section
              key={service.id}
              style={{
                background: "#fff",
                border: "1px solid #ece7ea",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 12px 40px rgba(24, 15, 22, 0.04)",
              }}
            >
              <div
                style={{
                  padding: "24px 26px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 24,
                  alignItems: "flex-start",
                  borderBottom: variants.length
                    ? "1px solid #f0ebee"
                    : undefined,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                        fontSize: 20,
                        lineHeight: 1.2,
                      }}
                    >
                      {service.name}
                    </h2>

                    <span
                      style={{
                        fontSize: 12,
                        padding: "5px 9px",
                        borderRadius: 999,
                        background: "#fff1f5",
                        color: "#d92d63",
                      }}
                    >
                      {variants.length} variants
                    </span>

                    <span
                      style={{
                        fontSize: 12,
                        padding: "5px 9px",
                        borderRadius: 999,
                        background: "#f6f3f5",
                        color: "#746a70",
                      }}
                    >
                      {questions.length} questions
                    </span>
                  </div>

                  {service.description ? (
                    <p
                      style={{
                        margin: "10px 0 0",
                        color: "#786e74",
                        lineHeight: 1.6,
                        maxWidth: 760,
                      }}
                    >
                      {service.description}
                    </p>
                  ) : null}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      fontSize: 18,
                    }}
                  >
                    From {money(service.fromPriceCents)}
                  </strong>

                  <span
                    style={{
                      color: "#8a7f85",
                      fontSize: 13,
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    {duration(service.durationMinutes)} · {service.status}
                  </span>
                  <ServiceEditor
                    id={service.id}
                    name={service.name}
                    description={service.description}
                    fromPriceCents={service.fromPriceCents}
                    durationMinutes={service.durationMinutes}
                    depositValue={service.depositValue}
                    status={service.status}
                  />
                </div>
              </div>

              {variants.length > 0 ? (
                <div style={{ padding: "6px 14px 14px" }}>
                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "minmax(0, 1fr) 130px 120px 120px 72px",
                        gap: 18,
                        alignItems: "center",
                        padding: "16px 12px",
                        borderBottom: "1px solid #f3eef1",
                      }}
                    >
                      <div>
                        <strong>{variant.name}</strong>

                        {variant.description ? (
                          <div
                            style={{
                              marginTop: 4,
                              fontSize: 13,
                              color: "#8a7f85",
                            }}
                          >
                            {variant.description}
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <SmallLabel>Price</SmallLabel>
                        <strong>{money(variant.priceCents)}</strong>
                      </div>

                      <div>
                        <SmallLabel>Duration</SmallLabel>
                        <span>{duration(variant.durationMinutes)}</span>
                      </div>

                      <div>
                        <SmallLabel>Deposit</SmallLabel>
                        <span>{money(variant.depositCents)}</span>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <VariantEditor
                          id={variant.id}
                          name={variant.name}
                          description={variant.description}
                          priceCents={variant.priceCents}
                          durationMinutes={variant.durationMinutes}
                          depositCents={variant.depositCents}
                          active={variant.active}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    padding: "18px 26px",
                    color: "#8a7f85",
                    fontSize: 14,
                  }}
                >
                  No service variants.
                </div>
              )}
            </section>
          )
        })}
      </div>
    </>
  )
}

function StatCard({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ece7ea",
        borderRadius: 22,
        padding: "22px",
      }}
    >
      <div
        style={{
          color: "#8a7f85",
          fontSize: 13,
          marginBottom: 8,
        }}
      >
        {label}
      </div>

      <strong
        style={{
          fontSize: 28,
          lineHeight: 1,
        }}
      >
        {value}
      </strong>
    </div>
  )
}

function SmallLabel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        color: "#978c92",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 4,
      }}
    >
      {children}
    </div>
  )
}