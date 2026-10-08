import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PROFILE } from '../data/cv.data';
import { Icon } from './icon';

@Component({
  selector: 'app-hero',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero container" id="top">
      <div class="intro">
        <p class="eyebrow">
          <span class="dot"></span> {{ profile.title }} · Angular since {{ profile.since }}
        </p>
        <h1>
          Hi, I'm {{ firstName }}.<br />
          <span class="accent">I build web apps with Angular.</span>
        </h1>
        <p class="lead">
          {{ profile.title }} since {{ profile.since }}, now expanding into Power Platform and
          Dynamics 365, with AI and LLM tools built into my everyday workflow.
        </p>
        <p class="meta"><app-icon name="pin" [size]="16" /> {{ profile.location }}</p>
        <div class="actions">
          <a class="btn primary" [href]="profile.cv" download>
            <app-icon name="download" /> Download CV
          </a>
          <a class="btn" [href]="profile.links.github" target="_blank" rel="noopener">
            <app-icon name="github" /> GitHub
          </a>
          <a class="btn" [href]="profile.links.linkedin" target="_blank" rel="noopener">
            <app-icon name="linkedin" /> LinkedIn
          </a>
        </div>
      </div>

      <div class="visual">
        @if (profile.photo && !photoFailed()) {
          <img
            class="photo"
            [src]="profile.photo"
            [alt]="'Photo of ' + profile.name"
            width="280"
            height="280"
            (error)="photoFailed.set(true)"
          />
        } @else {
          <div class="photo initials">{{ profile.initials }}</div>
        }
        <div class="stat stat-years">
          <strong>{{ years }}+</strong>
          <span>years with Angular</span>
        </div>
        <div class="stat stat-app">
          <strong>1</strong>
          <span>app live on the App Store</span>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 48px;
      align-items: center;
      padding: 140px 0 80px;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--muted);
      background: var(--surface);
      border: 1px solid var(--line);
      padding: 6px 14px;
      border-radius: 999px;
      margin-bottom: 22px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #2fb36d;
      box-shadow: 0 0 0 4px rgba(47, 179, 109, 0.18);
    }
    h1 {
      font-size: clamp(2.3rem, 5.4vw, 3.7rem);
      letter-spacing: -0.02em;
      margin-bottom: 20px;
    }
    .accent {
      color: var(--accent);
    }
    .lead {
      font-size: 1.12rem;
      color: var(--muted);
      max-width: 560px;
      margin-bottom: 14px;
    }
    .meta {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--muted);
      font-size: 0.92rem;
      margin-bottom: 28px;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .visual {
      position: relative;
      justify-self: center;
      width: min(320px, 100%);
      aspect-ratio: 1;
    }
    .photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 32% 68% 55% 45% / 45% 40% 60% 55%;
      border: 6px solid var(--surface);
      box-shadow: var(--shadow);
      background: var(--navy);
    }
    .initials {
      display: grid;
      place-items: center;
      font-family: var(--font-display);
      font-size: 5rem;
      font-weight: 700;
      color: #ffb347;
    }
    .stat {
      position: absolute;
      display: flex;
      flex-direction: column;
      background: var(--surface);
      border: 1px solid var(--line);
      box-shadow: var(--shadow);
      border-radius: 14px;
      padding: 10px 14px;
      line-height: 1.2;
      strong {
        font-family: var(--font-display);
        font-size: 1.5rem;
        color: var(--accent);
      }
      span {
        font-size: 0.78rem;
        color: var(--muted);
        max-width: 110px;
      }
    }
    .stat-years {
      left: -24px;
      bottom: 28px;
    }
    .stat-app {
      right: -18px;
      top: 18px;
    }
    @media (max-width: 820px) {
      .hero {
        grid-template-columns: 1fr;
        padding: 112px 0 56px;
        gap: 40px;
      }
      .visual {
        width: min(240px, 70%);
        order: -1;
      }
      .stat-years {
        left: -36px;
      }
      .stat-app {
        right: -36px;
      }
    }
  `,
})
export class Hero {
  protected readonly profile = PROFILE;
  protected readonly firstName = PROFILE.name.split(' ')[0];
  protected readonly years = new Date().getFullYear() - PROFILE.since - 1;
  protected readonly photoFailed = signal(false);
}
