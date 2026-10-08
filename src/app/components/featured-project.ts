import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../data/cv.data';
import { Icon } from './icon';

@Component({
  selector: 'app-featured-project',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="card">
      <div class="body">
        <p class="eyebrow-label">{{ project().status }}</p>
        <h3>{{ project().name }}</h3>
        <p class="role">{{ project().role }}</p>
        <p class="summary">{{ project().summary }}</p>
        <ul>
          @for (item of project().highlights; track item) {
            <li>{{ item }}</li>
          }
        </ul>
        <div class="tags">
          @for (tag of project().tags; track tag) {
            <span class="chip">{{ tag }}</span>
          }
        </div>
        <a class="btn primary" [href]="project().url" target="_blank" rel="noopener">
          Visit the live app <app-icon name="external" [size]="16" />
        </a>
      </div>
      <div class="art">
        <span class="ring outer" aria-hidden="true"></span>
        <span class="ring inner" aria-hidden="true"></span>
        <span class="node" aria-hidden="true"></span>
        <img
          class="screen"
          [src]="project().image"
          [alt]="project().name + ' on a phone: header, hero and the tab bar'"
          width="540"
          height="1080"
        />
      </div>
    </article>
  `,
  styles: `
    .card {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: 56px;
      align-items: center;
    }
    h3 {
      font-family: var(--font-display);
      font-weight: 500;
      font-size: clamp(1.9rem, 4.4vw, 3.2rem);
      letter-spacing: -0.02em;
      line-height: 1.05;
      margin: 18px 0 8px;
    }
    .role {
      font-size: 0.9rem;
      color: var(--muted);
      margin-bottom: 20px;
    }
    .summary {
      font-size: 1.15rem;
      color: var(--text);
      margin-bottom: 24px;
    }
    ul {
      list-style: none;
      margin-bottom: 24px;
      color: var(--muted);
    }
    li {
      display: flex;
      gap: 14px;
      padding: 12px 0;
      border-top: 1px solid var(--line);
      &:last-child {
        border-bottom: 1px solid var(--line);
      }
      &::before {
        content: '';
        flex: 0 0 7px;
        height: 7px;
        margin-top: 0.62em;
        border-radius: 50%;
        background: var(--accent);
      }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 28px;
    }
    .art {
      position: relative;
      display: grid;
      place-items: center;
      width: min(440px, 100%);
      aspect-ratio: 1;
      justify-self: center;
    }
    .ring {
      position: absolute;
      border: 1px solid var(--line);
      border-radius: 50%;
      &.outer {
        inset: 0;
      }
      &.inner {
        inset: 11%;
      }
    }
    .node {
      position: absolute;
      top: 13%;
      right: 13%;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--accent);
    }
    .screen {
      position: relative;
      width: 44%;
      height: auto;
      border-radius: 24px;
      border: 1px solid var(--line);
    }
    @media (max-width: 820px) {
      .card {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .art {
        order: -1;
      }
    }
  `,
})
export class FeaturedProject {
  readonly project = input.required<Project>();
}
