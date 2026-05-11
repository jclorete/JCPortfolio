"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink } from "lucide-react";
import type { FlatProject } from "@/content/projects";
import { drivePreviewUrl, driveViewUrl } from "@/lib/drive";

interface ProjectModalProps {
  project: FlatProject;
  onClose: () => void;
}

function aspectClass(a: string): string {
  if (a === "9:16") return "aspect-[9/16] max-h-[85vh] w-auto";
  if (a === "1:1") return "aspect-square max-h-[85vh] w-auto";
  if (a === "4:5") return "aspect-[4/5] max-h-[85vh] w-auto";
  return "aspect-[16/9] w-full";
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const isMounted = typeof document !== "undefined";
  if (!isMounted) return null;

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`relative flex flex-col ${project.aspect === "16:9" ? "w-full max-w-4xl" : "max-w-sm w-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div>
            <p className="text-xs font-body text-accent uppercase tracking-wider">
              {project.categoryLabel}
            </p>
            <h2 className="text-base font-display font-bold text-white">
              {project.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={driveViewUrl(project.drive_id)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-white/50 hover:text-white transition-colors"
              aria-label="Open in Google Drive"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              ref={closeRef}
              onClick={onClose}
              className="p-2 rounded-md text-white/50 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video container */}
        <div
          className={`relative ${aspectClass(project.aspect)} rounded-lg overflow-hidden bg-surface1 border border-white/10`}
        >
          <iframe
            src={drivePreviewUrl(project.drive_id)}
            allow="autoplay; encrypted-media"
            allowFullScreen
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full border-0"
            title={project.title}
            loading="lazy"
          />
          {/* Fallback for permission errors */}
          <noscript>
            <div className="absolute inset-0 flex items-center justify-center bg-surface1">
              <a
                href={driveViewUrl(project.drive_id)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-body text-accent underline"
              >
                Open in Google Drive
              </a>
            </div>
          </noscript>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
