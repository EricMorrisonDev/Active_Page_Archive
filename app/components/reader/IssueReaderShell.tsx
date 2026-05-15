"use client";

import {
  type ReactNode,
  useEffect,
  useId,
  useState,
} from "react";

type IssueReaderShellProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

export function IssueReaderShell({ sidebar, children }: IssueReaderShellProps) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-neutral-100 dark:bg-neutral-900">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="absolute left-3 top-12 z-20 rounded-full border border-neutral-500 bg-neutral-800/95 px-4 py-2 font-sans text-sm font-medium text-neutral-100 shadow-lg backdrop-blur-sm hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:border-neutral-600 dark:bg-neutral-950/95 dark:text-neutral-50 dark:hover:bg-neutral-900"
        aria-expanded={open}
        aria-controls={detailsId}
      >
        {open ? "Hide details" : "About this issue"}
      </button>

      <div
        role="presentation"
        className={`absolute inset-0 z-30 bg-black/50 transition-[opacity] duration-300 ease-out motion-reduce:transition-none dark:bg-black/60 ${
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={open ? () => setOpen(false) : undefined}
      />

      <div
        id={detailsId}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        aria-labelledby={`${detailsId}-title`}
        inert={open ? undefined : true}
        className={`absolute left-0 top-0 z-40 flex h-full w-full max-w-md flex-col border-r border-neutral-200 bg-neutral-50 shadow-2xl will-change-transform transition-transform duration-300 ease-out motion-reduce:transition-none dark:border-neutral-700 dark:bg-neutral-950 ${
          open
            ? "translate-x-0"
            : "-translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
          <h2
            id={`${detailsId}-title`}
            className="font-sans text-sm font-semibold text-neutral-900 dark:text-neutral-100"
          >
            About this issue
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md px-3 py-1.5 font-sans text-sm font-medium text-neutral-700 hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            Close
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{sidebar}</div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
