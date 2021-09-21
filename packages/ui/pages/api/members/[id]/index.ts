import { NextApiRequest, NextApiResponse } from "next";
import { getProfile, getProfiles } from "../../../../lib/mock-utils";
import { errorHandler } from "../../../../lib/utils";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    res.status(200).json(getProfile(id as string));
  } catch (err) {
    errorHandler(err, res);
  }
};

export default handler;
