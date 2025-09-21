import { TOrder } from "@utils-types";

export type TFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading?: boolean;
  error?: boolean;
};

export type FeedInfoUIProps = {
  feed: TFeed;
  readyOrders: number[];
  pendingOrders: number[];
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};
