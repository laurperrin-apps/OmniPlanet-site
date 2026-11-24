(() => {
  const storageKey = 'omniplanet.website.language';
  const browserLanguage = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase();
  let saved = null;
  try { saved = localStorage.getItem(storageKey); } catch (_) {}
  const initial = saved === 'fr' || saved === 'en' ? saved : browserLanguage.startsWith('fr') ? 'fr' : 'en';
  function setLanguage(lang, persist = false) {
    document.documentElement.dataset.lang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === lang));
    });
    document.title = (lang === 'fr' ? document.body.dataset.titleFr : document.body.dataset.titleEn) || document.title;
    if (persist) { try { localStorage.setItem(storageKey, lang); } catch (_) {} }
  }
  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(initial);
    document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language, true)));
  });
})();
