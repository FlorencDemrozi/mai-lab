/**
 * Interface strings only (buttons, labels, headings that are part of the site chrome).
 * Lab facts and descriptions belong in src/content/, not here.
 * Norwegian strings were drafted by Claude and need review by a native speaker.
 */
export const LOCALES = ['en', 'no'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** BCP 47 tags for <html lang> and hreflang. */
export const LANG_TAG: Record<Locale, string> = { en: 'en', no: 'nb' };

const en = {
  'site.skip': 'Skip to content',
  'nav.lab': 'The lab',
  'nav.equipment': 'Equipment',
  'nav.applications': 'Applications',
  'nav.researchers': 'Researchers',
  'nav.about': 'About',
  'nav.collaborate': 'Collaborate',
  'nav.menu': 'Menu',
  'nav.primary': 'Main',
  'lang.switch': 'Norsk',
  'lang.switchLabel': 'Les på norsk',
  'theme.toggle': 'Switch colour theme',
  'theme.light': 'Light',
  'theme.dark': 'Dark',

  'status.installed': 'Installed',
  'status.acquiring': 'Being acquired',
  'status.planned': 'Planned',
  'status.retired': 'Retired',
  'status.expected': 'expected',
  'status.unconfirmed': 'Unconfirmed',
  'status.unconfirmedHint': 'Details on this page are not yet confirmed.',

  'sync.hardware': 'Hardware sync',
  'sync.software': 'Software sync',
  'sync.none': 'No sync',
  'sync.unknown': 'Sync not specified',

  'device.modalities': 'Modalities',
  'device.applications': 'Applications',
  'device.researchers': 'Responsible researchers',
  'device.specs': 'Key specifications',
  'device.manufacturer': 'Manufacturer',
  'device.model': 'Model',
  'device.quantity': 'Quantity',
  'device.sync': 'Synchronization',
  'device.acquired': 'Acquired',
  'device.booking': 'Booking',
  'device.projects': 'Projects',
  'device.publications': 'Publications',
  'device.more': 'More details',

  'catalogue.title': 'Equipment',
  'catalogue.description': 'Every system in the lab, with its status and the people responsible for it.',
  'catalogue.name': 'Device',
  'catalogue.modality': 'Modality',
  'catalogue.status': 'Status',
  'catalogue.contact': 'Contact',

  'researchers.title': 'Researchers',
  'researchers.description': 'The people behind the lab: their expertise and how to reach them.',
  'researcher.devices': 'Responsible for',
  'researcher.applications': 'Applications',
  'researcher.expertise': 'Expertise',
  'researcher.profile': 'UiS profile',
  'researcher.orcid': 'ORCID',
  'researcher.email': 'Email',
  'researcher.emailTo': 'Email {name}',
  'researcher.none': 'No equipment listed yet.',

  'applications.title': 'Applications',
  'applications.description': 'What the lab is used for, and which systems each application draws on.',
  'application.devices': 'Systems used',
  'application.researchers': 'Researchers involved',

  'modalities.title': 'Modalities',
  'modality.devices': 'Systems',
  'count.installed': '{n} installed',
  'count.acquiring': '{n} being acquired',
  'count.planned': '{n} planned',
  'count.none': 'No systems yet',

  'home.wip': 'This site is being rebuilt. The interactive lab is coming soon; everything below is already generated from the lab’s content files.',
  'home.explore': 'Explore the equipment',

  'footer.contact': 'Contact',
  'footer.visit': 'Visit',
  'footer.accessibility': 'Accessibility statement',
  'footer.privacy': 'This site uses no cookies and no tracking.',

  'notfound.title': 'Page not found',
  'notfound.body': 'This page does not exist, or has moved.',
  'notfound.home': 'Go to the home page',
} as const;

export type UiKey = keyof typeof en;

const no: Partial<Record<UiKey, string>> = {
  'site.skip': 'Hopp til innhold',
  'nav.lab': 'Laben',
  'nav.equipment': 'Utstyr',
  'nav.applications': 'Bruksområder',
  'nav.researchers': 'Forskere',
  'nav.about': 'Om',
  'nav.collaborate': 'Samarbeid',
  'nav.menu': 'Meny',
  'nav.primary': 'Hovedmeny',
  'lang.switch': 'English',
  'lang.switchLabel': 'Read in English',
  'theme.toggle': 'Bytt fargetema',
  'theme.light': 'Lyst',
  'theme.dark': 'Mørkt',

  'status.installed': 'Installert',
  'status.acquiring': 'Under anskaffelse',
  'status.planned': 'Planlagt',
  'status.retired': 'Utfaset',
  'status.expected': 'forventet',
  'status.unconfirmed': 'Ikke bekreftet',
  'status.unconfirmedHint': 'Opplysningene på denne siden er ikke bekreftet ennå.',

  'sync.hardware': 'Maskinvaresynkronisering',
  'sync.software': 'Programvaresynkronisering',
  'sync.none': 'Ingen synkronisering',
  'sync.unknown': 'Synkronisering ikke oppgitt',

  'device.modalities': 'Modaliteter',
  'device.applications': 'Bruksområder',
  'device.researchers': 'Ansvarlige forskere',
  'device.specs': 'Nøkkeldata',
  'device.manufacturer': 'Produsent',
  'device.model': 'Modell',
  'device.quantity': 'Antall',
  'device.sync': 'Synkronisering',
  'device.acquired': 'Anskaffet',
  'device.booking': 'Booking',
  'device.projects': 'Prosjekter',
  'device.publications': 'Publikasjoner',
  'device.more': 'Mer informasjon',

  'catalogue.title': 'Utstyr',
  'catalogue.description': 'Alle systemene i laben, med status og hvem som er ansvarlig.',
  'catalogue.name': 'Utstyr',
  'catalogue.modality': 'Modalitet',
  'catalogue.status': 'Status',
  'catalogue.contact': 'Kontakt',

  'researchers.title': 'Forskere',
  'researchers.description': 'Menneskene bak laben: fagfelt og kontaktinformasjon.',
  'researcher.devices': 'Ansvarlig for',
  'researcher.applications': 'Bruksområder',
  'researcher.expertise': 'Fagfelt',
  'researcher.profile': 'Profil på uis.no',
  'researcher.orcid': 'ORCID',
  'researcher.email': 'E-post',
  'researcher.emailTo': 'Send e-post til {name}',
  'researcher.none': 'Ingen utstyr registrert ennå.',

  'applications.title': 'Bruksområder',
  'applications.description': 'Hva laben brukes til, og hvilke systemer hvert bruksområde bygger på.',
  'application.devices': 'Systemer som brukes',
  'application.researchers': 'Forskere',

  'modalities.title': 'Modaliteter',
  'modality.devices': 'Systemer',
  'count.installed': '{n} installert',
  'count.acquiring': '{n} under anskaffelse',
  'count.planned': '{n} planlagt',
  'count.none': 'Ingen systemer ennå',

  'home.wip': 'Nettstedet bygges om. Den interaktive laben kommer snart; alt nedenfor er allerede generert fra labens innholdsfiler.',
  'home.explore': 'Se utstyret',

  'footer.contact': 'Kontakt',
  'footer.visit': 'Besøk',
  'footer.accessibility': 'Tilgjengelighetserklæring',
  'footer.privacy': 'Nettstedet bruker ingen informasjonskapsler og ingen sporing.',

  'notfound.title': 'Fant ikke siden',
  'notfound.body': 'Siden finnes ikke, eller den er flyttet.',
  'notfound.home': 'Gå til forsiden',
};

const dict: Record<Locale, Partial<Record<UiKey, string>>> = { en, no };

/** Translator for one locale. Missing Norwegian strings fall back to English. */
export function useT(locale: Locale) {
  return (key: UiKey, vars: Record<string, string | number> = {}) => {
    let s = dict[locale][key] ?? en[key];
    for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
    return s;
  };
}

/** Pick the right language from a content field `{ en, no? }`, falling back to English. */
export function pick(field: { en: string; no?: string } | undefined, locale: Locale): string {
  if (!field) return '';
  return (locale === 'no' && field.no) || field.en;
}

/** Route param for `[...locale]` pages: English lives at the root, Norwegian under /no/. */
export function localeParam(locale: Locale): string | undefined {
  return locale === DEFAULT_LOCALE ? undefined : locale;
}

export function toLocale(param: string | undefined): Locale {
  return param === 'no' ? 'no' : 'en';
}

/** Internal link with the deploy base path, locale prefix and trailing slash. */
export function href(locale: Locale, ...segments: string[]): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const parts = [locale === DEFAULT_LOCALE ? '' : locale, ...segments].filter(Boolean);
  return `${base}/${parts.join('/')}${parts.length ? '/' : ''}`;
}

/** Static paths for every locale, for pages without other params. */
export function localePaths() {
  return LOCALES.map((locale) => ({ params: { locale: localeParam(locale) }, props: { locale } }));
}
