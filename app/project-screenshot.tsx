"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Only real captures of the linked public website are shown.
 * A failed capture produces a clear empty state, never a fabricated UI.
 * Static user-provided screenshots can replace the source when uploaded.
 */
export default function ProjectScreenshot({ name, url }: { name: string; url: string }) {
  const [provider, setProvider] = useState(0);
  const imageUrls = [
    `https://image.thum.io/get/width/1600/crop/1000/noanimate/maxAge/24/${url}`,
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1600`,
  ];

  return (
    <div className="project-screenshot">
      {provider < imageUrls.length ? (
        <Image
          key={imageUrls[provider]}
          src={imageUrls[provider]}
          alt={`Screenshot of the live ${name} website`}
          fill
          unoptimized
          sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 39vw, 500px"
          loading="lazy"
          onError={() => setProvider((value) => value + 1)}
        />
      ) : (
        <div className="project-preview-unavailable" role="img" aria-label={`Preview unavailable for ${name}`}>
          Preview unavailable — open the live demo to view this project.
        </div>
      )}
    </div>
  );
}
