import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimSentence'
})
export class TrimSentencePipe implements PipeTransform {

  transform(value: string, ...args: number[]): string {
    if (!value) { return ''; }

    const dirtyLength = args[0];
    const length = 
      dirtyLength && 
      !isNaN(Number(dirtyLength)) && 
      dirtyLength >= 0 ? dirtyLength : 20;

    if (value.length <= length) { return value; }

    return value.substring(0, length) + '...';
  }

}
