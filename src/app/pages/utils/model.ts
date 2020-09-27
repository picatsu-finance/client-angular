export interface SelectedTickers {
  name: string;
  code: string;
  maxThreshold: number;
  minThreshold: number;
  price: number;
  type: string;
}


export interface Tickers {
  name: string;
  code: string;
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

