export function getThemeScript() {
    return `
    (function () {
      try {
        var theme = localStorage.getItem('theme');
        if (!theme) {
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          theme = prefersDark ? 'dark' : 'light';
        }
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (_) {}
    })();
  `;
}
