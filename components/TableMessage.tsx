import { ReactNode } from "react";

interface Props {
  count: number;
  limit: number;
  children: ReactNode;
}

export function TableMessage({ count, limit, children }: Props) {
  if (count === 0)
    return <div className="hint">No results. Try broadening your search.</div>;
  if (count > limit)
    return (
      <div className="hint">
        {count.toLocaleString()} results &mdash; narrow your search to see the table.
      </div>
    );
  return <>{children}</>;
}
