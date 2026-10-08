import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../i18n';

type Status = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="form" (submit)="submit($event)">
      <div class="field">
        <label for="cf-name">{{ ui().formName }}</label>
        <input id="cf-name" name="name" type="text" required maxlength="100" autocomplete="name" />
      </div>
      <div class="field">
        <label for="cf-email">{{ ui().formEmail }}</label>
        <input id="cf-email" name="email" type="email" required maxlength="150" autocomplete="email" />
      </div>
      <div class="field">
        <label for="cf-message">{{ ui().formMessage }}</label>
        <textarea id="cf-message" name="message" rows="5" required minlength="10" maxlength="3000"></textarea>
      </div>
      <!-- Honeypot: invisible to people, tempting to bots. -->
      <input class="hp" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" />

      <button class="btn primary" type="submit" [disabled]="status() === 'sending'">
        {{ status() === 'sending' ? ui().formSending : ui().formSend }}
      </button>

      <p class="status" role="status" aria-live="polite" [class.error]="status() === 'error'">
        @switch (status()) {
          @case ('success') {
            {{ ui().formSuccess }}
          }
          @case ('error') {
            {{ ui().formError }}
          }
        }
      </p>
      <p class="note">{{ ui().formNote }}</p>
    </form>
  `,
  styles: `
    .form {
      display: grid;
      gap: 16px;
      max-width: 560px;
      margin: 0 auto 36px;
      text-align: left;
    }
    .field {
      display: grid;
      gap: 6px;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--muted);
    }
    input,
    textarea {
      width: 100%;
      padding: 13px 16px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--surface);
      color: var(--text);
      font: inherit;
      &:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
      }
    }
    textarea {
      resize: vertical;
      min-height: 120px;
    }
    .hp {
      position: absolute;
      left: -9999px;
      width: 1px;
      height: 1px;
      opacity: 0;
    }
    .btn {
      justify-self: start;
      cursor: pointer;
      &:disabled {
        opacity: 0.6;
        cursor: default;
      }
    }
    .status {
      min-height: 1.5em;
      font-size: 0.95rem;
      color: var(--accent);
      &.error {
        color: #ff6b5e;
      }
    }
    .note {
      font-size: 0.8rem;
      color: var(--muted);
    }
  `,
})
export class ContactForm {
  private readonly i18n = inject(I18n);
  protected readonly ui = computed(() => this.i18n.c().ui);
  protected readonly status = signal<Status>('idle');

  protected async submit(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    // A filled honeypot means a bot: pretend it worked and send nothing.
    if (data.get('_honey')) {
      this.status.set('success');
      return;
    }

    this.status.set('sending');
    const name = String(data.get('name') ?? '').trim();
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${this.i18n.c().profile.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email: String(data.get('email') ?? '').trim(),
          message: String(data.get('message') ?? '').trim(),
          _subject: `Portfolio message from ${name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean | string } | null;
      if (response.ok && (result?.success === true || result?.success === 'true')) {
        this.status.set('success');
        form.reset();
      } else {
        this.status.set('error');
      }
    } catch {
      this.status.set('error');
    }
  }
}
