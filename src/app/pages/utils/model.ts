export interface GlobalIndicesData {
  symbol: string;
  companyName: string;
  lastSalePrice: number;
  previousClose: number;
  netChange: number;
  percentageChange: string;
  volume: string;
  deltaIndicator: string;
  timeStamp: string;
  indexCharts: [{
    z: {
      symbol: string;
      lastSalePrice: number;
      dateTime: Date;
    },
    x: number;
    y: number;
  }];
}


export interface CryptoPrices {
  quoteResponse: {
    result: [{
      language: string;
      region: string;
      quoteType: string;
      quoteSourceName: string;
      triggerable: boolean;
      marketState: string;
      exchange: string;
      exchangeTimezoneName: string;
      exchangeTimezoneShortName: string;
      gmtOffSetMilliseconds: number;
      market: string;
      esgPopulated: boolean;
      firstTradeDateMilliseconds: number;
      priceHint: number;
      regularMarketChange: number;
      regularMarketChangePercent: number;
      regularMarketTime: number;
      regularMarketPrice: number;
      regularMarketVolume: number;
      regularMarketPreviousClose: number;
      fullExchangeName: string;
      sourceInterval: number;
      exchangeDataDelayedBy: number;
      tradeable: boolean;
      symbol: string;
    }],
    error: any;
  };
}


export interface SelectedTickers {
  name: string;
  code: string;
  maxThreshold: number;
  minThreshold: number;
  price: number;
  type: string;
}

export interface  Crypto {
  id: string;
  name: string;
  symbol: string;
  slug: string;
  status: string;
  platform: any;
}


export interface Tickers {
  name: string;
  code: string;
}

export interface ForexModel {
  code: string;
  name: string;
}

export interface ForexModelPaginated {
  content: ForexModel[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: Sort;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}


export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}


export interface TickersPaginated {
  content: Tickers[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: Sort;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}


export interface CryptoPaginated {
  content: Crypto[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: Sort;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
