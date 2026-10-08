import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { fmt } from '../data/content';
import { Job } from '../data/cv.data';
import { I18n } from '../i18n';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="timeline">
      @for (job of visibleJobs(); track job.company + job.period) {
        <li [class.current]="job.current">
          <div class="when">
            <span>{{ job.period }}</span>
            @if (job.current) {
              <span class="now">{{ ui().now }}</span>
            }
          </div>
          <div class="what">
            <h3>{{ job.role }}</h3>
            <p class="company">{{ job.company }} · {{ job.location }}</p>
            <ul>
              @for (h of job.highlights; track h) {
                <li>{{ h }}</li>
              }
            </ul>
            @if (job.stack.length) {
              <div class="stack">
                @for (t of job.stack; track t) {
                  <span class="chip">{{ t }}</span>
                }
              </div>
            }
          </div>
        </li>
      }
    </ol>
    @if (jobs().length > initialCount) {
      <button class="btn toggle" type="button" (click)="toggle()" [attr.aria-expanded]="expanded()">
        {{ expanded() ? ui().showLess : earlierLabel() }}
      </button>
    }
  `,
  styles: `
    .timeline {
      list-style: none;
      margin: 0;
      padding: 0;
      border-left: 2px solid var(--line);
      margin-left: 8px;
    }
    .timeline > li {
      position: relative;
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 24px;
      padding: 0 0 36px 32px;
      &::before {
        content: '';
        position: absolute;
        left: -9px;
        top: 6px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--bg);
        border: 3px solid var(--line);
      }
      &.current::before {
        border-color: var(--accent);
        background: var(--accent);
      }
    }
    .when {
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: flex-start;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--muted);
      padding-top: 2px;
    }
    .now {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 2px 8px;
      border-radius: 999px;
      border: 1px solid var(--accent);
      color: var(--accent);
    }
    h3 {
      font-size: 1.25rem;
    }
    .company {
      color: var(--accent);
      font-weight: 500;
      margin: 4px 0 12px;
    }
    ul {
      list-style: none;
      display: grid;
      gap: 6px;
      margin-bottom: 14px;
    }
    ul li {
      position: relative;
      padding-left: 18px;
      color: var(--muted);
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.7em;
        width: 8px;
        height: 2px;
        background: var(--accent);
      }
    }
    .stack {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .toggle {
      margin-left: 40px;
      cursor: pointer;
      font-family: inherit;
    }
    @media (max-width: 700px) {
      .timeline > li {
        grid-template-columns: 1fr;
        gap: 8px;
        padding-left: 24px;
      }
      .when {
        flex-direction: row;
        align-items: center;
      }
      .toggle {
        margin-left: 26px;
      }
    }
  `,
})
export class Experience {
  readonly jobs = input.required<Job[]>();
  private readonly i18n = inject(I18n);
  protected readonly ui = computed(() => this.i18n.c().ui);
  protected readonly initialCount = 3;
  protected readonly earlierLabel = computed(() =>
    fmt(this.ui().showEarlier, { n: this.jobs().length - this.initialCount }),
  );
  protected readonly expanded = signal(false);
  protected toggle(): void {
    this.expanded.update((v) => !v);
  }

  protected readonly visibleJobs = computed(() =>
    this.expanded() ? this.jobs() : this.jobs().slice(0, this.initialCount),
  );
}
