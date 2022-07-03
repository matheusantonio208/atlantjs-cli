import { model, Schema } from 'mongoose';

import { XxxxCreatedDto } from '../modules/Xxxx/dto/index.dto';

const xxxxSchema = new Schema<XxxxCreatedDto>(
  {
    property: String,
  },
  { timestamps: true },
);

export default model<XxxxCreatedDto>('xxxxs', xxxxSchema);
