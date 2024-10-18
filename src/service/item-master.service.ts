import { ItemMasterModel } from '@lib/mongodb/models';

const RESULT_LIMIT = 5;
const DEFAULT_GET_OPTION = { lean: true };

export type GetSOHQuery = {
  sourceFilename?: string;
  storeId?: string;
  countId?: string;
};

export async function search(query: GetSOHQuery = {}) {
  const result = await ItemMasterModel.find(query, { ...DEFAULT_GET_OPTION })
  .select('sourceFilename outputFilename sourceContainer destinationContainer status')
  .limit(RESULT_LIMIT)
  .sort({ createdAt: -1})
  .exec()

  return result;
}

export async function get(id: string) {
  const result = ItemMasterModel.findById(id, '', { ...DEFAULT_GET_OPTION })
  .exec();

  return result;
}