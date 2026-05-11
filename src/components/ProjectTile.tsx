"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { FlatProject } from "@/content/projects";
import { driveThumbUrl, driveViewUrl } from "@/lib/drive";

interface ProjectTileProps {
  project: FlatProject;
  onClick: (project: FlatProject) => void;
  priority?: boolean;
}

function aspectClass(a: string): string {
  if (a === "9:16") return "aspect-[9/16]";
  if (a === "16:9") return "aspect-[16/9]";
  if (a === "1:1") return "aspect-square";
  if (a === "4:5") return "aspect-[4/5]";
  return "aspect-square";
}

function colSpanClass(a: string): string {
  return a === "16:9" ? "col-span-2" : "col-span-1";
}

export default function ProjectTile({
  project,
  onClick,
  priority = false,
}: ProjectTileProps) {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={() => onClick(project)}
      className={`group relative ${colSpanClass(project.aspect)} ${aspectClass(project.aspect)} rounded-md overflow-hidden bg-surface2 border border-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2`}
      aria-label={`Open ${project.title}`}
    >
      {/* Skeleton pulse while thumbnail loads */}
      {!loaded && !imgError && (
        <div className="absolute inset-0 bg-surface2 animate-pulse" />
      )}

      {/* Thumbnail */}
      {!imgError && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={driveThumbUrl(project.drive_id)}
          alt={project.title}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setImgError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Error fallback */}
      {imgError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface2 gap-3 p-4">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <Play className="w-5 h-5 text-white/30 fill-white/30 ml-0.5" aria-hidden="true" />
          </div>
          <p className="text-xs font-body text-white/40 text-center leading-snug">
            {project.title}
          </p>
          <a
            href={driveViewUrl(project.drive_id)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-body text-accent hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Open in Drive
          </a>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Play icon on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center shadow-glow-accent">
          <Play className="w-5 h-5 text-white fill-white ml-0.5" aria-hidden="true" />
        </div>
      </div>

      {/* Category tag (always visible, subtle) */}
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-body font-semibold uppercase tracking-wider bg-black/50 text-white/60 px-2 py-1 rounded-full backdrop-blur-sm">
          {project.categoryLabel}
        </span>
      </div>

      {/* Title on hover */}
      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
        <p className="text-sm font-body font-medium text-white truncate">
          {project.title}
        </p>
      </div>
    </button>
  );
}
