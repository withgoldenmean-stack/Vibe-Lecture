import { CircleAlert } from "lucide-react";

type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed border-line bg-white px-5 py-8 text-center text-base font-normal text-muted">
      <div className="flex flex-col items-center gap-3">
        <CircleAlert className="h-6 w-6 text-slate-400" aria-hidden="true" />
        <p>{message}</p>
      </div>
    </div>
  );
}
