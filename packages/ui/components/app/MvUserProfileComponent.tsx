import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import React from "react";
import { useUser } from "../../lib/hooks/useUser";
import { slideOutPanelAtom, selectedMemberAtom } from "../../lib/store/ui";
import MvLoader from "./MvLoader";
import MvProfileDetail from "./MvProfileDetail";

const MvUserProfileComponent: React.FC = () => {
  const {
    profile: { data, loading, error },
  } = useUser();

  const [selectedMember, setMember] = useAtom(selectedMemberAtom);
  const setPanel = useUpdateAtom(slideOutPanelAtom);

  const onSelect = () => {
    if (data) {
      setPanel({ show: true, component: MvProfileDetail, title: "Profile" });
      setMember(data);
    }
  };

  
  return loading ? (
    <MvLoader isPage={false} />
  ) : (
    <div className="flex-shrink-0 flex bg-indigo-200 p-4">
      <button onClick={onSelect} className="flex-shrink-0 w-full group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full"
              src={data?.imageUrl}
              alt=""
            />
          </div>
          <div className=" ml-3">
            <p className="text-sm w-40 truncate font-medium text-gray-900">
              {data?.name}
            </p>
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              View
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default MvUserProfileComponent;
