"use client"

import { useAuth } from "@/providers/AuthProvider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {user?.full_name}</h1>
        <p className="text-muted-foreground">
          You have access to {user?.modules.length ?? 0} module
          {user?.modules.length === 1 ? "" : "s"}.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {user?.modules.map((module) => (
          <Card key={module}>
            <CardHeader>
              <CardTitle className="text-base">{module}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Module scaffold — screens land here module by module, per the
              blueprint&apos;s phased roadmap.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
