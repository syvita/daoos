import { NextApiRequest, NextApiResponse } from "next";
import { getProfiles } from "../../../lib/mock-utils";
import { errorHandler } from "../../../lib/utils";


const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(getProfiles());
  } catch (err) {
    errorHandler(err, res);
  }
};

export default handler;
