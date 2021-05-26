import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
/**
 * Pipe para sanitizer el HTML
 */
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(value : any) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
