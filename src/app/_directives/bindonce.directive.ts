import { Directive, TemplateRef, ViewContainerRef, NgZone } from "@angular/core";

@Directive({
  selector: '[bindOnce]',
})
export class BindOnceDirective {
  constructor(template: TemplateRef<any>, container: ViewContainerRef, zone: NgZone) {
    zone.runOutsideAngular(() => {
      console.log('Detatching...');
      const view = container.createEmbeddedView(template);
      setTimeout(() => view.detach());
    })
  }
}