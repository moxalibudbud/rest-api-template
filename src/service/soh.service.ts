import { SnapshotModel } from '@lib/mongodb/models';

const RESULT_LIMIT = 5;
const DEFAULT_GET_OPTION = { lean: true };
const COUNT_FILE_FIELDS = 'sourceFilename outputFilename';

export type GetSOHQuery = {
  sourceFilename?: string;
  storeId?: string;
  countId?: string;
};

export async function search(query: GetSOHQuery & any = {}) {
  // Temporary delet extra fields
  delete query.limit;
  delete query.fields;
  
  const result = await SnapshotModel.find(query, { ...DEFAULT_GET_OPTION })
  .select('sourceFilename outputFilename sourceContainer destinationContainer storeId countId status')
  .populate('countFile', COUNT_FILE_FIELDS)
  .limit(RESULT_LIMIT)
  .sort({ createdAt: -1})
  .exec()

  return result;
}

export async function get(id: string) {
  const result = SnapshotModel.findById(id, '', { ...DEFAULT_GET_OPTION })
  .populate('countFile', COUNT_FILE_FIELDS)
  .exec();

  return result;
}