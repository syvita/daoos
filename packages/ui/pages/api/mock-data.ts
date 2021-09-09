import { NextApiRequest, NextApiResponse } from "next";
import faker from "faker";
import { TProfile, TProposalSummary } from "../../types";
import { errorHandler } from "../../lib/utils";

const getProfiles = (qty: number = 10): TProfile[] => {
  return Array.from(Array(qty).keys()).map((item) => ({
    email: faker.internet.email(),
    name: faker.name.findName(),
    id: faker.datatype.uuid(),
    imageUrl: faker.internet.avatar(),
  }));
};

const getProposals = (qty: number = 50): TProposalSummary[] => {
  return Array.from(Array(qty).keys()).map((item) => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(),
    id: faker.datatype.uuid(),
    votes: faker.datatype.number({ min: 10, max: 200 }),
    totalVotes: faker.datatype.number({ min: 200, max: 400 }),
    avatars: getProfiles(10),
    owner: getProfiles(1)[0],
    isClosed:faker.datatype.boolean()
  }));
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(getProposals());
  } catch (err) {
    errorHandler(err, res);
  }
};

export default handler;
