import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimSentence'
})
export class TrimSentencePipe implements PipeTransform {

  transform(value: string, ...args: number[]): string {
    if (!value) { return ''; }

    const length = args[0] ?? 20;

    if (value.length <= length) { return value; }

    return value.substring(0, length) + '...';
  }

}
