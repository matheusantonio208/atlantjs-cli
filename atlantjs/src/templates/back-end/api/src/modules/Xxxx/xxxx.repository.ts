import { Schema } from 'mongoose';
import Xxxx from '../../schemas/Xxxx';

import {
  XxxxCreatingDto,
  XxxxCreatedDto,
  XxxxToUpdateDto,
} from './dto/index.dto';

class XxxxRepository {
  async create(xxxx: XxxxCreatingDto): Promise<XxxxCreatedDto> {
    const xxxxCreate = new Xxxx(xxxx);

    if (await xxxxCreate.save()) {
      return xxxxCreate;
    }

    throw new Error(`Error to create xxxx`);
  }

  async getOneById(id: Schema.Types.ObjectId): Promise<XxxxCreatedDto> {
    const xxxx: XxxxCreatedDto = await Xxxx.findById(id);
    if (xxxx) return xxxx;

    throw new Error(`Error to get xxxx`);
  }

  async listAll(
    property: string,
    sort: string,
    itensPerPage: number,
    pagination: number,
  ): Promise<Array<XxxxCreatedDto>> {
    const xxxxs: Array<XxxxCreatedDto> = await Xxxx.find({}, (error, docs) => {
      if (!error) return docs;
      throw error;
    })
      .sort([[property, sort]])
      .skip(pagination)
      .limit(itensPerPage)
      .exec();

    if (xxxxs) return xxxxs;

    throw new Error(`Error to list categories`);
  }

  async updateById(
    id: Schema.Types.ObjectId,
    data: XxxxToUpdateDto,
  ): Promise<XxxxCreatedDto> {
    const updatedXxxx: XxxxCreatedDto = await Xxxx.findByIdAndUpdate(
      id,
      data,
      (error, document) => {
        if (!error) return document;
        throw error;
      },
    );

    if (updatedXxxx) return updatedXxxx;

    throw new Error(`Error to update xxxx`);
  }

  async deleteById(id: Schema.Types.ObjectId): Promise<Boolean> {
    if (await Xxxx.deleteOne({ _id: id })) return true;

    throw new Error(`Error to delete xxxx`);
  }
}

export default new XxxxRepository();
