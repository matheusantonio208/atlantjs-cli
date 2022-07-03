export class XxxxToCreateDto {
  property: string;

  constructor(body: XxxxToCreateDto) {
    this.property = body?.property;
  }
}
