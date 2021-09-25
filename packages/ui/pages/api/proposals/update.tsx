import { NextApiRequest, NextApiResponse } from "next";
import { updateRecord } from "../../../lib/server-utils";
import { errorHandler } from "../../../lib/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { payload } = req.body;
    try {
      return await res.status(200).json(await updateRecord(payload as any));
    } catch (err) {
      errorHandler(err, res);
    }
  }
};

export default handler;
