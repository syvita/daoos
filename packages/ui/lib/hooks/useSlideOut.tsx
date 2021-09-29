import { useAtom } from "jotai";
import { slideOutPanelAtom } from "../store/ui";

export function useSlideOut() {
  const [panel, setPanel] = useAtom(slideOutPanelAtom);

  return { panel, setPanel };
}
