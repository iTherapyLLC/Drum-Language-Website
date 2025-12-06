"use client"

const credentials = [
  { value: "$2.2M+", label: "Federal Grants" },
  { value: "10+", label: "Successful SBIRs" },
  { value: "30+", label: "Years Drumming" },
  { value: "NSF", label: "Phase 2 CTO" },
  { value: "NIH", label: "Co-Investigator" },
  { value: "Mensa", label: "Board Trustee" },
]

export function CredentialsBar() {
  return (
    <section className="py-12 px-4 border-y border-border bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {credentials.map((cred) => (
            <div key={cred.label} className="text-center">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-1">{cred.value}</p>
              <p className="text-sm text-muted-foreground">{cred.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
