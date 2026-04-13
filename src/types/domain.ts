export type Price = {
  value: number;
  symbol: "USD" | "UAH" | string;
  isDefault?: number;
};

export type Guarantee = {
  start: string;
  end: string;
};

export type Product = {
  id: number | string;
  title: string;
  type: string;
  specification?: string;
  serialNumber?: number | string;
  serial?: string;
  guarantee?: Guarantee;
  guaranteeStart?: string;
  guaranteeEnd?: string;
  price: Price[];
  order?: number | string;
  orderId?: number | string;
};

export type Order = {
  id: number | string;
  title: string;
  date: string;
  description?: string;
};

export type RemoveOrderResponse = {
  id: number | string;
};

export type AuthResponse = {
  token: string;
  user: {
    username: string;
    role: string;
  };
};
