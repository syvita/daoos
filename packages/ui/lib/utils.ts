import {
    UserIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    UsersIcon,
  } from "@heroicons/react/outline";
import { TNavigation } from "../types";

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
export const navigation:TNavigation[] = [
    { name: "Dashboard", icon: HomeIcon, href: "/" },
    { name: "Members", icon: UsersIcon, href: "/members"},
    { name: "Profile", icon: UserIcon, href: "/profile" },
    {
      name: "FAQ & Help",
      icon: QuestionMarkCircleIcon,
      href: "/help",
    },
  ];
  export const isCurrentLink=(router:Record<string,unknown>,href:string)=>{
    return router.pathname==href
}