import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thaiBahtCurrency',
})
export class ThaiBahtCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('th-TH', {
      style: 'currency',
      currency: 'THB',
      currencyDisplay: 'symbol',
    });
  }
}
