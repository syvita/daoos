export interface TNavigation{
    name:string
    href:string
    icon?:any
}

export interface TProfile{
    name:string,
    /** @mockType {image.avatar} */
    imageUrl?:string,
    id?:string,
    email:string
}

export interface TProposalSummary{
    id:string,
    title:string,
    description?:string
    votes:number
    totalVotes:number
    owner:TProfile
    isClosed:boolean
    avatars:TProfile[]
    postDate:Date
}