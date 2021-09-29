import { NextApiRequest, NextApiResponse } from "next";
import { getProposals } from "../../../lib/mock-utils";
import { errorHandler } from "../../../lib/utils";



const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(getProposals());
  } catch (err) {
    errorHandler(err, res);
  }
};

export default handler;
