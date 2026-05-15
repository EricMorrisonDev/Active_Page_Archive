"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export type PdfReaderProps = {
  fileUrl: string;
  page: number;
  onPageChange: (page: number) => void;
};

export function PdfReader({ fileUrl, page, onPageChange }: PdfReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const safePage =
    numPages != null ? Math.min(Math.max(1, page), numPages) : Math.max(1, page);

  const documentOptions = useMemo(
    () => ({
      wasmUrl: "/wasm/",
    }),
    []
  );

  useEffect(() => {
    if (numPages != null && page > numPages) {
      onPageChange(numPages);
    }
  }, [numPages, onPageChange, page]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }
    const ro = new ResizeObserver(() => {
      setContainerWidth(el.clientWidth);
    });
    ro.observe(el);
    setContainerWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages: nextNumPages }: { numPages: number }) => {
      setLoadError(null);
      setNumPages(nextNumPages);
    },
    []
  );

  const onDocumentLoadError = useCallback((err: Error) => {
    setLoadError(err.message);
    setNumPages(null);
  }, []);

  const goPrev = useCallback(() => {
    onPageChange(Math.max(1, safePage - 1));
  }, [onPageChange, safePage]);

  const goNext = useCallback(() => {
    if (numPages != null) {
      onPageChange(Math.min(numPages, safePage + 1));
    } else {
      onPageChange(safePage + 1);
    }
  }, [numPages, onPageChange, safePage]);

  useEffect(() => {
    function onKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
        return;
      }
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
      if (e.key === "ArrowLeft") {
        goPrev();
      } else {
        goNext();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  const pageWidth =
    containerWidth != null ? Math.max(280, containerWidth - 32) : 800;

  return (
    <div
      className="flex min-h-0 flex-1 flex-col bg-neutral-900"
      ref={containerRef}
    >
      <div className="flex shrink-0 items-center justify-center gap-2 border-b border-neutral-800 px-3 py-2 font-sans text-sm text-neutral-200">
        <button
          type="button"
          onClick={goPrev}
          disabled={safePage <= 1}
          className="rounded border border-neutral-600 px-2 py-1 text-xs font-medium transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <span className="tabular-nums text-neutral-300">
          Page {safePage}
          {numPages != null ? ` of ${numPages}` : ""}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={numPages != null && safePage >= numPages}
          className="rounded border border-neutral-600 px-2 py-1 text-xs font-medium transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto px-4 py-6">
        {loadError ? (
          <p className="max-w-md font-sans text-sm text-red-300">{loadError}</p>
        ) : null}
        <div className="mx-auto flex w-full max-w-4xl justify-center">
          <Document
            file={fileUrl}
            options={documentOptions}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <p className="font-sans text-sm text-neutral-400">Loading PDF…</p>
            }
            className="flex justify-center"
          >
            <Page
              pageNumber={safePage}
              width={pageWidth}
              className="shadow-2xl"
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
