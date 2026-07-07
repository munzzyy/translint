"use strict";

(function () {
  var STORAGE_KEY = "translint-theme";
  var THEMES = [
    "editor-dark", "editor-light", "terminal-green",
    "solarized-dark", "solarized-light", "high-contrast",
    "gruvbox", "nord", "monokai"
  ];

  var root = document.documentElement;
  var select = document.getElementById("theme-select");
  var metaThemeColor = document.querySelector('meta[name="theme-color"]');

  function readStored() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function writeStored(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (err) {
      /* localStorage unavailable (private browsing, disabled storage) -
         the theme still applies for this page load, it just won't persist. */
    }
  }

  function syncThemeColorMeta() {
    if (!metaThemeColor) return;
    var bg = getComputedStyle(root).getPropertyValue("--bg").trim();
    if (bg) metaThemeColor.setAttribute("content", bg);
  }

  function applyTheme(value) {
    if (value === "auto" || THEMES.indexOf(value) === -1) {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", value);
    }
    syncThemeColorMeta();
  }

  var stored = readStored();
  var initial = stored === "auto" || THEMES.indexOf(stored) !== -1 ? stored : "auto";

  // The inline bootstrap script in <head> already applied a stored non-auto
  // theme before first paint (avoids a flash of the wrong theme). This call
  // is idempotent - it brings the <select> and the theme-color meta tag in
  // sync, and is also the fallback path if the bootstrap script didn't run
  // for any reason (e.g. its CSP hash mismatched a future copy-paste edit).
  applyTheme(initial);

  if (select) {
    select.value = initial;
    select.addEventListener("change", function () {
      applyTheme(select.value);
      writeStored(select.value);
    });
  }
})();
