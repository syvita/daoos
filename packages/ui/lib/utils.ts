import {
  UserIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  LogoutIcon
} from "@heroicons/react/outline";
import { TNavigation } from "../types";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const colors = {
  blue: {
    text1: "text-blue-800",
    bg1: "bg-blue-200",
    text2: "text-blue-600",
    bg2: "bg-blue-600",
  },
  indigo: {
    text1: "text-indigo-800",
    bg1: "bg-indigo-200",
    text2: "text-indigo-600",
    bg2: "bg-indigo-600",
  },
  purple: {
    text1: "text-purple-800",
    bg1: "bg-purple-200",
    text2: "text-purple-600",
    bg2: "bg-purple-600",
  },
  red: {
    text1: "text-red-800",
    bg1: "bg-red-200",
    text2: "text-red-600",
    bg2: "bg-red-600",
  },
  green: {
    text1: "text-green-800",
    bg1: "bg-green-200",
    text2: "text-green-600",
    bg2: "bg-green-600",
  },
  yellow: {
    text1: "text-yellow-800",
    bg1: "bg-yellow-200",
    text2: "text-yellow-600",
    bg2: "bg-yellow-600",
  },
};

export const badgeColors = {
  red: {
    bg: "bg-red-100",
    text: "text-red-800",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-800",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-800",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  gray: {
    bg: "bg-gray-700",
    text: "text-gray-100",
  },
  lightGray: {
    bg: "bg-gray-300",
    text: "text-gray-700",
  },
};

export const navigation: TNavigation[] = [
  { name: "Dashboard", icon: HomeIcon, href: "/" },
  { name: "Members", icon: UsersIcon, href: "/members" },
  {
    name: "FAQ's & Help",
    icon: QuestionMarkCircleIcon,
    href: "/help",
  },
  { name: "Signout", icon: LogoutIcon, href: "/signout" },
  
];
export const isCurrentLink = (
  router: Record<string, unknown>,
  href: string
) => {
  return router.pathname == href;
};

export const numberToPercent = (actual: number, total: number): string => {
  return Math.round((actual / total) * 100).toString() + "%";
};

export const ddOptionsForProposal = () => ({
  type: "custom",
  options: {
    custom: {
      quantity: 20,
      title: "text",
      description: "longText",
    },
  },
});

function objectToQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

const BASE_MOCK_URL = "https://dummyapi.io/data/v1/";

export const prepareMockUrl = (
  type: string,
  options: Record<string, unknown>
): string => {
  return `${BASE_MOCK_URL}${type}?${objectToQueryString(options)}`;
};

export const fetcher = (url) => fetch(url).then((res) => res.json());

export function errorHandler(err, res) {
  if (typeof err === "string") {
    // custom application error
    const is404 = err.toLowerCase().endsWith("not found");
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  console.error(err);
  return res.status(500).json({ message: err.message });
}

