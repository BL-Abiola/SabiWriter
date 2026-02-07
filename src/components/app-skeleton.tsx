"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function AppSkeleton() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl animate-pulse">
        {/* Header Skeleton */}
        <div className="flex w-full items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div>
              <Skeleton className="h-9 w-48 mb-2" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>

        {/* Navigation Skeleton */}
        <div className="mb-8 border-b border-border">
            <div className="-mb-px flex w-full sm:justify-center sm:space-x-4">
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-24" />
            </div>
        </div>

        {/* Content Skeleton */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 pt-6">
            <div className="space-y-6 py-2">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-20 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
      </div>
    </div>
  )
}
