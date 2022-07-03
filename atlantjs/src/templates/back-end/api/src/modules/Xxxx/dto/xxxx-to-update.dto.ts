export class XxxxToUpdateDto {
  property: string;

  constructor(body: XxxxToUpdateDto) {
    this.property = body?.property;
  }
}
