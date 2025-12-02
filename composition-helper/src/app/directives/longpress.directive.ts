import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[longPress]',
  standalone: true,
})
export class LongPressDirective {

  @Output() longPress = new EventEmitter<void>();

  private timeout: any;
  private delay = 500; // ms

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onPressStart(event: Event) {
    event.preventDefault();

    this.timeout = setTimeout(() => {
      this.longPress.emit();
    }, this.delay);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  @HostListener('touchend')
  onPressEnd() {
    clearTimeout(this.timeout);
  }
}
