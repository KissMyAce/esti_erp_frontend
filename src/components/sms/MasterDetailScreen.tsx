"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { frappe, getErrorMessage } from "@/lib/frappe"
import type { FormSpec } from "@/lib/forms/types"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { DynamicField } from "@/components/sms/DynamicField"

/**
 * The ~115 legacy Master/Detail screens (blueprint §5.1): a list view plus an
 * Add/Edit detail panel, backed by one Frappe DocType.
 */
export function MasterDetailScreen({ spec }: { spec: FormSpec }) {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const listColumns = spec.fields.filter((f) => f.inListView)
  const columns = listColumns.length ? listColumns : spec.fields.slice(0, 4)

  const { data, isLoading } = useQuery({
    queryKey: [spec.doctype, "list"],
    queryFn: () =>
      frappe.list(spec.doctype, {
        fields: ["name", ...spec.fields.map((f) => f.fieldname)],
        limit_page_length: 100,
      }),
  })

  const form = useForm<Record<string, unknown>>({ defaultValues: {} })

  const saveMutation = useMutation({
    mutationFn: async (values: Record<string, unknown>) => {
      if (editing?.name) {
        return frappe.updateDoc(spec.doctype, String(editing.name), values)
      }
      return frappe.createDoc(spec.doctype, values)
    },
    onSuccess: () => {
      toast.success(`${spec.title} saved`)
      queryClient.invalidateQueries({ queryKey: [spec.doctype, "list"] })
      setDialogOpen(false)
    },
    onError: (error) => toast.error(`Could not save ${spec.title}: ${getErrorMessage(error)}`),
  })

  function openNew() {
    setEditing(null)
    form.reset({})
    setDialogOpen(true)
  }

  function openRow(row: Record<string, unknown>) {
    setEditing(row)
    form.reset(row)
    setDialogOpen(true)
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{spec.title}</h1>
        <Button onClick={openNew}>Add {spec.title}</Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((c) => (
                  <TableHead key={c.fieldname}>{c.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data ?? []).map((row) => (
                <TableRow
                  key={String(row.name)}
                  className="cursor-pointer"
                  onClick={() => openRow(row)}
                >
                  {columns.map((c) => (
                    <TableCell key={c.fieldname}>
                      {String(row[c.fieldname] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? `Edit ${spec.title}` : `New ${spec.title}`}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) =>
                saveMutation.mutate(values)
              )}
              className="grid gap-4"
            >
              {spec.fields.map((f) => (
                <DynamicField key={f.fieldname} control={form.control} spec={f} />
              ))}
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving…" : "Save"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
