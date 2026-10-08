import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fmt } from './data/content';
import { I18n } from './i18n';
import { Hero } from './components/hero';
import { FeaturedProject } from './components/featured-project';
import { MoreProjects } from './components/more-projects';
import { ContactForm } from './components/contact-form';
import { Experience } from './components/experience';
import { Skills } from './components/skills';
import { Icon } from './components/icon';

type Theme = 'light' | 'dark';
const THEME_KEY = 'theme';

@Component({
  selector: 'app-root',
  imports: [Hero, FeaturedProject, MoreProjects, ContactForm, Experience, Skills, Icon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly document = inject(DOCUMENT);

  protected readonly i18n = inject(I18n);
  protected readonly c = this.i18n.c;
  protected readonly ui = computed(() => this.c().ui);
  protected readonly profile = computed(() => this.c().profile);
  protected readonly year = new Date().getFullYear();

  protected readonly nav = computed(() => {
    const labels = this.ui().nav;
    return [
      { id: 'about', label: labels.about },
      { id: 'project', label: labels.project },
      { id: 'experience', label: labels.experience },
      { id: 'skills', label: labels.skills },
      { id: 'contact', label: labels.contact },
    ];
  });

  protected readonly activeSection = signal('');
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly theme = signal<Theme>(this.initialTheme());

  constructor() {
    effect(() => {
      this.document.documentElement.lang = this.i18n.lang();
    });

    effect(() => {
      const theme = this.theme();
      this.document.documentElement.dataset['theme'] = theme;
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch {
        /* storage unavailable: theme still applies for this visit */
      }
    });

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.activeSection.set(entry.target.id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      this.nav().forEach(({ id }) => {
        const el = this.document.getElementById(id);
        if (el) observer.observe(el);
      });

      const onScroll = () => this.scrolled.set(window.scrollY > 12);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      destroyRef.onDestroy(() => {
        observer.disconnect();
        window.removeEventListener('scroll', onScroll);
      });
    });
  }

  protected toggleTheme(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  /** Smooth-scroll to a section without writing `#id` into the address bar. */
  protected goTo(id: string, event: Event): void {
    event.preventDefault();
    this.menuOpen.set(false);
    const el = this.document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ block: 'start' });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected dots(n: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < n);
  }

  protected outOf(n: number): string {
    return fmt(this.ui().outOf, { n });
  }

  private initialTheme(): Theme {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      /* ignore */
    }
    return 'dark';
  }
}
