import faker from "faker";
import moment from "moment";
import {
  TProfile,
  TVote,
  TVoteSingle,
  TProposalSummary,
  TProposal,
  TMemberStats,
} from "../types";

export const getProfiles = (qty: number = 10): TProfile[] => {
  return Array.from(Array(qty).keys()).map((item) => ({
    email: faker.internet.email(),
    name: faker.name.findName(),
    id: faker.datatype.uuid(),
    imageUrl: faker.internet.avatar(),
    isActive:true
  }));
};

export const getProfile = (id: string): TProfile => {
  return {
    email: faker.internet.email(),
    name: faker.name.findName(),
    bio: faker.lorem.paragraph(),
    objectID: faker.datatype.uuid(),
    imageUrl: faker.image.imageUrl(),
    isActive:true
  };
};

export const getMemberStats = (memberId: string): TMemberStats => {
  return {
    closedProposals: faker.datatype.number({ min: 0, max: 15 }),
    openProposals: faker.datatype.number({ min: 0, max: 15 }),
  };
};

export const getVotes = (qty: number = 10): TVote<TVoteSingle>[] => {
  return Array.from(Array(qty).keys()).map((item) => ({
    vote: { yes: faker.datatype.boolean() },
    voter: getProfiles(1)[0],
    onChainLink: faker.finance.bitcoinAddress(),
  }));
};

export const getProposals = (
  qty: number = 30
): TProposalSummary<TVoteSingle>[] => {
  return Array.from(Array(qty).keys()).map((item) => ({
    title: faker.lorem.sentence(),
    summary: faker.lorem.paragraph(),
    id: faker.datatype.uuid(),
    votes: getVotes(10),
    owner: getProfiles(1)[0],
    isClosed: faker.datatype.boolean(),
    postDate: moment()
      .subtract(faker.datatype.number({ min: 1, max: 30 }), "days")
      .toDate(),
    expiryDate: moment()
      .add(faker.datatype.number({ min: 1, max: 10 }), "days")
      .toDate(),
  }));
};

export const getProposal = (id: string): TProposal<TVoteSingle> => {
  const body = faker.lorem.paragraphs();
  return { ...getProposals(1)[0], body, objectID:id };
};
