export function getThemeScript() {
    return `
    (function () {
      try {
        let theme = localStorage.getItem('theme');
        if (!theme) {
          let prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
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
