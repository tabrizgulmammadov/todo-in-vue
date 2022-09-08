import { i18n } from "./i18n";

const Translations = {
  get defaultLocale() {
    return process.env.VUE_APP_I18N_LOCALE;
  },
  get supportedLocales() {
    return process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(",");
  },
  get currentLocale() {
    return i18n.locale;
  },
  set currentLocale(locale) {
    i18n.locale = locale;
  },
  getUserSupportedLocale() {
    const userPreferredLocale = Translations.getUserLocale();

    if (Translations.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale;
    }

    if (Translations.isLocaleSupported(userPreferredLocale.localeNoISO)) {
      return userPreferredLocale.localeNoISO;
    }
    return Translations.defaultlocale;
  },
  getUserLocale() {
    const locale =
      window.navigator.language ||
      window.navigator.userLanguage ||
      Translations.defaultLocale;
    return {
      locale: locale,
      localeNoISO: locale.split("-")[0],
    };
  },
  setI18nLocaleInServices(locale) {
    Translations.currentLocale = locale;
    document.querySelector("html").setAttribute("lang", locale);
    return locale;
  },
  changeLocale(locale) {
    if (!Translations.isLocaleSupported(locale))
      return Promise.reject(new Error("Locale not supported"));
    if (i18n.locale === locale) return Promise.resolve(locale);
    return Translations.loadLocaleFile(locale).then((msgs) => {
      localStorage.setItem("locale", locale);
      // this.$vuetify.lang.current = locale;
      i18n.setLocaleMessage(locale, msgs.default || msgs);
      return Translations.setI18nLocaleInServices(locale);
    });
  },
  loadLocaleFile(locale) {
    return import(`@/locales/${locale}.json`);
  },
  isLocaleSupported(locale) {
    return Translations.supportedLocales.includes(locale);
  },
  routeMiddleware(to, from, next) {
    const locale = localStorage.getItem("locale")
      ? localStorage.getItem("locale")
      : process.env.VUE_APP_I18N_LOCALE;
    if (!Translations.isLocaleSupported(locale))
      return next(Translations.getUserSupportedLocale());
    return Translations.changeLocale(locale).then(() => next());
  },
};

export { Translations };
