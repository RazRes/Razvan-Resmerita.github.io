import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkillGroup } from '../data/cv.data';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid">
      @for (group of groups(); track group.title) {
        <div class="group">
          <h3>{{ group.title }}</h3>
          <div class="items">
            @for (item of group.items; track item) {
              <span class="chip">{{ item }}</span>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
    }
    .group {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 24px;
    }
    h3 {
      font-size: 1.05rem;
      margin-bottom: 16px;
    }
    .items {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  `,
})
export class Skills {
  readonly groups = input.required<SkillGroup[]>();
}
