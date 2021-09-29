import { NextApiRequest, NextApiResponse } from "next";
import { getMemberStats } from "../../../../lib/mock-utils";
import { errorHandler } from "../../../../lib/utils";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { memberId } = req.query;
  try {
    res.status(200).json(getMemberStats(memberId as string));
  } catch (err) {
    errorHandler(err, res);
  }
};

export default handler;
