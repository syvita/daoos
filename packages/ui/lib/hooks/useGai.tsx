import { useAtomValue } from "jotai/utils";
import { gaiAtom } from "../store/gai";
import { useUser } from "./useUser";

export function useGai(){
    return useAtomValue(gaiAtom)
}