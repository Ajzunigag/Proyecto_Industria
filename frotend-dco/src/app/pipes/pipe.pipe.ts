import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'pipe'
})
export class PipePipe implements PipeTransform {
  constructor(private _sanitizer:DomSanitizer) {
  }
  
  transform(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }

  transform1(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustResourceUrl(v);
  }
  transform2(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustScript(v);
  }
  transform3(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustStyle(v);
  }
  transform4(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustUrl(v);
  }

}
