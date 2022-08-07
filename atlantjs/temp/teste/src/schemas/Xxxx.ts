import { model, Schema } from 'mongoose';

import { CreatedDto } from '../modules//dto/index.dto';

const Schema = new Schema<CreatedDto>(
  {
    property: String,
  },
  { timestamps: true },
);

export default model<CreatedDto>('s', Schema);
