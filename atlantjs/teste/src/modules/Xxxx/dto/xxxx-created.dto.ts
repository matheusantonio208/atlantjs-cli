export class CreatedDto {
  property: string;

  constructor(body: CreatedDto) {
    this.property = body?.property;
  }
}
