export class XxxxCreatingDto {
  property: string;

  constructor(body: XxxxCreatingDto) {
    this.property = body?.property;
  }
}
