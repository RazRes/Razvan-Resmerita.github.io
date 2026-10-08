import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Project } from '../data/cv.data';
import { Icon } from './icon';

/** Angle between neighbouring phones on the ring, in radians (~49°). */
const RING_STEP = 0.85;

@Component({
  selector: 'app-featured-project',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:resize)': 'update()' },
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
        <div class="actions">
          <a class="btn primary" [href]="project().url" target="_blank" rel="noopener">
            Visit the website <app-icon name="external" [size]="16" />
          </a>
          <a class="btn" [href]="project().appStoreUrl" target="_blank" rel="noopener">
            <app-icon name="apple" /> Download on the App Store
          </a>
        </div>
      </div>
      <div
        class="showcase"
        role="region"
        aria-roledescription="carousel"
        [attr.aria-label]="project().name + ' screenshots'"
      >
        <div class="art">
          <span class="ring outer" aria-hidden="true"></span>
          <span class="ring inner" aria-hidden="true"></span>
          <span class="node" aria-hidden="true"></span>
          <div class="track" #track tabindex="0" (scroll)="update()">
            @for (s of project().screens; track s.src; let i = $index) {
              <figure class="slide">
                <div class="stage">
                  <img
                    [src]="s.src"
                    [alt]="s.alt"
                    width="540"
                    height="1080"
                    [attr.loading]="i === 0 ? null : 'lazy'"
                  />
                </div>
              </figure>
            }
          </div>
        </div>
        <div class="controls">
          <button
            class="arrow"
            type="button"
            aria-label="Previous screenshot"
            [disabled]="active() === 0"
            (click)="goTo(active() - 1)"
          >
            ←
          </button>
          <div class="dots">
            @for (s of project().screens; track s.src; let i = $index) {
              <button
                type="button"
                class="dot"
                [class.on]="i === active()"
                [attr.aria-label]="'Show screenshot ' + (i + 1) + ' of ' + project().screens.length"
                [attr.aria-current]="i === active() ? 'true' : null"
                (click)="goTo(i)"
              ></button>
            }
          </div>
          <button
            class="arrow"
            type="button"
            aria-label="Next screenshot"
            [disabled]="active() === project().screens.length - 1"
            (click)="goTo(active() + 1)"
          >
            →
          </button>
        </div>
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
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .showcase {
      display: grid;
      gap: 20px;
      justify-items: center;
      min-width: 0;
    }
    .art {
      position: relative;
      display: grid;
      width: min(440px, 100%);
      aspect-ratio: 1;
      container-type: inline-size;
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
      top: 0;
      left: 50%;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--accent);
      transform: translate(-50%, -50%);
    }
    .track {
      position: relative;
      display: flex;
      align-items: center;
      gap: 6cqw;
      padding-inline: 27cqw;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      scrollbar-width: none;
      mask-image: linear-gradient(to right, transparent, #000 14%, #000 86%, transparent);
      &::-webkit-scrollbar {
        display: none;
      }
    }
    /*
     * The phones ride a 3D ring. update() sets, per slide:
     *   --ox the ring axis relative to the slide (so every phone shares one vanishing point),
     *   --x/--z its position on the ring, --r its turn, --a its distance from the centre.
     * The transforms sit on .stage/img, not on .slide: scroll-snap measures transformed boxes,
     * so transforming the snap target itself would stop the last slides from centring.
     */
    .slide {
      flex: 0 0 46cqw;
      margin: 0;
      scroll-snap-align: center;
    }
    .stage {
      transform-style: preserve-3d;
      transform-origin: var(--ox, 50%) 50%;
      transform: perspective(700px) translate3d(var(--x, 0px), 0, var(--z, 0px));
    }
    .slide img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 24px;
      border: 1px solid var(--line);
      box-shadow: 0 28px 40px -22px rgba(0, 0, 0, 0.55);
      transform: rotateY(var(--r, 0deg));
      opacity: clamp(0, calc(1.3 - var(--a, 0) * 0.62), 1);
      filter: var(--f, none);
    }
    .controls {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .arrow {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--line);
      background: transparent;
      color: var(--text);
      font-size: 1.1rem;
      font-family: inherit;
      cursor: pointer;
      &:hover:not(:disabled) {
        border-color: var(--accent);
        color: var(--accent);
      }
      &:disabled {
        opacity: 0.35;
        cursor: default;
      }
    }
    .dots {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .dot {
      position: relative;
      width: 24px;
      height: 24px;
      padding: 0;
      border: 0;
      background: transparent;
      cursor: pointer;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: var(--line);
        transform: translate(-50%, -50%);
        transition: width 0.2s ease, background 0.2s ease;
      }
      &.on::after {
        width: 20px;
        background: var(--accent);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .track {
        scroll-behavior: auto;
      }
      .stage,
      .slide img {
        transform: none;
        filter: none;
      }
      .slide img {
        opacity: calc(1 - var(--a, 0) * 0.5);
      }
    }
    @media (max-width: 820px) {
      .card {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .showcase {
        order: -1;
      }
    }
  `,
})
export class FeaturedProject {
  readonly project = input.required<Project>();
  protected readonly active = signal(0);
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  constructor() {
    afterNextRender(() => this.update());
  }

  /** Places each slide on the 3D ring from its distance to the track centre. */
  protected update(): void {
    const track = this.track().nativeElement;
    const slides = Array.from(track.children) as HTMLElement[];
    if (!slides.length) return;
    const step =
      slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : slides[0].offsetWidth;
    const center = track.scrollLeft + track.clientWidth / 2;
    const radius = slides[0].offsetWidth * 1.15;
    let best = 0;
    let bestDistance = Infinity;
    slides.forEach((slide, i) => {
      const dx = slide.offsetLeft + slide.offsetWidth / 2 - center;
      const offset = dx / step;
      // Snap the centred phone to exactly zero: sub-pixel offsets make the browser resample it soft.
      const settled = Math.abs(offset) < 0.02;
      const phi = settled ? 0 : Math.max(-2.2, Math.min(2.2, offset)) * RING_STEP;
      const style = slide.style;
      style.setProperty('--ox', `${center - slide.offsetLeft}px`);
      style.setProperty('--x', `${(settled ? 0 : radius * Math.sin(phi) - dx).toFixed(1)}px`);
      style.setProperty('--z', `${(radius * (Math.cos(phi) - 1)).toFixed(1)}px`);
      style.setProperty('--r', `${((phi * 180) / Math.PI).toFixed(1)}deg`);
      const away = Math.min(2.5, Math.abs(offset));
      style.setProperty('--a', away.toFixed(3));
      // No filter at all on the centred phone: even blur(0) makes it render soft.
      style.setProperty(
        '--f',
        away < 0.04 ? 'none' : `blur(${(away * 1.1).toFixed(2)}px) brightness(${(1 - away * 0.22).toFixed(2)})`,
      );
      style.zIndex = String(Math.round(100 - Math.abs(offset) * 20));
      if (Math.abs(offset) < bestDistance) {
        best = i;
        bestDistance = Math.abs(offset);
      }
    });
    this.active.set(best);
  }

  protected goTo(index: number): void {
    const track = this.track().nativeElement;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2 });
  }
}
