import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EDUCATION, EXPERIENCE, FEATURED_PROJECT, LANGUAGES, PROFILE, SKILLS } from './data/cv.data';
import { Hero } from './components/hero';
import { FeaturedProject } from './components/featured-project';
import { Experience } from './components/experience';
import { Skills } from './components/skills';
import { Icon } from './components/icon';

type Theme = 'light' | 'dark';
const THEME_KEY = 'theme';

@Component({
  selector: 'app-root',
  imports: [Hero, FeaturedProject, Experience, Skills, Icon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly document = inject(DOCUMENT);

  protected readonly profile = PROFILE;
  protected readonly project = FEATURED_PROJECT;
  protected readonly experience = EXPERIENCE;
  protected readonly skills = SKILLS;
  protected readonly education = EDUCATION;
  protected readonly languages = LANGUAGES;
  protected readonly year = new Date().getFullYear();

  protected readonly nav = [
    { id: 'about', label: 'About' },
    { id: 'project', label: 'Project' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  protected readonly activeSection = signal('');
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly theme = signal<Theme>(this.initialTheme());

  constructor() {
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
      this.nav.forEach(({ id }) => {
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

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected dots(n: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < n);
  }

  private initialTheme(): Theme {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      /* ignore */
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
