import algoliasearch from "algoliasearch";
import { isEmpty, omit } from "lodash";
import moment from "moment";
import { TFormInputs, TProposal, TVoteSingle } from "../types";

export const prepareData = (record: Record<string, unknown>) => {
  record.has_insurance = !isEmpty(record.insurance_id);
  record.is_out = !isEmpty(record.item_out_id);
  record.objectID = record.id;
  return omit(record, ["insurance_id", "item_out_id"]);
};

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY
);

export const getIndex = (
  name: string = process.env.NEXT_PUBLIC_ALGOLIA_DEFAULT_INDEX
) => {
  return client.initIndex(name);
};

export const addRecord = async (record: Record<string, unknown>) => {
  const index = getIndex();
  return await index.saveObject(record, {
    autoGenerateObjectIDIfNotExist: true,
  });
};

export const removeRecord = async (objectId: string) => {
  const index = getIndex();
  return await index.deleteObject(objectId);
};

export const updateRecord = async (record: Record<string, unknown>) => {
  const index = getIndex();
  return await index.partialUpdateObject(record);
};

export const updateOrInsertRecord = async (record: Record<string, unknown>) => {
  const index = getIndex();
  return await index.saveObject(record);
};

