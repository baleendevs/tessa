import { THEME_STORAGE_KEY } from "@/lib/theme";

const bootstrapSource = `
(function () {
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var preference = null;
  try {
    var stored = window.localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    preference = stored === "light" || stored === "dark" ? stored : null;
    if (stored !== null && preference === null) {
      window.localStorage.removeItem(${JSON.stringify(THEME_STORAGE_KEY)});
    }
  } catch (_) {}

  var resolved = preference || (media.matches ? "dark" : "light");
  root.dataset.theme = resolved;
  if (preference) {
    root.dataset.themePreference = preference;
  } else {
    delete root.dataset.themePreference;
  }
  root.style.colorScheme = resolved;
  var themeColour = document.querySelector('meta[name="theme-color"]');
  if (themeColour) {
    themeColour.setAttribute("content", resolved === "dark" ? "#151515" : "#f7f9fb");
  }
  root.dataset.themeReady = "true";
})();`;

export function ThemeBootstrap() {
  return (
    <script
      id="tessa-theme-bootstrap"
      dangerouslySetInnerHTML={{ __html: bootstrapSource }}
    />
  );
}
