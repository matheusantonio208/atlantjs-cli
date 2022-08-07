export class ToCreateDto {
  property: string;

  constructor(body: ToCreateDto) {
    this.property = body?.property;
  }
}
