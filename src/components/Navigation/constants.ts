import { config } from "../../core/configs";
import { RouteList } from "../../core/enums";

export const navLinks = [
  {
    to: RouteList.Root,
    label: "Home",
    img: `${config.bucketUrl}/icons/home.webp`,
  },
  {
    to: RouteList.Shop,
    label: "Shop",
    img: `${config.bucketUrl}/icons/shop.webp`,
  },
  {
    to: RouteList.Tasks,
    label: "Tasks",
    img: `${config.bucketUrl}/icons/tasks.webp`,
  },
  {
    to: RouteList.Friends,
    label: "Friends",
    img: `${config.bucketUrl}/icons/friends.webp`,
  },
  {
    to: RouteList.Leaders,
    label: "Leaders",
    img: `${config.bucketUrl}/icons/leaders.webp`,
  },
];
