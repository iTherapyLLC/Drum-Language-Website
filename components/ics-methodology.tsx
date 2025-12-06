"use client"

import { Card, CardContent } from "@/components/ui/card"

const factors = [
  {
    symbol: "V",
    name: "Variety",
    description: "Number of distinct cognitive inputs (0-10 scale)",
    example: "Clinical + tech + music + research = V of 4+",
  },
  {
    symbol: "C",
    name: "Connectivity",
    description: "Cross-domain synthesis where C ≤ V",
    example: "How disciplines inform each other",
  },
  {
    symbol: "F",
    name: "Freedom",
    description: "Degrees of autonomy and exploration",
    example: "Space to experiment and iterate",
  },
  {
    symbol: "T",
    name: "Tension",
    description: "Productive challenge that drives iteration",
    example: 'The "itch" that demands solving',
  },
]

export function ICSMethodology() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">The Framework</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Innovation Capacity Score (ICS)
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            A mathematical framework for measuring and optimizing breakthrough thinking.
          </p>

          {/* Formula */}
          <div className="inline-block bg-card border border-border rounded-xl px-8 py-6 shadow-sm">
            <p className="font-mono text-xl sm:text-2xl text-foreground">
              ICS = <span className="text-primary">f</span>((V!/(V-C)!) × F × T)
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {factors.map((factor) => (
            <Card key={factor.symbol} className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-mono text-2xl font-bold text-primary">{factor.symbol}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{factor.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{factor.description}</p>
                <p className="text-xs text-muted-foreground italic">{factor.example}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            The factorial relationship (V!/(V-C)!) creates exponential innovation potential. With V=7 and C=5, you get{" "}
            <span className="font-mono text-primary font-medium">2,520</span> base combinations—then multiply by Freedom
            and Tension for breakthrough capacity.
          </p>
        </div>
      </div>
    </section>
  )
}
