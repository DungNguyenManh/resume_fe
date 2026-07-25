import { Component, inject, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ResumeProfile } from '../../models/resume.model';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

/**
 * Renders the top profile card.
 * Data is loaded directly from i18n JSON via TranslateService.
 * Avatar opens a PhotoSwipe lightbox (zoom/pan/download) on click.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements AfterViewInit, OnDestroy {
  private readonly translate = inject(TranslateService);

  profile = toSignal(
    this.translate.stream('resume.profile') as any,
    { initialValue: this.translate.instant('resume.profile') as ResumeProfile }
  );

  @ViewChild('avatarGallery') avatarGallery!: ElementRef<HTMLElement>;
  private lightbox?: PhotoSwipeLightbox;

  ngAfterViewInit(): void {
    this.lightbox = new PhotoSwipeLightbox({
      gallery: this.avatarGallery.nativeElement,
      children: 'a',
      pswpModule: () => import('photoswipe'),
      wheelToZoom: true,
      initialZoomLevel: 'fit',
      secondaryZoomLevel: 1.5,
      maxZoomLevel: 4,
    });

    this.lightbox.on('uiRegister', () => {
      this.lightbox!.pswp!.ui!.registerElement({
        name: 'download-button',
        order: 8,
        isButton: true,
        tagName: 'a',
        html: {
          isCustomSVG: true,
          inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6-1.6 1.5 6.1 6.3 6.1-6.3z" id="pswp__icn-download"/>',
          outlineID: 'pswp__icn-download',
        },
        onInit: (el, pswp) => {
          (el as HTMLAnchorElement).setAttribute('download', '');
          (el as HTMLAnchorElement).setAttribute('target', '_blank');
          (el as HTMLAnchorElement).setAttribute('rel', 'noopener');
          pswp.on('change', () => {
            (el as HTMLAnchorElement).href = pswp.currSlide?.data.src ?? '';
          });
        },
      });
    });

    this.lightbox.init();
  }

  ngOnDestroy(): void {
    this.lightbox?.destroy();
    this.lightbox = undefined;
  }
}