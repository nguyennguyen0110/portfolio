// static/js/main.js

// =========================
// Theme handling
// =========================

const THEME_KEY = "theme";

function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || "system";
}

function shouldUseDark(mode) {
    if (mode === "dark") return true;
    if (mode === "light") return false;

    // mode === "system"
    if (window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false; // default to light if no info
}

function applyTheme(mode) {
    if (shouldUseDark(mode)) {
        document.documentElement.classList.add("dark-mode");
    } else {
        document.documentElement.classList.remove("dark-mode");
    }
}

// Apply theme as soon as script loads
(function initTheme() {
    const mode = getStoredTheme();
    applyTheme(mode);
})();

// =========================
// Language handling
// =========================

// Supported languages and URL prefixes
// Extend here in the future, e.g. add "ja": "/ja"
const SUPPORTED_LANGS = ["en", "vi"];
const DEFAULT_LANG = "en";

const LANG_PREFIX = {
    en: "",
    vi: "/vi"
    // ja: "/ja"
};

function getCurrentLanguageFromPath(pathname) {
    // Check for each non-empty prefix
    for (const lang of SUPPORTED_LANGS) {
        const prefix = LANG_PREFIX[lang];
        if (!prefix) continue; // skip default (English) here

        if (pathname === prefix || pathname.startsWith(prefix + "/")) {
            return lang;
        }
    }
    return DEFAULT_LANG;
}

function stripCurrentPrefix(pathname) {
    for (const lang of SUPPORTED_LANGS) {
        const prefix = LANG_PREFIX[lang];
        if (!prefix) continue;

        if (pathname === prefix) {
            return "/";
        }
        if (pathname.startsWith(prefix + "/")) {
            return pathname.slice(prefix.length) || "/";
        }
    }
    // No known prefix -> keep as is
    return pathname || "/";
}

function buildPathForLanguage(targetLang, currentPathname) {
    let basePath = stripCurrentPrefix(currentPathname);

    if (!basePath.startsWith("/")) {
        basePath = "/" + basePath;
    }
    if (basePath === "") {
        basePath = "/";
    }

    const prefix = LANG_PREFIX[targetLang] || "";
    if (!prefix) {
        // Default language: no prefix
        return basePath;
    }

    if (basePath === "/") {
        return prefix; // e.g. "/vi"
    }
    return prefix + basePath; // e.g. "/vi/about"
}

// =========================
// DOM wiring
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.getElementById("theme-select");
    const languageSelect = document.getElementById("language-select");
    const languageLabel = document.getElementById("language-label");

    // ----- Theme select -----
    if (themeSelect) {
        const stored = getStoredTheme();
        themeSelect.value = stored;
        applyTheme(stored);

        themeSelect.addEventListener("change", () => {
            const mode = themeSelect.value;
            localStorage.setItem(THEME_KEY, mode);
            applyTheme(mode);
        });

        // Live update in "system" mode when OS theme changes
        if (window.matchMedia) {
            const media = window.matchMedia("(prefers-color-scheme: dark)");

            if (media.addEventListener) {
                media.addEventListener("change", () => {
                    const current = getStoredTheme();
                    if (current === "system") {
                        applyTheme("system");
                    }
                });
            } else if (media.addListener) {
                // Older browsers
                media.addListener(() => {
                    const current = getStoredTheme();
                    if (current === "system") {
                        applyTheme("system");
                    }
                });
            }
        }
    }

    // ----- Language select -----
    if (languageSelect) {
        const currentPath = window.location.pathname;
        const currentLang = getCurrentLanguageFromPath(currentPath);

        // If currentLang isn't in SUPPORTED_LANGS (just in case), fall back
        languageSelect.value = SUPPORTED_LANGS.includes(currentLang)
            ? currentLang
            : DEFAULT_LANG;

        languageSelect.addEventListener("change", () => {
            const targetLang = languageSelect.value;
            const url = new URL(window.location.href);
            url.pathname = buildPathForLanguage(targetLang, url.pathname);
            window.location.href = url.toString(); // preserves ?query and #hash
        });
    }

    // ----- Rotating label text -----
    if (languageLabel) {
        // Ready for more entries later (e.g. "言語")
        const texts = ["Language", "Ngôn ngữ"];
        if (texts.length > 0) {
            let index = 0;
            languageLabel.textContent = "🌐 " + texts[index];

            setInterval(() => {
                index = (index + 1) % texts.length;
                languageLabel.textContent = "🌐 " + texts[index];
            }, 1000);  // 1s
        }
    }
});
