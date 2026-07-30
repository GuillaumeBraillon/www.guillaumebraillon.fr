export function initTablatures() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTablatures);
    return;
  }

  const search = document.getElementById("search") as HTMLInputElement | null;
  const items = Array.from(document.querySelectorAll(".tab-item")) as HTMLElement[];
  const sections = Array.from(document.querySelectorAll("section")) as HTMLElement[];
  const clearBtn = document.getElementById("clear-search") as HTMLButtonElement | null;
  const modeHideBtn = document.getElementById("mode-hide") as HTMLButtonElement | null;
  const modeHighlightBtn = document.getElementById("mode-highlight") as HTMLButtonElement | null;
  const nextBtn = document.getElementById("next-match") as HTMLButtonElement | null;
  const counter = document.getElementById("match-counter") as HTMLElement | null;
  const hideCounter = document.getElementById("hide-counter") as HTMLElement | null;
  const textEl = document.getElementById("tab-text-content") as HTMLElement | null;
  const pdfContainerEl = document.getElementById("tab-pdf-container") as HTMLElement | null;

  let mode: "hide" | "highlight" = "hide";
  let currentMatches: HTMLElement[] = [];
  let currentIndex = -1;

  // Pré-calcule, une fois pour toutes, les items + lien d'index appartenant à chaque section.
  // Évite de refaire un querySelectorAll par section à chaque frappe.
  const sectionInfo = sections.map((section) => ({
    section,
    items: Array.from(section.querySelectorAll(".tab-item")) as HTMLElement[],
    link: document.querySelector(`[data-letter="${section.id}"]`) as HTMLElement | null,
  }));

  // Cache le texte original de chaque item pour éviter de relire le DOM à chaque frappe.
  const itemCache = items.map((item) => {
    const anchor = item.querySelector("a") as HTMLAnchorElement | null;
    return {
      item,
      anchor,
      name: item.dataset.name ?? "",
      original: anchor?.dataset.originalName ?? "",
    };
  });

  function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function escapeHtml(str: string) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function highlight(text: string, regex: RegExp | null) {
    const safe = escapeHtml(text);
    if (!regex) return safe;
    return safe.replace(regex, "<mark>$1</mark>");
  }

  /**
   * Point d'entrée unique du filtrage : calcule une seule fois la correspondance
   * de chaque item, puis met à jour items, sections, index de lettres et compteurs.
   */
  function applyFilter(rawValue: string) {
    const v = rawValue.toLowerCase().trim();
    const matches: HTMLElement[] = [];
    const highlightRegex = v ? new RegExp(`(${escapeRegExp(rawValue)})`, "gi") : null;

    for (const { item, anchor, name, original } of itemCache) {
      const match = !v || name.includes(v);
      if (match) matches.push(item);

      if (!v) {
        item.style.display = "";
        item.style.opacity = "1";
        if (anchor) anchor.textContent = original;
        continue;
      }

      if (mode === "hide") {
        item.style.display = match ? "" : "none";
        item.style.opacity = "1";
        if (!match) continue;
        if (anchor) anchor.innerHTML = highlight(original, highlightRegex);
      } else {
        item.style.display = "";
        item.style.opacity = match ? "1" : "0.25";
        if (anchor) {
          if (match) anchor.innerHTML = highlight(original, highlightRegex);
          else anchor.textContent = original;
        }
      }
    }

    currentMatches = v ? matches : [];
    currentIndex = -1;

    // Sections + index sticky : une seule passe, réutilise les items déjà filtrés au-dessus.
    for (const { section, items: sItems, link } of sectionInfo) {
      const showSection = mode !== "hide" || !v || sItems.some((i) => i.style.display !== "none");
      section.style.display = showSection ? "" : "none";
      if (link) link.style.display = showSection ? "" : "none";
    }

    updateCounter(v);
    updateActionButtons(v);
  }

  function updateCounter(value: string) {
    if (mode === "highlight") {
      if (!counter) return;
      const total = currentMatches.length;
      const current = currentIndex >= 0 ? currentIndex + 1 : 0;
      counter.textContent = `${current} / ${total}`;
      return;
    }

    const visibleCount = value ? currentMatches.length : items.length;
    if (hideCounter)
      hideCounter.textContent = `${visibleCount} résultat${visibleCount > 1 ? "s" : ""}`;
  }

  function updateActionButtons(value: string) {
    if (clearBtn) clearBtn.style.display = value ? "block" : "none";
    if (mode === "hide") {
      hideCounter?.classList.toggle("hidden", !value);
      counter?.parentElement?.classList.add("hidden");
    } else {
      hideCounter?.classList.add("hidden");
      counter?.parentElement?.classList.toggle("hidden", !value);
    }

    if (nextBtn) {
      const showNext = mode === "highlight" && value !== "" && currentMatches.length > 0;
      nextBtn.classList.toggle("hidden", !showNext);
    }
  }

  function scrollToMatch(index: number) {
    const el = currentMatches[index];
    if (!el) return;
    currentIndex = index;
    updateCounter(search?.value.toLowerCase().trim() ?? "");

    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function updateModeUI() {
    if (!modeHideBtn || !modeHighlightBtn) return;
    const base = "px-2 py-1 border rounded";
    const active = "bg-gray-900 text-white ring-2 ring-offset-2 ring-black";

    modeHideBtn.className = mode === "hide" ? `${base} ${active}` : base;
    modeHighlightBtn.className = mode === "highlight" ? `${base} ${active}` : base;
    modeHideBtn.setAttribute("aria-pressed", String(mode === "hide"));
    modeHighlightBtn.setAttribute("aria-pressed", String(mode === "highlight"));
  }

  function setMode(newMode: "hide" | "highlight") {
    mode = newMode;
    updateModeUI();
    applyFilter(search?.value ?? "");
    if (mode === "highlight" && currentMatches.length) {
      currentIndex = 0;
      requestAnimationFrame(() => scrollToMatch(0));
    }
  }

  // --- Init ---
  updateModeUI();
  applyFilter("");

  // --- Events ---
  modeHideBtn?.addEventListener("click", () => setMode("hide"));
  modeHighlightBtn?.addEventListener("click", () => setMode("highlight"));

  // Léger debounce pour éviter de recalculer le filtre à chaque keystroke sur une grosse liste.
  let debounceTimer: ReturnType<typeof setTimeout>;
  search?.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      applyFilter(search.value);
      if (mode === "highlight" && currentMatches.length) scrollToMatch(0);
    }, 120);
  });

  search?.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    if (mode === "highlight" && currentMatches.length) {
      currentIndex = (currentIndex + 1) % currentMatches.length;
      scrollToMatch(currentIndex);
    }
  });

  clearBtn?.addEventListener("click", () => {
    if (!search) return;
    search.value = "";
    applyFilter("");
    search.focus();
  });

  nextBtn?.addEventListener("click", () => {
    if (!currentMatches.length) return;
    currentIndex = (currentIndex + 1) % currentMatches.length;
    scrollToMatch(currentIndex);
  });

  // Au chargement de la page, vérification si un paramètre 'path' est présent dans l'URL
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabPath = urlParams.get("path");

    if (tabPath) {
      const targetLink = document.querySelector(
        `a[data-path="${CSS.escape(tabPath)}"]`
      ) as HTMLAnchorElement | null;

      if (targetLink) {
        const name = targetLink.dataset.originalName ?? targetLink.textContent ?? "";
        const extension = targetLink.dataset.extension ?? "";
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

        // Si c'est un PDF et qu'on est sur mobile, on ouvre directement l'onglet au lieu de la modal
        if (extension === "pdf" && isMobile) {
          window.open(tabPath, "_blank");
        } else {
          openTabModal(name, tabPath, extension);
          targetLink.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  });

  // --- Tab viewer modal ---
  const modal = document.getElementById("tab-modal") as HTMLElement | null;
  const modalTitle = document.getElementById("tab-modal-title") as HTMLElement | null;
  const modalClose = document.getElementById("tab-modal-close") as HTMLButtonElement | null;
  const modalOpenNewTab = document.getElementById("tab-open-new-tab") as HTMLAnchorElement | null;
  const loadingEl = document.getElementById("tab-loading") as HTMLElement | null;
  const imageContentEl = document.getElementById("tab-image-content") as HTMLImageElement | null;
  const fallbackEl = document.getElementById("tab-fallback") as HTMLElement | null;
  const zoomInBtn = document.getElementById("tab-zoom-in") as HTMLButtonElement | null;
  const zoomOutBtn = document.getElementById("tab-zoom-out") as HTMLButtonElement | null;
  const shareBtn = document.getElementById("tab-share") as HTMLButtonElement | null;

  const TEXT_EXTENSIONS = new Set(["txt", "md"]);
  const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "gif", "webp"]);
  const PDF_EXTENSIONS = new Set(["pdf"]);
  const MIN_FONT_SIZE = 10;
  const MAX_FONT_SIZE = 28;
  let textFontSize = 18;
  let currentTabPath = "";

  function resetModalContent() {
    loadingEl?.classList.remove("hidden");
    if (textEl) {
      textEl.classList.add("hidden");
      textEl.textContent = "";
    }
    if (imageContentEl) {
      imageContentEl.src = "";
      imageContentEl.classList.add("hidden");
    }
    if (pdfContainerEl) {
      pdfContainerEl.innerHTML = "";
      pdfContainerEl.classList.add("hidden");
    }
    fallbackEl?.classList.add("hidden");
  }

  function applyTextFontSize() {
    if (textEl) {
      textEl.style.fontSize = `${textFontSize}px`;
    }
  }

  async function openTabModal(name: string, path: string, extension: string) {
    if (!modal) return;
    // On mémorise le path de la tablature en cours
    currentTabPath = path;

    resetModalContent();
    if (modalTitle) modalTitle.textContent = name;
    if (modalOpenNewTab) modalOpenNewTab.href = path;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";

    let handled = true;

    // IMAGE
    if (TEXT_EXTENSIONS.has(extension)) {
      try {
        const res = await fetch(path);
        const text = await res.text();
        if (textEl) {
          textEl.classList.remove("hidden");
          textEl.textContent = text;
          applyTextFontSize();
        }
      } catch (err) {
        handled = false;
      }
    } else if (IMAGE_EXTENSIONS.has(extension)) {
      if (imageContentEl) {
        imageContentEl.src = path;
        imageContentEl.alt = `Aperçu de la tablature ${name}`;
        imageContentEl.classList.remove("hidden");
      }
    } else if (PDF_EXTENSIONS.has(extension)) {
      if (pdfContainerEl) {
        pdfContainerEl.classList.remove("hidden");
        pdfContainerEl.innerHTML = `
          <iframe src="${path}?v=${Date.now()}" class="w-full h-[80vh] border-0"></iframe>
        `;
      }
    } else {
      handled = false;
    }

    loadingEl?.classList.add("hidden");

    // IMPORTANT : fallback uniquement si rien n’a été affiché
    if (!handled) showFallback();
  }

  function showFallback() {
    loadingEl?.classList.add("hidden");
    if (textEl) textEl.classList.add("hidden");
    imageContentEl?.classList.add("hidden");
    fallbackEl?.classList.remove("hidden");
  }

  function closeTabModal() {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  document.getElementById("tab-library")?.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement).closest("a[data-path]") as HTMLAnchorElement | null;
    if (!link) return;

    const name = link.dataset.originalName ?? link.textContent ?? "";
    const path = link.dataset.path ?? "";
    const extension = link.dataset.extension ?? "";
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Comportement direct pour le PDF sur mobile
    if (extension === "pdf" && isMobile) {
      window.open(path, "_blank");
      e.preventDefault();
      return;
    }

    // Comportement modal classique pour le reste
    e.preventDefault();
    openTabModal(name, path, extension);
  });

  modalClose?.addEventListener("click", closeTabModal);

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeTabModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
      closeTabModal();
    }
  });

  shareBtn?.addEventListener("click", async () => {
    if (!currentTabPath) return;

    const shareUrl = `${window.location.origin}/tablatures?path=${encodeURIComponent(currentTabPath)}`;
    const title = modalTitle?.textContent ? `Tablature : ${modalTitle.textContent}` : "Tablature";

    // 1. Utilisation de l'API de partage native si disponible (Mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch (err) {}
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = "Copié ! ✓";
        shareBtn.classList.replace("text-[#0969da]", "text-green-600");

        setTimeout(() => {
          shareBtn.innerHTML = originalText;
          shareBtn.classList.replace("text-green-600", "text-[#0969da]");
        }, 2000);
      } catch (err) {
        console.error("Impossible de copier le lien : ", err);
      }
    }
  });

  zoomInBtn?.addEventListener("click", () => {
    textFontSize = Math.min(MAX_FONT_SIZE, textFontSize + 2);
    applyTextFontSize();
  });

  zoomOutBtn?.addEventListener("click", () => {
    textFontSize = Math.max(MIN_FONT_SIZE, textFontSize - 2);
    applyTextFontSize();
  });
}
