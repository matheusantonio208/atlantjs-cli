export class ToUpdateDto {
  property: string;

  constructor(body: ToUpdateDto) {
    this.property = body?.property;
  }
}
