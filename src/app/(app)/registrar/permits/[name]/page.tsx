"use client"

import { use } from "react"
import { EntryScreen } from "@/components/sms/EntryScreen"
import { permitSpec } from "@/lib/forms/registrar"

export default function PermitEntryPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = use(params)
  const isNew = name === "new"
  return (
    <EntryScreen
      spec={permitSpec}
      name={isNew ? undefined : decodeURIComponent(name)}
      basePath="/registrar/permits"
    />
  )
}
