import Link from "next/link"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const SCREENS = [
  {
    href: "/finance/discounts",
    title: "Discounts",
    description: "Tuition and misc-fee discount codes applied at assessment time.",
  },
  {
    href: "/finance/assessments",
    title: "Student Assessments",
    description: "Assess a student's fees for a term, submit, and record payments.",
  },
  {
    href: "/finance/wallets",
    title: "Student Wallets",
    description: "Look up a student's e-cash wallet balance and record top-ups or payments.",
  },
]

export default function FinancePage() {
  return (
    <div className="grid gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Finance</h1>
        <p className="text-muted-foreground">
          Billing: discounts, student assessments, and e-cash wallets.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SCREENS.map((s) => (
          <Link key={s.href} href={s.href}>
            <Card className="h-full transition-colors hover:bg-muted/40">
              <CardHeader>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>{s.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
