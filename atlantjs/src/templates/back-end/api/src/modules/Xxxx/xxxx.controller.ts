import { IRequest, IResponse } from '../../@types';

import {
  XxxxToCreateDto,
  XxxxCreatingDto,
  XxxxCreatedDto,
  XxxxToUpdateDto,
} from './dto/index.dto';

import xxxxRepository from './xxxx.repository';

// import xxxxService from './xxxx.service';

class XxxxController {
  async store(req: IRequest, res: IResponse) {
    try {
      // === Get Vars === //
      const xxxx: XxxxToCreateDto = new XxxxToCreateDto(req.body);

      // === Generate Vars === //
      // const xxxxProperty: number = await xxxxService.serviceFunction();

      // === Create Dto === //
      const xxxxCreatingDto: XxxxCreatingDto = new XxxxCreatingDto({
        ...xxxx,
        // xxxx_property: xxxxProperty,
      });

      // === Create Object === //
      const xxxxCreated: XxxxCreatedDto = await xxxxRepository.create(
        xxxxCreatingDto,
      );

      return res.status(201).json(xxxxCreated);
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}` });
    }
  }

  async index(req: IRequest, res: IResponse) {
    try {
      const { id } = req.params;

      const xxxx: XxxxCreatedDto = await xxxxRepository.getOneById(id);

      return res.status(201).json(xxxx);
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}` });
    }
  }

  async show(req: IRequest, res: IResponse) {
    try {
      const { property, sort, itensPerPage, pagination } = req.query;

      const xxxx: Array<XxxxCreatedDto> = await xxxxRepository.listAll(
        property,
        sort,
        itensPerPage,
        pagination,
      );

      return res.status(201).json(xxxx);
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}` });
    }
  }

  async delete(req: IRequest, res: IResponse) {
    try {
      const { id } = req.params;

      await xxxxRepository.deleteById(id);

      return res
        .status(201)
        .json({ success_msg: `Success! Your xxxx was deleted` });
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}` });
    }
  }

  async update(req: IRequest, res: IResponse) {
    try {
      const { id } = req.params;
      const data: XxxxToUpdateDto = new XxxxToUpdateDto(req.body);

      const xxxxUpdated: XxxxCreatedDto = await xxxxRepository.updateById(
        id,
        data,
      );

      return res.status(201).json(xxxxUpdated);
    } catch (error) {
      return res.status(401).json({ error_msg: `Error! ${error}` });
    }
  }
}

export default new XxxxController();
