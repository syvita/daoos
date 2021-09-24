import { useAtom } from "jotai";
import { profileAtom, userAtom } from "../store/auth";
import { UserData } from "@stacks/auth";

export  function useUser () {
  const [user, setUser] = useAtom<UserData | undefined, UserData | undefined>(
    userAtom
  );
  const [profile]= useAtom(profileAtom)

  return {
    user,
    profile,
    addresses: user?.profile?.stxAddress,
    setUser,
    isSignedIn: !!user,
    username:user?.username,
  };
}
