import type { HTMLAttributes } from 'react';
import { cn } from '@shared/lib/utils';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-xl border bg-surface p-6 shadow-soft', className)} {...props} />;
}
