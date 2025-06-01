import { Skeleton } from '@/components/ui/skeleton'

export function DeleteAccountLoading() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900">
        <div>
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="mt-3">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="mt-3">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="mt-3">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-5 w-36" />
        </div>
      </div>

      <div className="flex items-start gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <Skeleton className="h-5 w-5 flex-shrink-0" />
        <Skeleton className="h-10 flex-1" />
      </div>

      <div className="flex justify-end gap-3">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
} 