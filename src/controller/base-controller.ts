import { Request, Response } from 'express';
import { existsSync } from 'fs';
import httpStatus from 'http-status';
import path from 'path';

function errorHandler(res: Response, error: any) {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
}

export default (service: any) => {
  const search = async (req: Request, res: Response) => {
    try {
      const result = await service.search(req.query);
      res.json(result);
    } catch (error: any) {
      errorHandler(res, error);
    }
  };
  
  const get = async (req: Request, res: Response) => {
    try {
      const result = await service.get(req.params.id);
      res.status(result ? httpStatus.OK : httpStatus.NOT_FOUND).json(result || {});
    } catch (error: any) {
      errorHandler(res, error);
    }
  };

  const download = async (req: Request, res: Response) => {
    try {
      const filepath = path.resolve('/', req.params.filepath);

      if(existsSync(filepath)) {
        res.download(filepath);
      } else {
        res.send(`Unable to download ${path.basename(filepath)} because it does not exist anymore.`);
      }
    } catch (error: any) {
      errorHandler(res, error);
    }
  };

  return { search, get, download };
}