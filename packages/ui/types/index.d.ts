

/* Strictly UI */

interface TFaq{
  id:number,
  question:string,
  answer:string
}


/* Strictly UI */

interface TFormInputs {
  title: string;
  startDate: date;
  endDate: date;
  content: string;
}

/* Strictly UI */
export interface TUserMenuNav {
  name: string;
  href?: string;
  action?: (payload: any) => void;
}
/* Strictly UI */
export interface TNavigation {
  name: string;
  href: string;
  icon?: any;
}
/* UI & Backend */
export interface TProfile {
  name: string;
  /** @mockType {image.avatar} */
  imageUrl?: string;
  id?: string;
  email: string;
  bio?:string;
  profileLink?:string
}

export interface TVoteSingle {
  yes: boolean;
}
/* UI & Backend */
export interface TVote<T> {
  voter: TProfile;
  vote: T;
  onChainLink: string;
}
/* UI & Backend */
export interface TMemberStats {
  closedProposals?: number;
  openProposals?: number;
  votes?: number;
}
/* UI & Backend */
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
/* UI & Backend */
export interface TMemberStats {
  closedProposals?: number;
  openProposals?: number;
}
/* UI & Backend */
export interface TProposal<T> extends TProposalSummary<T> {
  body: string;
  media?: [];
}
