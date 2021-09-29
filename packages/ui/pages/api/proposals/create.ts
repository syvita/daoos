import { NextApiRequest, NextApiResponse } from "next";
import { addRecord } from "../../../lib/server-utils";
import { errorHandler } from "../../../lib/utils";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { payload } = req.body;
    try {
      res.status(200).json(addRecord(payload as any));
    } catch (err) {
      errorHandler(err, res);
    }
  }
};

export default handler;
