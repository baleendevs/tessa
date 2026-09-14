import { THEME_STORAGE_KEY, themeColours } from "@/lib/theme";

const bootstrapSource = `
(function () {
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var preference = null;
  var themeColours = ${JSON.stringify(themeColours)};

  function updateScreenshots(theme) {
    var sources = document.querySelectorAll(
      "[data-theme-screenshot] source[data-theme-dark]"
    );
    for (var index = 0; index < sources.length; index += 1) {
      sources[index].media = theme === "dark" ? "all" : "not all";
    }
  }

  function applyTheme(nextPreference) {
    var resolved = nextPreference || (media.matches ? "dark" : "light");
    root.dataset.theme = resolved;
    if (nextPreference) {
      root.dataset.themePreference = nextPreference;
    } else {
      delete root.dataset.themePreference;
    }
    root.style.colorScheme = resolved;
    var themeColour = document.querySelector('meta[name="theme-color"]');
    if (themeColour) {
      themeColour.setAttribute("content", themeColours[resolved]);
    }
    updateScreenshots(resolved);
    root.dataset.themeReady = "true";
  }

  try {
    var stored = window.localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    preference = stored === "light" || stored === "dark" ? stored : null;
    if (stored !== null && preference === null) {
      window.localStorage.removeItem(${JSON.stringify(THEME_STORAGE_KEY)});
    }
  } catch (_) {}

  applyTheme(preference);

  function handleSystemThemeChange() {
    if (preference === null) {
      applyTheme(null);
    }
  }

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", handleSystemThemeChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(handleSystemThemeChange);
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || target.nodeType !== 1 || !target.closest("[data-theme-toggle]")) {
      return;
    }

    var current = root.dataset.theme === "dark" ? "dark" : "light";
    preference = current === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(${JSON.stringify(THEME_STORAGE_KEY)}, preference);
    } catch (_) {}
    applyTheme(preference);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyTheme(preference);
    }, { once: true });
  } else {
    applyTheme(preference);
  }
})();`;

export function ThemeBootstrap() {
  return (
    <script
      id="tessa-theme-bootstrap"
      dangerouslySetInnerHTML={{ __html: bootstrapSource }}
    />
  );
}
