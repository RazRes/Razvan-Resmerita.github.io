import { Injectable, computed, signal } from '@angular/core';
import { CONTENT, LANGS, Lang } from './data/content';

const LANG_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class I18n {
  readonly langs = LANGS;
  readonly lang = signal<Lang>(this.initialLang());
  /** The full content bundle (interface text and CV data) for the current language. */
  readonly c = computed(() => CONTENT[this.lang()]);

  setLang(lang: Lang): void {
    this.lang.set(lang);
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* storage unavailable: the choice still applies for this visit */
    }
  }

  private initialLang(): Lang {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang;
    } catch {
      /* ignore */
    }
    const preferred = (typeof navigator === 'undefined' ? '' : navigator.language).slice(0, 2).toLowerCase();
    return (LANGS as readonly string[]).includes(preferred) ? (preferred as Lang) : 'en';
  }
}
