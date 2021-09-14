import { NextApiRequest, NextApiResponse } from "next";
import { getProposal } from "../../../lib/mock-utils";
import { errorHandler } from "../../../lib/utils";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { proposalId } = req.query;
  try {
    res.status(200).json(getProposal(proposalId as string));
  } catch (err) {
    errorHandler(err, res);
  }
};

export default handler;
