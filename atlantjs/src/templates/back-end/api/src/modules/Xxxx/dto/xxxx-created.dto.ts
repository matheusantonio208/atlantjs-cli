export class XxxxCreatedDto {
  property: string;

  constructor(body: XxxxCreatedDto) {
    this.property = body?.property;
  }
}
