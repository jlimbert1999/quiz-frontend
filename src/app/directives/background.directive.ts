import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective {
  @Input() isCorrect: Boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click') answer() {
    this.renderer.addClass(this.el.nativeElement, 'option');
    if (this.isCorrect) {
      this.renderer.addClass(this.el.nativeElement, 'correct');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'incorrect');
    }
  }

}
