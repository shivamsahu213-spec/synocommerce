import { cn } from '@shared/lib/utils';
import type { HTMLAttributes } from 'react';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-xl border bg-surface p-6 shadow-soft', className)} {...props} />;
}
