import {
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  LogoutIcon
} from "@heroicons/react/outline";
import { TNavigation } from "../types";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export const navigation: TNavigation[] = [
  { name: "Dashboard", icon: HomeIcon, href: "/app" },
  { name: "Members", icon: UsersIcon, href: "/app/members" },
  {
    name: "FAQ's & Help",
    icon: QuestionMarkCircleIcon,
    href: "/app/faqs",
  },
  
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

