import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marmitonTitle'
})
export class MarmitonTitlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const url = new URL(value);
    const page = url.pathname.split('/')[2];
    const name = page.substring(8, page.length -5);
    const title = name.split('_')[0];
    const displayedTitle = title.replace(/-/g, ' ');
    
    return displayedTitle;
  }

}
