"use client";

import { useState } from "react";
import { GALLERY, GALLERY_CATEGORIES, type GalleryCategory } from "@/content/gallery";
import { LightboxGallery } from "./lightbox";

type Filter = "All" | GalleryCategory;

const FILTERS: readonly Filter[] = ["All", ...GALLERY_CATEGORIES];

function countFor(filter: Filter) {
  return filter === "All" ? GALLERY.length : GALLERY.filter((photo) => photo.category === filter).length;
}

/** Category filter and masonry grid of the photo library; the lightbox shows the filtered set. */
export function GalleryBrowser() {
  const [filter, setFilter] = useState<Filter>("All");
  const photos = filter === "All" ? GALLERY : GALLERY.filter((photo) => photo.category === filter);

  return (
    <div>
      <div role="group" aria-label="Filter photos by category" className="flex flex-wrap gap-2">
        {FILTERS.map((option) => {
          const active = option === filter;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option)}
              className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[15px] font-semibold transition ${
                active
                  ? "border-navy bg-navy text-white"
                  : "border-line bg-panel text-navy hover:border-navy"
              }`}
            >
              {option}
              <span className={`tabular-nums text-sm ${active ? "text-gold-bright" : "text-ink-soft"}`}>
                {countFor(option)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-ink-soft" aria-live="polite">
        Showing {photos.length} {photos.length === 1 ? "photo" : "photos"}
        {filter !== "All" && ` in ${filter}`}
      </p>

      <div key={filter} className="mt-6 transition-opacity duration-500 starting:opacity-0">
        <LightboxGallery photos={photos} layout="masonry" />
      </div>
    </div>
  );
}
