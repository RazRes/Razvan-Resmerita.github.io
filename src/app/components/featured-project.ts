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
        <div class="top">
          <span class="badge"><span class="live"></span>{{ project().status }}</span>
          <span class="role">{{ project().role }}</span>
        </div>
        <h3>{{ project().name }}</h3>
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
      <div class="art" aria-hidden="true">
        <div class="phone">
          <div class="notch"></div>
          <img class="screen" [src]="project().image" alt="" />
        </div>
      </div>
    </article>
  `,
  styles: `
    .card {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 24px;
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    .body {
      padding: 40px;
    }
    .top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 999px;
      background: var(--accent-soft);
      color: var(--accent);
    }
    .live {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #2fb36d;
    }
    .role {
      font-size: 0.85rem;
      color: var(--muted);
    }
    h3 {
      font-size: 2rem;
      margin-bottom: 12px;
    }
    .summary {
      color: var(--muted);
      margin-bottom: 18px;
    }
    ul {
      list-style: none;
      display: grid;
      gap: 8px;
      margin-bottom: 20px;
    }
    li {
      position: relative;
      padding-left: 22px;
      &::before {
        content: '';
        position: absolute;
        left: 2px;
        top: 0.65em;
        width: 8px;
        height: 8px;
        border-radius: 2px;
        background: var(--accent);
        transform: rotate(45deg);
      }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 26px;
    }
    .art {
      display: grid;
      place-items: center;
      padding: 32px;
      background:
        radial-gradient(circle at 30% 20%, rgba(255, 179, 71, 0.35), transparent 55%),
        linear-gradient(150deg, #14213d, #22345e);
    }
    .phone {
      width: 190px;
      height: 376px;
      border-radius: 32px;
      background: #0b1120;
      padding: 26px 10px 10px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
      position: relative;
      transform: rotate(-4deg);
    }
    .notch {
      position: absolute;
      top: 9px;
      left: 50%;
      width: 56px;
      height: 10px;
      border-radius: 10px;
      background: #1c2640;
      transform: translateX(-50%);
    }
    .screen {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 24px;
      object-fit: cover;
      object-position: top;
      background: #060a0c;
    }
    @media (max-width: 820px) {
      .card {
        grid-template-columns: 1fr;
      }
      .body {
        padding: 28px 22px;
      }
      .art {
        order: -1;
        padding: 28px;
      }
      .phone {
        width: 150px;
        height: 296px;
      }
    }
  `,
})
export class FeaturedProject {
  readonly project = input.required<Project>();
}
