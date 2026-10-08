import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MoreProject } from '../data/cv.data';
import { I18n } from '../i18n';
import { Icon } from './icon';

@Component({
  selector: 'app-more-projects',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3 class="eyebrow-label">{{ ui().moreTitle }}</h3>
    <ul class="grid">
      @for (p of projects(); track p.name) {
        <li class="card">
          <div class="head">
            <h4>{{ p.name }}</h4>
            <span class="year">{{ p.year }}</span>
          </div>
          <p class="desc">{{ p.description }}</p>
          <div class="stack">
            @for (t of p.stack; track t) {
              <span class="chip">{{ t }}</span>
            }
          </div>
          <a class="link" [href]="p.url" target="_blank" rel="noopener">
            {{ ui().viewOnGithub }} <app-icon name="external" [size]="14" />
          </a>
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: block;
      margin-top: 72px;
    }
    h3 {
      margin-bottom: 20px;
    }
    .grid {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 22px;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      transition: border-color 0.15s ease;
      &:hover {
        border-color: var(--accent);
      }
    }
    .head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }
    h4 {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 700;
    }
    .year {
      font-size: 0.82rem;
      color: var(--muted);
    }
    .desc {
      color: var(--muted);
      font-size: 0.95rem;
    }
    .stack {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: auto;
      padding-top: 4px;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--accent);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        text-underline-offset: 4px;
      }
    }
  `,
})
export class MoreProjects {
  readonly projects = input.required<MoreProject[]>();
  private readonly i18n = inject(I18n);
  protected readonly ui = computed(() => this.i18n.c().ui);
}
