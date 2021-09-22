import React from "react";
import useSWR from "swr";
import { fetcher } from "../../lib/utils";
import MvLoader from "./MvLoader";
import { MvProfileDetailComponent } from "./MvProfileDetailComponent";


const API_LINK='./api/members'

const MvProfileDetail:React.FC<{id:string}> = ({id}) => {
  const { data, error } = useSWR(`${API_LINK}/${id}`, fetcher);
  return (
    <>
      {!data && <MvLoader isPage />}
      {data && <MvProfileDetailComponent profile={data} />}
    </>
  );
};

export default MvProfileDetail;
