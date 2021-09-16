export interface TNavigation {
  name: string;
  href: string;
  icon?: any;
}

export interface TProfile {
  name: string;
  /** @mockType {image.avatar} */
  imageUrl?: string;
  id?: string;
  email: string;
}

export interface TVoteSingle {
  yes: boolean;
}

export interface TVote<T> {
  voter: TProfile;
  vote: T;
  onChainLink: string;
}

export interface TMemberStats {
  closedProposals?: number;
  openProposals?: number;
  votes?: number;
}

export interface TProposalSummary<T> {
  id: string;
  title: string;
  summary?: string;
  votes: TVote<T>[];
  owner: TProfile;
  isClosed: boolean;
  postDate: Date;
  expiryDate: Date;
}

export interface TMemberStats{
  closedProposals?:number,
  openProposals?:number,
  
}

export interface TProposal<T> extends TProposalSummary<T> {
  body: string;
  media?: [];
}
