import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { IssueMetaSidebar } from "@/app/components/reader/IssueMetaSidebar";
import { IssueReaderPanel } from "@/app/components/reader/IssueReaderPanel";
import { IssueReaderShell } from "@/app/components/reader/IssueReaderShell";
import { getIssueById } from "@/lib/issues";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const issue = getIssueById(id);
  if (!issue) {
    return { title: "Issue not found" };
  }
  return {
    title: issue.title,
    description: issue.summary ?? `Read ${issue.title} in the archive.`,
  };
}

export default async function IssuePage({ params }: Props) {
  const { id } = await params;
  const issue = getIssueById(id);
  if (!issue) {
    notFound();
  }

  return (
    <IssueReaderShell sidebar={<IssueMetaSidebar issue={issue} />}>
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center bg-[var(--reader-chrome)] font-sans text-sm text-neutral-500">
            Loading reader…
          </div>
        }
      >
        <IssueReaderPanel issue={issue} />
      </Suspense>
    </IssueReaderShell>
  );
}
