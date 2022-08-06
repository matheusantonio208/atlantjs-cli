import { IRequest, IResponse } from '../../@types';

import {
  ToCreateDto,
  CreatingDto,
  CreatedDto,
  ToUpdateDto,
} from './dto/index.dto';

import Repository from './.repository';

// import Service from './.service';

class Controller {
  async store(req: IRequest, res: IResponse) {
    try {
      // === Get Vars === //
      const : ToCreateDto = new ToCreateDto(req.body);

      // === Generate Vars === //
      // const Property: number = await Service.serviceFunction();

      // === Create Dto === //
      const CreatingDto: CreatingDto = new CreatingDto({
        ...,
        // _property: Property,
      });

      // === Create Object === //
      const Created: CreatedDto = await Repository.create(
        CreatingDto,
      );

      return res.status(201).json(Created);
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}` });
    }
  }

  async index(req: IRequest, res: IResponse) {
    try {
      const { id } = req.params;

      const : CreatedDto = await Repository.getOneById(id);

      return res.status(201).json();
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}` });
    }
  }

  async show(req: IRequest, res: IResponse) {
    try {
      const { property, sort, itensPerPage, pagination } = req.query;

      const : Array<CreatedDto> = await Repository.listAll(
        property,
        sort,
        itensPerPage,
        pagination,
      );

      return res.status(201).json();
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}` });
    }
  }

  async delete(req: IRequest, res: IResponse) {
    try {
      const { id } = req.params;

      await Repository.deleteById(id);

      return res
        .status(201)
        .json({ success_msg: `Success! Your  was deleted` });
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}` });
    }
  }

  async update(req: IRequest, res: IResponse) {
    try {
      const { id } = req.params;
      const data: ToUpdateDto = new ToUpdateDto(req.body);

      const Updated: CreatedDto = await Repository.updateById(
        id,
        data,
      );

      return res.status(201).json(Updated);
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}` });
    }
  }
}

export default new Controller();
