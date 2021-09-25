import { NextApiRequest, NextApiResponse } from "next";
import { addRecord, updateRecord } from "../../../lib/server-utils";
import { errorHandler } from "../../../lib/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { payload } = req.body;
    try {
      const result = (await payload?.objectID)
        ? updateRecord(payload as any)
        : addRecord(payload as any);
      return res.status(200).json({...payload,objectID:(await result).objectID});
    } catch (err) {
      errorHandler(err, res);
    }
  }
};

export default handler;
