/**
 * Language Preference Manager
 * Handles cookie-based storage of user language preference (en or it)
 */

(function() {
  const COOKIE_NAME = 'lang_preference';
  const COOKIE_DURATION_DAYS = 365; // 1 year

  /**
   * Set language preference in cookie and localStorage fallback
   * @param {string} lang - Language code ('en' or 'it')
   */
  function setLanguagePreference(lang) {
    // Set cookie
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_DURATION_DAYS);
    document.cookie = `${COOKIE_NAME}=${lang}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Strict`;
    
    // Fallback: localStorage
    try {
      localStorage.setItem(COOKIE_NAME, lang);
    } catch (e) {
      // localStorage may be disabled
      console.warn('localStorage unavailable');
    }
  }

  /**
   * Get language preference from cookie or localStorage
   * @returns {string|null} Language code ('en' or 'it') or null if not set
   */
  function getLanguagePreference() {
    // Try cookie first
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === COOKIE_NAME && value) {
        return value;
      }
    }
    
    // Try localStorage fallback
    try {
      return localStorage.getItem(COOKIE_NAME);
    } catch (e) {
      return null;
    }
  }

  /**
   * Redirect to preferred language page
   * @param {string} currentLang - Current page language ('en' or 'it')
   * @param {string} enUrl - URL of English page (relative)
   * @param {string} itUrl - URL of Italian page (relative)
   */
  function redirectToPreference(currentLang, enUrl, itUrl) {
    const preference = getLanguagePreference();
    
    // If preference exists and differs from current language, redirect
    if (preference && preference !== currentLang) {
      const targetUrl = preference === 'en' ? enUrl : itUrl;
      window.location.replace(targetUrl);
    }
  }

  /**
   * Setup language toggle links to set preference on click
   */
  function setupLanguageToggles() {
    // English link
    const enLink = document.querySelector('a[href*="index-en.html"]');
    if (enLink) {
      enLink.addEventListener('click', function(e) {
        setLanguagePreference('en');
      });
    }
    
    // Italian link
    const itLink = document.querySelector('a[href*="index-it.html"]');
    if (itLink) {
      itLink.addEventListener('click', function(e) {
        setLanguagePreference('it');
      });
    }
  }

  // Export to window
  window.LanguagePreference = {
    set: setLanguagePreference,
    get: getLanguagePreference,
    redirect: redirectToPreference,
    setupToggles: setupLanguageToggles
  };
})();
