import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PROFILE } from '../data/cv.data';
import { Icon } from './icon';

@Component({
  selector: 'app-hero',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero container" id="top">
      <div class="orbit">
        <svg viewBox="0 0 620 620" aria-hidden="true" focusable="false">
          <circle class="ring" cx="310" cy="310" r="140" />
          <circle class="ring" cx="310" cy="310" r="190" />
          <circle class="ring" cx="310" cy="310" r="245" />
          <circle class="ring" cx="310" cy="310" r="300" />
          <g class="spin">
            <circle class="arc" cx="310" cy="310" r="245" />
            <circle class="node accent" cx="425" cy="172" r="6" />
          </g>
          <g class="spin reverse">
            <circle class="node" cx="84" cy="228" r="4" />
            <circle class="node" cx="556" cy="482" r="5" />
          </g>
        </svg>
        @if (profile.photo && !photoFailed()) {
          <img
            class="photo"
            [src]="profile.photo"
            [alt]="'Photo of ' + profile.name"
            width="213"
            height="213"
            (error)="photoFailed.set(true)"
          />
        } @else {
          <div class="photo initials">{{ profile.initials }}</div>
        }
      </div>

      <p class="eyebrow-label">{{ profile.title }} · {{ city }}</p>
      <h1>{{ profile.name }}</h1>
      <p class="lead">
        Building with Angular and TypeScript since {{ profile.since }}, now working across Power
        Platform and Dynamics 365, with AI and LLM tools built into my everyday workflow.
      </p>
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
    </section>
  `,
  styles: `
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 100px 0 96px;
    }
    .orbit {
      position: relative;
      display: grid;
      place-items: center;
      width: min(560px, 100%);
      aspect-ratio: 1;
      margin-bottom: 16px;
      svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
    }
    .ring {
      fill: none;
      stroke: var(--line);
      stroke-width: 1;
    }
    .arc {
      fill: none;
      stroke: var(--accent);
      stroke-width: 3;
      stroke-dasharray: 230 1310;
      transform: rotate(-35deg);
      transform-origin: 310px 310px;
    }
    .node {
      fill: var(--text);
      &.accent {
        fill: var(--accent);
      }
    }
    .spin {
      transform-origin: 310px 310px;
      animation: spin 80s linear infinite;
    }
    .reverse {
      animation-direction: reverse;
      animation-duration: 120s;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    .photo {
      position: relative;
      width: 38%;
      height: auto;
      aspect-ratio: 1;
      border-radius: 50%;
      object-fit: cover;
      background: var(--surface-2);
    }
    .initials {
      display: grid;
      place-items: center;
      font-family: var(--font-display);
      font-size: 3rem;
      color: var(--accent);
    }
    h1 {
      font-size: clamp(2.1rem, 6.2vw, 4.75rem);
      margin: 20px 0 24px;
    }
    .lead {
      font-size: 1.15rem;
      color: var(--muted);
      max-width: 580px;
      margin-bottom: 36px;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
    }
  `,
})
export class Hero {
  protected readonly profile = PROFILE;
  protected readonly city = PROFILE.location.split(',')[0];
  protected readonly photoFailed = signal(false);
}
