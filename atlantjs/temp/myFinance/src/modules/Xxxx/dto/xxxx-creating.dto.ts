export class CreatingDto {
  property: string;

  constructor(body: CreatingDto) {
    this.property = body?.property;
  }
}
