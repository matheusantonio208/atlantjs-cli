import { Schema } from 'mongoose';
import  from '../../schemas/';

import {
  CreatingDto,
  CreatedDto,
  ToUpdateDto,
} from './dto/index.dto';

class Repository {
  async create(: CreatingDto): Promise<CreatedDto> {
    const Create = new ();

    if (await Create.save()) {
      return Create;
    }

    throw new Error(`Error to create `);
  }

  async getOneById(id: Schema.Types.ObjectId): Promise<CreatedDto> {
    const : CreatedDto = await .findById(id);
    if () return ;

    throw new Error(`Error to get `);
  }

  async listAll(
    property: string,
    sort: string,
    itensPerPage: number,
    pagination: number,
  ): Promise<Array<CreatedDto>> {
    const s: Array<CreatedDto> = await .find({}, (error, docs) => {
      if (!error) return docs;
      throw error;
    })
      .sort([[property, sort]])
      .skip(pagination)
      .limit(itensPerPage)
      .exec();

    if (s) return s;

    throw new Error(`Error to list categories`);
  }

  async updateById(
    id: Schema.Types.ObjectId,
    data: ToUpdateDto,
  ): Promise<CreatedDto> {
    const updated: CreatedDto = await .findByIdAndUpdate(
      id,
      data,
      (error, document) => {
        if (!error) return document;
        throw error;
      },
    );

    if (updated) return updated;

    throw new Error(`Error to update `);
  }

  async deleteById(id: Schema.Types.ObjectId): Promise<Boolean> {
    if (await .deleteOne({ _id: id })) return true;

    throw new Error(`Error to delete `);
  }
}

export default new Repository();
