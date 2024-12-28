interface LookupInterface<T> {
    label: string;
    value: T
  }
  
  export class LookupModel<T> {
    label: string;
    value: T;
  
    constructor(
      properties: LookupInterface<T>
    ) {
      this.label = properties.label;
      this.value = properties.value;
    }
  }
  