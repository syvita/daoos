import { useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { isActiveAtom, selectedMemberAtom } from "../../lib/store/ui";
import { fetcher } from "../../lib/utils";
import { TProfile } from "../../types";
import MvLoader from "./MvLoader";
import { MvProfileDetailComponent } from "./MvProfileDetailComponent";
import MvProfileInputForm from "./MvProfileInputForm";

const API_LINK = "./api/members";

const MvProfileDetail: React.FC = () => {
  //Todo fetch data from gaia
  //const { data, error } = useSWR(`${API_LINK}/${id}`, fetcher);
  const data = useAtomValue(selectedMemberAtom) as TProfile;

  const [isActive, setIsActive] = useState(data.isActive);
  return (
    <>
      {!data && <MvLoader isPage />}
      {data && isActive ? (
        <MvProfileDetailComponent
          onEdit={() => setIsActive(false)}
          profile={data}
        />
      ) : (
        <MvProfileInputForm />
      )}
    </>
  );
};

export default MvProfileDetail;
