"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type DesignVersion = "editorial" | "glass";
type VersionContextValue = { version: DesignVersion; changeVersion: (version: DesignVersion) => void };
const STORAGE_KEY = "kutullo-portfolio-design";
const VersionContext = createContext<VersionContextValue | null>(null);

export function PortfolioExperience({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<DesignVersion>("glass");

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const query = url.searchParams.get("design");
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (query === "v2" || query === "glass") setVersion("glass");
      else if (query === "v1" || query === "editorial") setVersion("editorial");
      else if (saved === "glass" || saved === "editorial") setVersion(saved);
    } catch {
      // Browsers with storage disabled can still switch versions in this session.
    }
  }, []);

  const changeVersion = useCallback((nextVersion: DesignVersion) => {
    setVersion(nextVersion);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextVersion);
      const url = new URL(window.location.href);
      url.searchParams.set("design", nextVersion === "glass" ? "v2" : "v1");
      window.history.replaceState(window.history.state, "", url.toString());
    } catch {
      // Keep the switch usable even when storage or history access is restricted.
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <VersionContext.Provider value={{ version, changeVersion }}>
      <div data-portfolio-version={version}>
        {children}
      </div>
    </VersionContext.Provider>
  );
}

export function DesignVersionToggle() {
  const context = useContext(VersionContext);
  if (!context) return null;

  return (
    <div className="design-version-toggle" role="group" aria-label="Choose portfolio design">
      <span className="design-version-label" aria-hidden="true">DESIGN</span>
      <button
        type="button"
        className={context.version === "editorial" ? "design-version-choice is-active" : "design-version-choice"}
        onClick={() => context.changeVersion("editorial")}
        aria-pressed={context.version === "editorial"}
        title="Switch to Version 1: editorial"
      >
        <span>01</span><span className="design-version-name">Classic</span>
      </button>
      <button
        type="button"
        className={context.version === "glass" ? "design-version-choice is-active" : "design-version-choice"}
        onClick={() => context.changeVersion("glass")}
        aria-pressed={context.version === "glass"}
        title="Switch to Version 2: glass"
      >
        <span>02</span><span className="design-version-name">Studio</span>
      </button>
    </div>
  );
}

export function usePortfolioDesign(): DesignVersion {
  const context = useContext(VersionContext);
  return context?.version ?? "editorial";
}
