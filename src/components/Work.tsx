"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import Chip from "@/components/ui/Chip";
import ProjectTile from "@/components/ProjectTile";
import ProjectModal from "@/components/ProjectModal";
import {
  categoryChips,
  getFlatProjects,
  type FlatProject,
} from "@/content/projects";

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalProject, setModalProject] = useState<FlatProject | null>(null);

  const allProjects = useMemo(() => getFlatProjects(), []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return allProjects;
    return allProjects.filter((p) => p.categoryLabel === activeCategory);
  }, [activeCategory, allProjects]);

  const isEmpty = filtered.length === 0;

  return (
    <section
      id="work"
      className="section-divider py-24 md:py-32"
      aria-label="Selected work"
    >
      <div className="max-w-layout mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="text-eyebrow mb-4">
            Selected work
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-heading text-white mb-10">
            Creative work that delivers.
          </motion.h2>

          {/* Filter chips */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-2 mb-10"
            role="group"
            aria-label="Filter by category"
          >
            {categoryChips.map((chip) => (
              <Chip
                key={chip}
                active={activeCategory === chip}
                onClick={() => setActiveCategory(chip)}
              >
                {chip}
              </Chip>
            ))}
          </motion.div>
        </motion.div>

        {/* Empty state */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-white/50 font-body text-base">
              More work coming soon — email for full design samples.
            </p>
            <a
              href="mailto:jclorete09@gmail.com"
              className="mt-4 text-sm text-accent hover:underline font-body"
            >
              jclorete09@gmail.com
            </a>
          </div>
        )}

        {/* Project grid */}
        {!isEmpty && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filtered.map((project, i) => (
              <ProjectTile
                key={project.id}
                project={project}
                onClick={setModalProject}
                priority={i < 8}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </section>
  );
}
