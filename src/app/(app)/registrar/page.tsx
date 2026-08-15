import Link from "next/link"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const SCREENS = [
  {
    href: "/registrar/students",
    title: "Students",
    description: "Student master records — demographics, PH registrar fields, credentials.",
  },
  {
    href: "/registrar/curriculum",
    title: "Curriculum",
    description: "Prescribed subjects per program, with prerequisite chains.",
  },
  {
    href: "/registrar/enrollment",
    title: "Enrollment & Grades",
    description: "Enroll students into classes, view class rosters, compute grades.",
  },
  {
    href: "/registrar/permits",
    title: "Permits to Take Exam",
    description: "Track exam eligibility and fee balances per student per term.",
  },
]

export default function RegistrarPage() {
  return (
    <div className="grid gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Registrar</h1>
        <p className="text-muted-foreground">
          Student records, curriculum, enrollment, and exam permits.
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
