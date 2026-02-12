/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  AlkanesMarketCreatePutOnRequest,
  BindInfoRequest,
  BindInfoResponse,
  MarketConfirmBatchBidRequest,
  MarketConfirmBatchBidResponse,
  MarketConfirmBatchPutOnRequest,
  MarketConfirmBatchPutOnResponse,
  MarketConfirmBidRequest,
  MarketConfirmBidResponse,
  MarketConfirmModifyPriceRequest,
  MarketConfirmModifyPriceResponse,
  MarketConfirmPutOffRequest,
  MarketConfirmPutOffResponse,
  MarketConfirmPutOnRequest,
  MarketConfirmPutOnResponse,
  MarketCreateBatchBidPrepareRequest,
  MarketCreateBatchBidPrepareResponse,
  MarketCreateBatchBidRequest,
  MarketCreateBatchBidResponse,
  MarketCreateBatchPutOnRequest,
  MarketCreateBatchPutOnResponse,
  MarketCreateBidPrepareRequest,
  MarketCreateBidPrepareResponse,
  MarketCreateBidRequest,
  MarketCreateBidResponse,
  MarketCreateModifyPriceRequest,
  MarketCreateModifyPriceResponse,
  MarketCreatePutOffRequest,
  MarketCreatePutOffResponse,
  MarketCreatePutOnRequest,
  MarketCreatePutOnResponse,
  MarketInscriptionInfoListRequest,
  MarketInscriptionInfoListResponse,
  MarketInscriptionInfoRequest,
  MarketInscriptionInfoResponse,
  RunesMarketCreatePutOnRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class V3<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name BindInfo
   * @summary Get the address bind info.
   * @request POST:/v3/market/brc20/auction/bind_info
   * @secure
   */
  bindInfo = (data: BindInfoRequest, params: RequestParams = {}) =>
    this.request<BindInfoResponse, any>({
      path: `/v3/market/brc20/auction/bind_info`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name GetBrc20Kline
   * @summary Get tick k line.
   * @request POST:/v3/market/brc20/auction/brc20_kline
   * @secure
   */
  getBrc20Kline = (
    data: {
      tick: string;
      /** Start time range */
      timeStart: number;
      /** End time range */
      timeEnd: number;
      /** Time granularity, such as milliseconds for a 5-minute interval */
      timeStep: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          price?: number;
          timestamp?: number;
        }[];
      },
      any
    >({
      path: `/v3/market/brc20/auction/brc20_kline`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name GetBrc20Types
   * @summary Get statistical data, price, market capitalization, etc. for BRC20.
   * @request POST:/v3/market/brc20/auction/brc20_types
   * @secure
   */
  getBrc20Types = (
    data: {
      /** @example 4 */
      tickLen?: 4 | 5;
      /** Optional: day1, day7, day30 */
      timeType?: "day1" | "day7" | "day30";
      /** Specify a list of ticks */
      ticks?: string[];
      start?: number;
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          BTCPrice: number;
          list?: {
            tick: string;
            curPrice: number;
            changePrice: number;
            btcVolume: number;
            amountVolume: number;
            cap: string;
          }[];
          /** The first three deployments of tick */
          deploy?: {
            tick: string;
            curPrice: number;
            changePrice: number;
            btcVolume: number;
            amountVolume: number;
            cap: string;
          }[];
          /** The top three tick by market capitalization */
          cap?: {
            tick: string;
            curPrice: number;
            changePrice: number;
            btcVolume: number;
            amountVolume: number;
            cap: string;
          }[];
        };
      },
      any
    >({
      path: `/v3/market/brc20/auction/brc20_types`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name GetBrc20TypesSpecified
   * @summary Get statistical data, price, market capitalization, etc. for BRC20.
   * @request POST:/v3/market/brc20/auction/brc20_types_specified
   * @secure
   */
  getBrc20TypesSpecified = (
    data: {
      timeType?: "day1" | "day7" | "day30";
      tick?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          tick?: string;
          curPrice?: number;
          changePrice?: number;
          btcVolume?: number;
          amountVolume?: number;
        };
      },
      any
    >({
      path: `/v3/market/brc20/auction/brc20_types_specified`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name BindBrc20NftAddress
   * @summary Bind btcAddress and nftAddress.
   * @request POST:/v3/market/brc20/auction/bind
   * @secure
   */
  bindBrc20NftAddress = (
    data: {
      btcAddress: string;
      nftAddress: string;
      sign: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: object;
      },
      any
    >({
      path: `/v3/market/brc20/auction/bind`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name GetBrc20AuctionList
   * @summary Retrieve the list information of the market.
   * @request POST:/v3/market/brc20/auction/list
   * @secure
   */
  getBrc20AuctionList = (
    data: {
      filter: {
        nftType: "brc20";
        address?: string;
        tick?: string;
        minPrice?: number;
        maxPrice?: number;
        nftConfirm?: boolean;
        /** Whether order ends */
        isEnd?: boolean;
        /** Ignore start and limit and return all collection data */
        all?: boolean;
      };
      sort: {
        unitPrice?: 1 | -1;
        onSaleTime?: 1 | -1;
        initPrice?: 1 | -1;
        inscriptionNumber?: 1 | -1;
      };
      /** The data is looked up from start */
      start: number;
      /**
       * Limit the amount of data
       * @max 100
       * @exclusiveMax true
       */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list: {
            auctionId?: string | null;
            inscriptionId: string;
            inscriptionNumber?: number | null;
            marketType?: string | null;
            address?: string | null;
            price?: number | null;
            nftType?: string | null;
            /** Brc20 field */
            tick?: string | null;
            /** Brc20 field */
            limit?: number | null;
            /** Brc20 field */
            amount?: number | null;
            /** Brc20 field */
            unitPrice?: number | null;
          }[];
          total: number;
          timestamp?: number;
        };
      },
      any
    >({
      path: `/v3/market/brc20/auction/list`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name GetBrc20InscriptionInfo
   * @summary Retrieve inscription information, including brc20, names, collection. It is necessary to first determine the inscription type before calling the relevant services.
   * @request POST:/v3/market/brc20/auction/inscription_info
   * @secure
   */
  getBrc20InscriptionInfo = (
    data: MarketInscriptionInfoRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketInscriptionInfoResponse, any>({
      path: `/v3/market/brc20/auction/inscription_info`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name GetBrc20InscriptionInfoList
   * @summary Get the basic listing information of the specified inscription list
   * @request POST:/v3/market/brc20/auction/inscription_info_list
   * @secure
   */
  getBrc20InscriptionInfoList = (
    data: MarketInscriptionInfoListRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketInscriptionInfoListResponse, any>({
      path: `/v3/market/brc20/auction/inscription_info_list`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name GetBrc20AuctionActions
   * @summary Get information on listings, delistings, and sales.
   * @request POST:/v3/market/brc20/auction/actions
   * @secure
   */
  getBrc20AuctionActions = (
    data: {
      filter: {
        nftType?: "brc20";
        address?: string;
        inscriptionId?: string;
        /** Event type: Cancel, Listed, Sold, Updated */
        event?: "Cancel" | "Claim" | "Listed" | "Sold" | "Updated";
        tick?: string;
      };
      start: number;
      /**
       * @max 100
       * @exclusiveMax true
       */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list?: {
            auctionId: string;
            inscriptionId: string;
            inscriptionNumber: number;
            event: "Listed" | "Sold" | "Cancel" | "Claim" | "Updated";
            price: number;
            from: string;
            to: string | null;
            timestamp: number;
            nftConfirmNum?: number;
            nftType?: "brc20" | "domain" | "collection";
            /** An error message generated by the order */
            endMsg?: string | null;
            /** The update order generates multiple events */
            newest?: boolean;
            /** Brc20 filed */
            name?: string | null;
            /** Brc20 filed */
            unitPrice?: number | null;
            /** Brc20 filed */
            amount?: number | null;
            /** Domain filed */
            domain?: string | null;
            /** Domain filed */
            domainType?:
              | "sats"
              | "unisat"
              | "btc"
              | "xbt"
              | "ord"
              | "gm"
              | "bitmap"
              | "x"
              | null;
            /** Domain filed */
            domainCategorys?:
              | (
                  | "Keyboard"
                  | "Non Keyboard"
                  | "1-99"
                  | "3D"
                  | "4D"
                  | "5D"
                  | "Single Emoji"
                  | "Multi Emoji"
                  | "Common Word"
                  | "1 Letter + 1 Number"
                  | "2 Letters"
                  | "3 Letters"
                  | "Numbers"
                )[]
              | null;
            /** Collection filed */
            collectionId?: string | null;
            /** Collection filed */
            collectionItemName?: string | null;
            /** Collection filed */
            contentType?: string | null;
            /** Collection filed */
            contentBody?: string | null;
            /** Collection filed */
            attributes?:
              | {
                  trait_type?: string;
                  value?: string;
                }[]
              | null;
          }[];
          total: number;
        };
      },
      any
    >({
      path: `/v3/market/brc20/auction/actions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name CreateBrc20PutOn
   * @summary Create listing order.
   * @request POST:/v3/market/brc20/auction/create_put_on
   * @secure
   */
  createBrc20PutOn = (
    data: MarketCreatePutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreatePutOnResponse, any>({
      path: `/v3/market/brc20/auction/create_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name ConfirmBrc20PutOn
   * @summary Confirm listing order.
   * @request POST:/v3/market/brc20/auction/confirm_put_on
   * @secure
   */
  confirmBrc20PutOn = (
    data: MarketConfirmPutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmPutOnResponse, any>({
      path: `/v3/market/brc20/auction/confirm_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name CreateBrc20BidPrepare
   * @summary Return params before creating purchase order.
   * @request POST:/v3/market/brc20/auction/create_bid_prepare
   * @secure
   */
  createBrc20BidPrepare = (
    data: MarketCreateBidPrepareRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBidPrepareResponse, any>({
      path: `/v3/market/brc20/auction/create_bid_prepare`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name CreateBrc20Bid
   * @summary Create purchase order.
   * @request POST:/v3/market/brc20/auction/create_bid
   * @secure
   */
  createBrc20Bid = (data: MarketCreateBidRequest, params: RequestParams = {}) =>
    this.request<MarketCreateBidResponse, any>({
      path: `/v3/market/brc20/auction/create_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name ConfirmBrc20Bid
   * @summary Confirm purchase order.
   * @request POST:/v3/market/brc20/auction/confirm_bid
   * @secure
   */
  confirmBrc20Bid = (
    data: MarketConfirmBidRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmBidResponse, any>({
      path: `/v3/market/brc20/auction/confirm_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name CreateBrc20PutOff
   * @summary Create delisting order.
   * @request POST:/v3/market/brc20/auction/create_put_off
   * @secure
   */
  createBrc20PutOff = (
    data: MarketCreatePutOffRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreatePutOffResponse, any>({
      path: `/v3/market/brc20/auction/create_put_off`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name ConfirmBrc20PutOff
   * @summary Confirm delisting order.
   * @request POST:/v3/market/brc20/auction/confirm_put_off
   * @secure
   */
  confirmBrc20PutOff = (
    data: MarketConfirmPutOffRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmPutOffResponse, any>({
      path: `/v3/market/brc20/auction/confirm_put_off`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name CreateBrc20ModifyPrice
   * @summary Create the order for price adjustment.
   * @request POST:/v3/market/brc20/auction/create_modify_price
   * @secure
   */
  createBrc20ModifyPrice = (
    data: MarketCreateModifyPriceRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateModifyPriceResponse, any>({
      path: `/v3/market/brc20/auction/create_modify_price`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-BRC20
   * @name ConfirmBrc20ModifyPrice
   * @summary Confirm the order for price adjustment.
   * @request POST:/v3/market/brc20/auction/confirm_modify_price
   * @secure
   */
  confirmBrc20ModifyPrice = (
    data: MarketConfirmModifyPriceRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmModifyPriceResponse, any>({
      path: `/v3/market/brc20/auction/confirm_modify_price`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get statistical data, price, market capitalization, etc. for runes.
   *
   * @tags MarketPlace-Runes
   * @name GetRunesTypes
   * @summary Get statistical data.
   * @request POST:/v3/market/runes/auction/runes_types
   * @secure
   */
  getRunesTypes = (
    data: {
      /** Optional: day1, day7, day30 */
      timeType?: "day1" | "day7" | "day30";
      start?: number;
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          BTCPrice: number;
          list?: {
            tick: string;
            curPrice: number;
            changePrice: number;
            btcVolume: number;
            amountVolume: number;
            cap: string;
            holders?: number;
            transactions?: number;
            warning?: boolean;
          }[];
        };
      },
      any
    >({
      path: `/v3/market/runes/auction/runes_types`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get statistical data, price, market capitalization, etc. for Runes.
   *
   * @tags MarketPlace-Runes
   * @name GetRunesTypesSpecified
   * @summary Get statistical data for specified runes.
   * @request POST:/v3/market/runes/auction/runes_types_specified
   * @secure
   */
  getRunesTypesSpecified = (
    data: {
      timeType?: "day1" | "day7" | "day30";
      tick?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          tick?: string;
          symbol?: string;
          curPrice?: number;
          changePrice?: number;
          btcVolume?: number;
          amountVolume?: number;
          cap?: string;
          capUSD?: string;
          deployTime?: number;
          holders?: number;
          number?: number;
          transactions?: number;
          warning?: boolean;
        };
      },
      any
    >({
      path: `/v3/market/runes/auction/runes_types_specified`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name GetRunesAuctionList
   * @summary Retrieve the list information of the market.
   * @request POST:/v3/market/runes/auction/list
   * @secure
   */
  getRunesAuctionList = (
    data: {
      filter: {
        nftType: "runes";
        address?: string;
        tick?: string;
        minPrice?: number;
        maxPrice?: number;
        nftConfirm?: boolean;
        /** Whether order ends */
        isEnd?: boolean;
        /** Ignore start and limit and return all collection data */
        all?: boolean;
      };
      sort: {
        unitPrice?: 1 | -1;
        onSaleTime?: 1 | -1;
        initPrice?: 1 | -1;
        inscriptionNumber?: 1 | -1;
      };
      /** The data is looked up from start */
      start: number;
      /**
       * Limit the amount of data
       * @max 100
       * @exclusiveMax true
       */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list: {
            auctionId?: string | null;
            inscriptionId: string;
            inscriptionNumber?: number | null;
            marketType?: string | null;
            address?: string | null;
            price?: number | null;
            nftType?: string | null;
            /** Brc20 field */
            tick?: string | null;
            /** Brc20 field */
            limit?: number | null;
            /** Brc20 field */
            amount?: number | null;
            /** Brc20 field */
            unitPrice?: number | null;
          }[];
          total: number;
          timestamp?: number;
        };
      },
      any
    >({
      path: `/v3/market/runes/auction/list`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name GetRunesAuctionActions
   * @summary Get information on listings, delistings, and sales.
   * @request POST:/v3/market/runes/auction/actions
   * @secure
   */
  getRunesAuctionActions = (
    data: {
      filter: {
        nftType?: "runes";
        address?: string;
        inscriptionId?: string;
        /** Event type: Cancel, Listed, Sold, Updated */
        event?: "Cancel" | "Claim" | "Listed" | "Sold" | "Updated";
        tick?: string;
      };
      start: number;
      /**
       * @max 100
       * @exclusiveMax true
       */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list?: {
            auctionId: string;
            inscriptionId: string;
            inscriptionNumber: number;
            event: "Listed" | "Sold" | "Cancel" | "Claim" | "Updated";
            price: number;
            from: string;
            to: string | null;
            timestamp: number;
            nftConfirmNum?: number;
            nftType?: "brc20" | "domain" | "collection";
            /** An error message generated by the order */
            endMsg?: string | null;
            /** The update order generates multiple events */
            newest?: boolean;
            /** Brc20 filed */
            name?: string | null;
            /** Brc20 filed */
            unitPrice?: number | null;
            /** Brc20 filed */
            amount?: number | null;
            /** Domain filed */
            domain?: string | null;
            /** Domain filed */
            domainType?:
              | "sats"
              | "unisat"
              | "btc"
              | "xbt"
              | "ord"
              | "gm"
              | "bitmap"
              | "x"
              | null;
            /** Domain filed */
            domainCategorys?:
              | (
                  | "Keyboard"
                  | "Non Keyboard"
                  | "1-99"
                  | "3D"
                  | "4D"
                  | "5D"
                  | "Single Emoji"
                  | "Multi Emoji"
                  | "Common Word"
                  | "1 Letter + 1 Number"
                  | "2 Letters"
                  | "3 Letters"
                  | "Numbers"
                )[]
              | null;
            /** Collection filed */
            collectionId?: string | null;
            /** Collection filed */
            collectionItemName?: string | null;
            /** Collection filed */
            contentType?: string | null;
            /** Collection filed */
            contentBody?: string | null;
            /** Collection filed */
            attributes?:
              | {
                  trait_type?: string;
                  value?: string;
                }[]
              | null;
          }[];
          total: number;
        };
      },
      any
    >({
      path: `/v3/market/runes/auction/actions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name CreateRunesPutOn
   * @summary Create listing order.
   * @request POST:/v3/market/runes/auction/create_put_on
   * @secure
   */
  createRunesPutOn = (
    data: RunesMarketCreatePutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreatePutOnResponse, any>({
      path: `/v3/market/runes/auction/create_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name ConfirmRunesPutOn
   * @summary Confirm listing order.
   * @request POST:/v3/market/runes/auction/confirm_put_on
   * @secure
   */
  confirmRunesPutOn = (
    data: MarketConfirmPutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmPutOnResponse, any>({
      path: `/v3/market/runes/auction/confirm_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name CreateRunesBidPrepare
   * @summary Return params before creating purchase order.
   * @request POST:/v3/market/runes/auction/create_bid_prepare
   * @secure
   */
  createRunesBidPrepare = (
    data: MarketCreateBidPrepareRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBidPrepareResponse, any>({
      path: `/v3/market/runes/auction/create_bid_prepare`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name CreateRunesBid
   * @summary Create purchase order.
   * @request POST:/v3/market/runes/auction/create_bid
   * @secure
   */
  createRunesBid = (data: MarketCreateBidRequest, params: RequestParams = {}) =>
    this.request<MarketCreateBidResponse, any>({
      path: `/v3/market/runes/auction/create_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name ConfirmRunesBid
   * @summary Confirm purchase order.
   * @request POST:/v3/market/runes/auction/confirm_bid
   * @secure
   */
  confirmRunesBid = (
    data: MarketConfirmBidRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmBidResponse, any>({
      path: `/v3/market/runes/auction/confirm_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name CreateRunesPutOff
   * @summary Create delisting order.
   * @request POST:/v3/market/runes/auction/create_put_off
   * @secure
   */
  createRunesPutOff = (
    data: MarketCreatePutOffRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreatePutOffResponse, any>({
      path: `/v3/market/runes/auction/create_put_off`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name ConfirmRunesPutOff
   * @summary Confirm delisting order.
   * @request POST:/v3/market/runes/auction/confirm_put_off
   * @secure
   */
  confirmRunesPutOff = (
    data: MarketConfirmPutOffRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmPutOffResponse, any>({
      path: `/v3/market/runes/auction/confirm_put_off`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name CreateRunesModifyPrice
   * @summary Create the order for price adjustment.
   * @request POST:/v3/market/runes/auction/create_modify_price
   * @secure
   */
  createRunesModifyPrice = (
    data: MarketCreateModifyPriceRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateModifyPriceResponse, any>({
      path: `/v3/market/runes/auction/create_modify_price`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name ConfirmRunesModifyPrice
   * @summary Confirm the order for price adjustment.
   * @request POST:/v3/market/runes/auction/confirm_modify_price
   * @secure
   */
  confirmRunesModifyPrice = (
    data: MarketConfirmModifyPriceRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmModifyPriceResponse, any>({
      path: `/v3/market/runes/auction/confirm_modify_price`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name CreateRunesBatchPutOn
   * @summary Create batch listing order.
   * @request POST:/v3/market/runes/auction/create_batch_put_on
   * @secure
   */
  createRunesBatchPutOn = (
    data: MarketCreateBatchPutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBatchPutOnResponse, any>({
      path: `/v3/market/runes/auction/create_batch_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name ConfirmRunesBatchPutOn
   * @summary Confirm batch listing order.
   * @request POST:/v3/market/runes/auction/confirm_batch_put_on
   * @secure
   */
  confirmRunesBatchPutOn = (
    data: MarketConfirmBatchPutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmBatchPutOnResponse, any>({
      path: `/v3/market/runes/auction/confirm_batch_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name CreateRunesBatchBidPrepare
   * @summary Return params before creating purchase order.
   * @request POST:/v3/market/runes/auction/create_batch_bid_prepare
   * @secure
   */
  createRunesBatchBidPrepare = (
    data: MarketCreateBatchBidPrepareRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBatchBidPrepareResponse, any>({
      path: `/v3/market/runes/auction/create_batch_bid_prepare`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name CreateRunesBatchBid
   * @summary Create purchase order.
   * @request POST:/v3/market/runes/auction/create_batch_bid
   * @secure
   */
  createRunesBatchBid = (
    data: MarketCreateBatchBidRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBatchBidResponse, any>({
      path: `/v3/market/runes/auction/create_batch_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Runes
   * @name ConfirmRunesBatchBid
   * @summary Confirm purchase order.
   * @request POST:/v3/market/runes/auction/confirm_batch_bid
   * @secure
   */
  confirmRunesBatchBid = (
    data: MarketConfirmBatchBidRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmBatchBidResponse, any>({
      path: `/v3/market/runes/auction/confirm_batch_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get statistical data, price, market capitalization, etc. for alkanes.
   *
   * @tags MarketPlace-Alkanes
   * @name GetAlkanesTypes
   * @summary Get statistical data
   * @request POST:/v3/market/alkanes/auction/alkanes_types
   * @secure
   */
  getAlkanesTypes = (
    data: {
      /** Optional: day1, day7, day30 */
      timeType?: "day1" | "day7" | "day30";
      start?: number;
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          BTCPrice: number;
          list?: {
            tick: string;
            curPrice: number;
            changePrice: number;
            btcVolume: number;
            amountVolume: number;
            cap: string;
            holders?: number;
            transactions?: number;
            warning?: boolean;
          }[];
        };
      },
      any
    >({
      path: `/v3/market/alkanes/auction/alkanes_types`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get statistical data, price, market capitalization, etc. for Alkanes.
   *
   * @tags MarketPlace-Alkanes
   * @name GetAlkanesTypesSpecified
   * @summary Get statistical data for specified alkanes.
   * @request POST:/v3/market/alkanes/auction/alkanes_types_specified
   * @secure
   */
  getAlkanesTypesSpecified = (
    data: {
      timeType?: "day1" | "day7" | "day30";
      tick?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          tick?: string;
          symbol?: string;
          curPrice?: number;
          changePrice?: number;
          btcVolume?: number;
          amountVolume?: number;
          cap?: string;
          capUSD?: string;
          deployTime?: number;
          holders?: number;
          number?: number;
          transactions?: number;
          warning?: boolean;
        };
      },
      any
    >({
      path: `/v3/market/alkanes/auction/alkanes_types_specified`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name GetAlkanesAuctionList
   * @summary Retrieve the list information of the market.
   * @request POST:/v3/market/alkanes/auction/list
   * @secure
   */
  getAlkanesAuctionList = (
    data: {
      filter: {
        nftType: "brc20";
        address?: string;
        tick?: string;
        minPrice?: number;
        maxPrice?: number;
        nftConfirm?: boolean;
        /** Whether order ends */
        isEnd?: boolean;
        /** Ignore start and limit and return all collection data */
        all?: boolean;
      };
      sort: {
        unitPrice?: 1 | -1;
        onSaleTime?: 1 | -1;
        initPrice?: 1 | -1;
        inscriptionNumber?: 1 | -1;
      };
      /** The data is looked up from start */
      start: number;
      /**
       * Limit the amount of data
       * @max 100
       * @exclusiveMax true
       */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list: {
            auctionId?: string | null;
            inscriptionId: string;
            inscriptionNumber?: number | null;
            marketType?: string | null;
            address?: string | null;
            price?: number | null;
            nftType?: string | null;
            /** Brc20 field */
            tick?: string | null;
            /** Brc20 field */
            limit?: number | null;
            /** Brc20 field */
            amount?: number | null;
            /** Brc20 field */
            unitPrice?: number | null;
          }[];
          total: number;
          timestamp?: number;
        };
      },
      any
    >({
      path: `/v3/market/alkanes/auction/list`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name GetAlkanesAuctionActions
   * @summary Get information on listings, delistings, and sales.
   * @request POST:/v3/market/alkanes/auction/actions
   * @secure
   */
  getAlkanesAuctionActions = (
    data: {
      filter: {
        nftType?: "brc20";
        address?: string;
        inscriptionId?: string;
        /** Event type: Cancel, Listed, Sold, Updated */
        event?: "Cancel" | "Claim" | "Listed" | "Sold" | "Updated";
        tick?: string;
      };
      start: number;
      /**
       * @max 100
       * @exclusiveMax true
       */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list?: {
            auctionId: string;
            inscriptionId: string;
            inscriptionNumber: number;
            event: "Listed" | "Sold" | "Cancel" | "Claim" | "Updated";
            price: number;
            from: string;
            to: string | null;
            timestamp: number;
            nftConfirmNum?: number;
            nftType?: "brc20" | "domain" | "collection";
            /** An error message generated by the order */
            endMsg?: string | null;
            /** The update order generates multiple events */
            newest?: boolean;
            /** Brc20 filed */
            name?: string | null;
            /** Brc20 filed */
            unitPrice?: number | null;
            /** Brc20 filed */
            amount?: number | null;
            /** Domain filed */
            domain?: string | null;
            /** Domain filed */
            domainType?:
              | "sats"
              | "unisat"
              | "btc"
              | "xbt"
              | "ord"
              | "gm"
              | "bitmap"
              | "x"
              | null;
            /** Domain filed */
            domainCategorys?:
              | (
                  | "Keyboard"
                  | "Non Keyboard"
                  | "1-99"
                  | "3D"
                  | "4D"
                  | "5D"
                  | "Single Emoji"
                  | "Multi Emoji"
                  | "Common Word"
                  | "1 Letter + 1 Number"
                  | "2 Letters"
                  | "3 Letters"
                  | "Numbers"
                )[]
              | null;
            /** Collection filed */
            collectionId?: string | null;
            /** Collection filed */
            collectionItemName?: string | null;
            /** Collection filed */
            contentType?: string | null;
            /** Collection filed */
            contentBody?: string | null;
            /** Collection filed */
            attributes?:
              | {
                  trait_type?: string;
                  value?: string;
                }[]
              | null;
          }[];
          total: number;
        };
      },
      any
    >({
      path: `/v3/market/alkanes/auction/actions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name CreateAlkanesPutOn
   * @summary Create listing order.
   * @request POST:/v3/market/alkanes/auction/create_put_on
   * @secure
   */
  createAlkanesPutOn = (
    data: AlkanesMarketCreatePutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreatePutOnResponse, any>({
      path: `/v3/market/alkanes/auction/create_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name ConfirmAlkanesPutOn
   * @summary Confirm listing order.
   * @request POST:/v3/market/alkanes/auction/confirm_put_on
   * @secure
   */
  confirmAlkanesPutOn = (
    data: MarketConfirmPutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmPutOnResponse, any>({
      path: `/v3/market/alkanes/auction/confirm_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name CreateAlkanesBidPrepare
   * @summary Return params before creating purchase order.
   * @request POST:/v3/market/alkanes/auction/create_bid_prepare
   * @secure
   */
  createAlkanesBidPrepare = (
    data: MarketCreateBidPrepareRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBidPrepareResponse, any>({
      path: `/v3/market/alkanes/auction/create_bid_prepare`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name CreateAlkanesBid
   * @summary Create purchase order.
   * @request POST:/v3/market/alkanes/auction/create_bid
   * @secure
   */
  createAlkanesBid = (
    data: MarketCreateBidRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBidResponse, any>({
      path: `/v3/market/alkanes/auction/create_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name ConfirmAlkanesBid
   * @summary Confirm purchase order.
   * @request POST:/v3/market/alkanes/auction/confirm_bid
   * @secure
   */
  confirmAlkanesBid = (
    data: MarketConfirmBidRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmBidResponse, any>({
      path: `/v3/market/alkanes/auction/confirm_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name CreateAlkanesPutOff
   * @summary Create delisting order.
   * @request POST:/v3/market/alkanes/auction/create_put_off
   * @secure
   */
  createAlkanesPutOff = (
    data: MarketCreatePutOffRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreatePutOffResponse, any>({
      path: `/v3/market/alkanes/auction/create_put_off`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name ConfirmAlkanesPutOff
   * @summary Confirm delisting order.
   * @request POST:/v3/market/alkanes/auction/confirm_put_off
   * @secure
   */
  confirmAlkanesPutOff = (
    data: MarketConfirmPutOffRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmPutOffResponse, any>({
      path: `/v3/market/alkanes/auction/confirm_put_off`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name CreateAlkanesModifyPrice
   * @summary Create the order for price adjustment.
   * @request POST:/v3/market/alkanes/auction/create_modify_price
   * @secure
   */
  createAlkanesModifyPrice = (
    data: MarketCreateModifyPriceRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateModifyPriceResponse, any>({
      path: `/v3/market/alkanes/auction/create_modify_price`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name ConfirmAlkanesModifyPrice
   * @summary Confirm the order for price adjustment.
   * @request POST:/v3/market/alkanes/auction/confirm_modify_price
   * @secure
   */
  confirmAlkanesModifyPrice = (
    data: MarketConfirmModifyPriceRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmModifyPriceResponse, any>({
      path: `/v3/market/alkanes/auction/confirm_modify_price`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name CreateAlkanesBatchPutOn
   * @summary Create batch listing order.
   * @request POST:/v3/market/alkanes/auction/create_batch_put_on
   * @secure
   */
  createAlkanesBatchPutOn = (
    data: MarketCreateBatchPutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBatchPutOnResponse, any>({
      path: `/v3/market/alkanes/auction/create_batch_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name ConfirmAlkanesBatchPutOn
   * @summary Confirm batch listing order.
   * @request POST:/v3/market/alkanes/auction/confirm_batch_put_on
   * @secure
   */
  confirmAlkanesBatchPutOn = (
    data: MarketConfirmBatchPutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmBatchPutOnResponse, any>({
      path: `/v3/market/alkanes/auction/confirm_batch_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name CreateAlkanesBatchBidPrepare
   * @summary Return params before creating purchase order.
   * @request POST:/v3/market/alkanes/auction/create_batch_bid_prepare
   * @secure
   */
  createAlkanesBatchBidPrepare = (
    data: MarketCreateBatchBidPrepareRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBatchBidPrepareResponse, any>({
      path: `/v3/market/alkanes/auction/create_batch_bid_prepare`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name CreateAlkanesBatchBid
   * @summary Create purchase order.
   * @request POST:/v3/market/alkanes/auction/create_batch_bid
   * @secure
   */
  createAlkanesBatchBid = (
    data: MarketCreateBatchBidRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBatchBidResponse, any>({
      path: `/v3/market/alkanes/auction/create_batch_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Alkanes
   * @name ConfirmAlkanesBatchBid
   * @summary Confirm purchase order.
   * @request POST:/v3/market/alkanes/auction/confirm_batch_bid
   * @secure
   */
  confirmAlkanesBatchBid = (
    data: MarketConfirmBatchBidRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmBatchBidResponse, any>({
      path: `/v3/market/alkanes/auction/confirm_batch_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name GetCollectionStatistic
   * @summary Return a summary of collection.
   * @request POST:/v3/market/collection/auction/collection_statistic
   * @secure
   */
  getCollectionStatistic = (
    data: {
      collectionId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          collectionId?: string;
          /** Collection name */
          name?: string;
          /** Collection desc */
          desc?: string;
          /** Collection icon */
          icon?: string;
          /** Collection icon content type */
          iconContentType?: string;
          /** Total transaction volume */
          btcValue?: number;
          floorPrice?: number;
          pricePercent?: number;
          /** The quantity listed for sale */
          listed?: number;
          /** The quantity of items already produced */
          total?: number;
          supply?: number;
          twitter?: string;
          discord?: string;
          website?: string;
          /** Officially certified */
          verification?: boolean;
        };
      },
      any
    >({
      path: `/v3/market/collection/auction/collection_statistic`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name GetCollectionStatisticList
   * @summary Return a summary of collection.
   * @request POST:/v3/market/collection/auction/collection_statistic_list
   * @secure
   */
  getCollectionStatisticList = (
    data: {
      filter?: {
        timeType: string;
        name?: string;
        collections?: string[];
      };
      start: number;
      /**
       * @max 21
       * @exclusiveMax true
       */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list?: {
            collectionId?: string;
            /** Collection name */
            name?: string;
            /** Collection desc */
            desc?: string;
            /** Collection icon */
            icon?: string;
            /** Collection icon content type */
            iconContentType?: string;
            /** Total transaction volume */
            btcValue?: number;
            floorPrice?: number;
            pricePercent?: number;
            /** The quantity listed for sale */
            listed?: number;
            /** The quantity of items already produced */
            total?: number;
            supply?: number;
            twitter?: string;
            discord?: string;
            website?: string;
            /** Officially certified */
            verification?: boolean;
          }[];
          total?: number;
        };
      },
      any
    >({
      path: `/v3/market/collection/auction/collection_statistic_list`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name GetCollectionSummary
   * @summary Get the collection statistics information at a certain address
   * @request POST:/v3/market/collection/auction/collection_summary
   * @secure
   */
  getCollectionSummary = (
    data: {
      firstCollectionId?: string;
      address: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list?: {
            collectionId?: string;
            icon?: string;
            iconContentType?: string;
            name?: string;
            total?: number;
          }[];
        };
      },
      any
    >({
      path: `/v3/market/collection/auction/collection_summary`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name GetCollectionInscriptions
   * @summary Get the list details of a certain collection at a certain address
   * @request POST:/v3/market/collection/auction/collection_inscriptions
   * @secure
   */
  getCollectionInscriptions = (
    data: {
      collectionId: string;
      address: string;
      start: number;
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list?: {
            collectionId?: string;
            collectionName?: string;
            collectionItemName?: string;
            collectionHighResImgUrl?: string;
            inscriptionId?: string;
            inscriptionNumber?: number;
            contentType?: string;
            listed?: boolean;
          }[];
          total?: number;
        };
      },
      any
    >({
      path: `/v3/market/collection/auction/collection_inscriptions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name GetInscriptionInfo
   * @summary Retrieve inscription information, including brc20, names, collection. It is necessary to first determine the inscription type before calling the relevant services.
   * @request POST:/v3/market/collection/auction/inscription_info
   * @secure
   */
  getInscriptionInfo = (
    data: MarketInscriptionInfoRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketInscriptionInfoResponse, any>({
      path: `/v3/market/collection/auction/inscription_info`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name GetInscriptionInfoList
   * @summary Get the basic listing information of the specified inscription list
   * @request POST:/v3/market/collection/auction/inscription_info_list
   * @secure
   */
  getInscriptionInfoList = (
    data: MarketInscriptionInfoListRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketInscriptionInfoListResponse, any>({
      path: `/v3/market/collection/auction/inscription_info_list`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name GetMarketList
   * @summary Retrieve the list information of the market.
   * @request POST:/v3/market/collection/auction/list
   * @secure
   */
  getMarketList = (
    data: {
      filter: {
        nftType: "collection";
        address?: string;
        tick?: string;
        minPrice?: number;
        maxPrice?: number;
        nftConfirm?: boolean;
        /** Whether order ends */
        isEnd?: boolean;
        domainType?:
          | "sats"
          | "unisat"
          | "btc"
          | "xbt"
          | "ord"
          | "gm"
          | "bitmap"
          | "x";
        /**
         * @min 0
         * @exclusiveMin true
         */
        domainMinLength?: number;
        domainMaxLength?: number;
        domainCategory?: string;
        /** Fuzzy domain name search */
        domainFuzzy?: string;
        collectionId?: string;
        /** Fuzzy collection name search */
        collectionFuzzy?: string;
        /** Ignore start and limit and return all collection data */
        all?: boolean;
      };
      sort: {
        unitPrice?: 1 | -1;
        onSaleTime?: 1 | -1;
        initPrice?: 1 | -1;
        inscriptionNumber?: 1 | -1;
      };
      /** The data is looked up from start */
      start: number;
      /**
       * Limit the amount of data
       * @max 100
       * @exclusiveMax true
       */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list: {
            auctionId?: string | null;
            inscriptionId: string;
            inscriptionNumber?: number | null;
            marketType?: string | null;
            address?: string | null;
            price?: number | null;
            /** Domain name content support on sale */
            notSupport?: boolean;
            /** Whether the collection is validated */
            verification?: boolean;
            nftType?: string | null;
            /** Brc20 field */
            tick?: string | null;
            /** Brc20 field */
            limit?: number | null;
            /** Brc20 field */
            amount?: number | null;
            /** Brc20 field */
            unitPrice?: number | null;
            /** Collection field */
            collectionId?: string | null;
            /** Collection field */
            contentType?: string | null;
            /** Collection field */
            contentBody?: string | null;
            /** Collection field */
            collectionItemName?: string | null;
            /** Collection field */
            collectionHighResImgUrl?: string | null;
            /** Collection field */
            collectionName?: string | null;
            /** Collection field */
            notOnSale?: boolean | null;
            /** Domain field */
            domain?: string | null;
            /** Domain field */
            domainHex?: string | null;
            /** Domain field */
            domainType?:
              | "sats"
              | "unisat"
              | "btc"
              | "xbt"
              | "ord"
              | "gm"
              | "bitmap"
              | "x"
              | null;
          }[];
          total: number;
          timestamp?: number;
        };
      },
      any
    >({
      path: `/v3/market/collection/auction/list`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name GetMarketActions
   * @summary Get information on listings, delistings, and sales.
   * @request POST:/v3/market/collection/auction/actions
   * @secure
   */
  getMarketActions = (
    data: {
      filter: {
        nftType?: "collection";
        address?: string;
        inscriptionId?: string;
        /** Event type: Cancel, Listed, Sold, Updated */
        event?: "Cancel" | "Claim" | "Listed" | "Sold" | "Updated";
        tick?: string;
        domainType?: string;
        collectionId?: string;
      };
      start: number;
      /**
       * @max 100
       * @exclusiveMax true
       */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list?: {
            auctionId: string;
            inscriptionId: string;
            inscriptionNumber: number;
            event: "Listed" | "Sold" | "Cancel" | "Claim" | "Updated";
            price: number;
            from: string;
            to: string | null;
            timestamp: number;
            nftConfirmNum?: number;
            nftType?: "brc20" | "domain" | "collection";
            /** An error message generated by the order */
            endMsg?: string | null;
            /** The update order generates multiple events */
            newest?: boolean;
            /** Brc20 filed */
            name?: string | null;
            /** Brc20 filed */
            unitPrice?: number | null;
            /** Brc20 filed */
            amount?: number | null;
            /** Domain filed */
            domain?: string | null;
            /** Domain filed */
            domainType?:
              | "sats"
              | "unisat"
              | "btc"
              | "xbt"
              | "ord"
              | "gm"
              | "bitmap"
              | "x"
              | null;
            /** Domain filed */
            domainCategorys?:
              | (
                  | "Keyboard"
                  | "Non Keyboard"
                  | "1-99"
                  | "3D"
                  | "4D"
                  | "5D"
                  | "Single Emoji"
                  | "Multi Emoji"
                  | "Common Word"
                  | "1 Letter + 1 Number"
                  | "2 Letters"
                  | "3 Letters"
                  | "Numbers"
                )[]
              | null;
            /** Collection filed */
            collectionId?: string | null;
            /** Collection filed */
            collectionItemName?: string | null;
            /** Collection filed */
            contentType?: string | null;
            /** Collection filed */
            contentBody?: string | null;
            /** Collection filed */
            attributes?:
              | {
                  trait_type?: string;
                  value?: string;
                }[]
              | null;
          }[];
          total: number;
        };
      },
      any
    >({
      path: `/v3/market/collection/auction/actions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name CreateMarketPutOn
   * @summary Create listing order.
   * @request POST:/v3/market/collection/auction/create_put_on
   * @secure
   */
  createMarketPutOn = (
    data: MarketCreatePutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreatePutOnResponse, any>({
      path: `/v3/market/collection/auction/create_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name ConfirmMarketPutOn
   * @summary Confirm listing order.
   * @request POST:/v3/market/collection/auction/confirm_put_on
   * @secure
   */
  confirmMarketPutOn = (
    data: MarketConfirmPutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmPutOnResponse, any>({
      path: `/v3/market/collection/auction/confirm_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name CreateMarketBidPrepare
   * @summary Return params before creating purchase order.
   * @request POST:/v3/market/collection/auction/create_bid_prepare
   * @secure
   */
  createMarketBidPrepare = (
    data: MarketCreateBidPrepareRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBidPrepareResponse, any>({
      path: `/v3/market/collection/auction/create_bid_prepare`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name CreateMarketBid
   * @summary Create purchase order.
   * @request POST:/v3/market/collection/auction/create_bid
   * @secure
   */
  createMarketBid = (
    data: MarketCreateBidRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBidResponse, any>({
      path: `/v3/market/collection/auction/create_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name ConfirmMarketBid
   * @summary Confirm purchase order.
   * @request POST:/v3/market/collection/auction/confirm_bid
   * @secure
   */
  confirmMarketBid = (
    data: MarketConfirmBidRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmBidResponse, any>({
      path: `/v3/market/collection/auction/confirm_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name CreateMarketPutOff
   * @summary Create delisting order.
   * @request POST:/v3/market/collection/auction/create_put_off
   * @secure
   */
  createMarketPutOff = (
    data: MarketCreatePutOffRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreatePutOffResponse, any>({
      path: `/v3/market/collection/auction/create_put_off`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name ConfirmMarketPutOff
   * @summary Confirm delisting order.
   * @request POST:/v3/market/collection/auction/confirm_put_off
   * @secure
   */
  confirmMarketPutOff = (
    data: MarketConfirmPutOffRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmPutOffResponse, any>({
      path: `/v3/market/collection/auction/confirm_put_off`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name CreateMarketModifyPrice
   * @summary Create the order for price adjustment.
   * @request POST:/v3/market/collection/auction/create_modify_price
   * @secure
   */
  createMarketModifyPrice = (
    data: MarketCreateModifyPriceRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateModifyPriceResponse, any>({
      path: `/v3/market/collection/auction/create_modify_price`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Collection
   * @name ConfirmMarketModifyPrice
   * @summary Confirm the order for price adjustment.
   * @request POST:/v3/market/collection/auction/confirm_modify_price
   * @secure
   */
  confirmMarketModifyPrice = (
    data: MarketConfirmModifyPriceRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmModifyPriceResponse, any>({
      path: `/v3/market/collection/auction/confirm_modify_price`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get statistical data, price, market capitalization, etc. for domain.
   *
   * @tags MarketPlace-Domain
   * @name GetDomainTypes
   * @summary Get statistical data.
   * @request POST:/v3/market/domain/auction/domain_types
   * @secure
   */
  getDomainTypes = (params: RequestParams = {}) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list?: {
            btcVolume?: number;
            btcVolumePercent?: number;
            amountVolume?: number;
            curPrice?: number;
            domainType?: string;
          }[];
        };
      },
      any
    >({
      path: `/v3/market/domain/auction/domain_types`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name GetDomainStatistic
   * @summary Return a summary of domain.
   * @request POST:/v3/market/domain/auction/domain_statistic
   * @secure
   */
  getDomainStatistic = (
    data: {
      domainType: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list?: {
            demo?: string;
            domainCategory?: string;
            total?: number;
          }[];
        };
      },
      any
    >({
      path: `/v3/market/domain/auction/domain_statistic`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name GetDomainInscriptionInfo
   * @summary Retrieve inscription information, including brc20, names, collection. It is necessary to first determine the inscription type before calling the relevant services.
   * @request POST:/v3/market/domain/auction/inscription_info
   * @secure
   */
  getDomainInscriptionInfo = (
    data: MarketInscriptionInfoRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketInscriptionInfoResponse, any>({
      path: `/v3/market/domain/auction/inscription_info`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name GetDomainInscriptionInfoList
   * @summary Get the basic listing information of the specified inscription list
   * @request POST:/v3/market/domain/auction/inscription_info_list
   * @secure
   */
  getDomainInscriptionInfoList = (
    data: MarketInscriptionInfoListRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketInscriptionInfoListResponse, any>({
      path: `/v3/market/domain/auction/inscription_info_list`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name GetDomainMarketList
   * @summary Retrieve the list information of the market.
   * @request POST:/v3/market/domain/auction/list
   * @secure
   */
  getDomainMarketList = (
    data: {
      filter: {
        nftType: "domain";
        address?: string;
        tick?: string;
        minPrice?: number;
        maxPrice?: number;
        nftConfirm?: boolean;
        /** Whether order ends */
        isEnd?: boolean;
        domainType?:
          | "sats"
          | "unisat"
          | "btc"
          | "xbt"
          | "ord"
          | "gm"
          | "bitmap"
          | "x";
        /**
         * @min 0
         * @exclusiveMin true
         */
        domainMinLength?: number;
        domainMaxLength?: number;
        domainCategory?: string;
        /** Fuzzy domain name search */
        domainFuzzy?: string;
        collectionId?: string;
        /** Fuzzy collection name search */
        collectionFuzzy?: string;
        /** Ignore start and limit and return all collection data */
        all?: boolean;
      };
      sort: {
        unitPrice?: 1 | -1;
        onSaleTime?: 1 | -1;
        initPrice?: 1 | -1;
        inscriptionNumber?: 1 | -1;
      };
      /** The data is looked up from start */
      start: number;
      /**
       * Limit the amount of data
       * @max 100
       * @exclusiveMax true
       */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list: {
            auctionId?: string | null;
            inscriptionId: string;
            inscriptionNumber?: number | null;
            marketType?: string | null;
            address?: string | null;
            price?: number | null;
            /** Domain name content support on sale */
            notSupport?: boolean;
            /** Whether the collection is validated */
            verification?: boolean;
            nftType?: string | null;
            /** Brc20 field */
            tick?: string | null;
            /** Brc20 field */
            limit?: number | null;
            /** Brc20 field */
            amount?: number | null;
            /** Brc20 field */
            unitPrice?: number | null;
            /** Collection field */
            collectionId?: string | null;
            /** Collection field */
            contentType?: string | null;
            /** Collection field */
            contentBody?: string | null;
            /** Collection field */
            collectionItemName?: string | null;
            /** Collection field */
            collectionHighResImgUrl?: string | null;
            /** Collection field */
            collectionName?: string | null;
            /** Collection field */
            notOnSale?: boolean | null;
            /** Domain field */
            domain?: string | null;
            /** Domain field */
            domainHex?: string | null;
            /** Domain field */
            domainType?:
              | "sats"
              | "unisat"
              | "btc"
              | "xbt"
              | "ord"
              | "gm"
              | "bitmap"
              | "x"
              | null;
          }[];
          total: number;
          timestamp?: number;
        };
      },
      any
    >({
      path: `/v3/market/domain/auction/list`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name GetDomainMarketActions
   * @summary Get information on listings, delistings, and sales.
   * @request POST:/v3/market/domain/auction/actions
   * @secure
   */
  getDomainMarketActions = (
    data: {
      filter: {
        nftType?: "domain";
        address?: string;
        inscriptionId?: string;
        /** Event type: Cancel, Listed, Sold, Updated */
        event?: "Cancel" | "Claim" | "Listed" | "Sold" | "Updated";
        tick?: string;
        domainType?: string;
        collectionId?: string;
      };
      start: number;
      /**
       * @max 100
       * @exclusiveMax true
       */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list?: {
            auctionId: string;
            inscriptionId: string;
            inscriptionNumber: number;
            event: "Listed" | "Sold" | "Cancel" | "Claim" | "Updated";
            price: number;
            from: string;
            to: string | null;
            timestamp: number;
            nftConfirmNum?: number;
            nftType?: "brc20" | "domain" | "collection";
            /** An error message generated by the order */
            endMsg?: string | null;
            /** The update order generates multiple events */
            newest?: boolean;
            /** Brc20 filed */
            name?: string | null;
            /** Brc20 filed */
            unitPrice?: number | null;
            /** Brc20 filed */
            amount?: number | null;
            /** Domain filed */
            domain?: string | null;
            /** Domain filed */
            domainType?:
              | "sats"
              | "unisat"
              | "btc"
              | "xbt"
              | "ord"
              | "gm"
              | "bitmap"
              | "x"
              | null;
            /** Domain filed */
            domainCategorys?:
              | (
                  | "Keyboard"
                  | "Non Keyboard"
                  | "1-99"
                  | "3D"
                  | "4D"
                  | "5D"
                  | "Single Emoji"
                  | "Multi Emoji"
                  | "Common Word"
                  | "1 Letter + 1 Number"
                  | "2 Letters"
                  | "3 Letters"
                  | "Numbers"
                )[]
              | null;
            /** Collection filed */
            collectionId?: string | null;
            /** Collection filed */
            collectionItemName?: string | null;
            /** Collection filed */
            contentType?: string | null;
            /** Collection filed */
            contentBody?: string | null;
            /** Collection filed */
            attributes?:
              | {
                  trait_type?: string;
                  value?: string;
                }[]
              | null;
          }[];
          total: number;
        };
      },
      any
    >({
      path: `/v3/market/domain/auction/actions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name CreateDomainMarketPutOn
   * @summary Create listing order.
   * @request POST:/v3/market/domain/auction/create_put_on
   * @secure
   */
  createDomainMarketPutOn = (
    data: MarketCreatePutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreatePutOnResponse, any>({
      path: `/v3/market/domain/auction/create_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name ConfirmDomainMarketPutOn
   * @summary Confirm listing order.
   * @request POST:/v3/market/domain/auction/confirm_put_on
   * @secure
   */
  confirmDomainMarketPutOn = (
    data: MarketConfirmPutOnRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmPutOnResponse, any>({
      path: `/v3/market/domain/auction/confirm_put_on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name CreateDomainMarketBidPrepare
   * @summary Return params before creating purchase order.
   * @request POST:/v3/market/domain/auction/create_bid_prepare
   * @secure
   */
  createDomainMarketBidPrepare = (
    data: MarketCreateBidPrepareRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBidPrepareResponse, any>({
      path: `/v3/market/domain/auction/create_bid_prepare`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name CreateDomainMarketBid
   * @summary Create purchase order.
   * @request POST:/v3/market/domain/auction/create_bid
   * @secure
   */
  createDomainMarketBid = (
    data: MarketCreateBidRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateBidResponse, any>({
      path: `/v3/market/domain/auction/create_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name ConfirmDomainMarketBid
   * @summary Confirm purchase order.
   * @request POST:/v3/market/domain/auction/confirm_bid
   * @secure
   */
  confirmDomainMarketBid = (
    data: MarketConfirmBidRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmBidResponse, any>({
      path: `/v3/market/domain/auction/confirm_bid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name CreateDomainMarketPutOff
   * @summary Create delisting order.
   * @request POST:/v3/market/domain/auction/create_put_off
   * @secure
   */
  createDomainMarketPutOff = (
    data: MarketCreatePutOffRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreatePutOffResponse, any>({
      path: `/v3/market/domain/auction/create_put_off`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name ConfirmDomainMarketPutOff
   * @summary Confirm delisting order.
   * @request POST:/v3/market/domain/auction/confirm_put_off
   * @secure
   */
  confirmDomainMarketPutOff = (
    data: MarketConfirmPutOffRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmPutOffResponse, any>({
      path: `/v3/market/domain/auction/confirm_put_off`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name CreateDomainMarketModifyPrice
   * @summary Create the order for price adjustment.
   * @request POST:/v3/market/domain/auction/create_modify_price
   * @secure
   */
  createDomainMarketModifyPrice = (
    data: MarketCreateModifyPriceRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketCreateModifyPriceResponse, any>({
      path: `/v3/market/domain/auction/create_modify_price`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MarketPlace-Domain
   * @name ConfirmDomainMarketModifyPrice
   * @summary Confirm the order for price adjustment.
   * @request POST:/v3/market/domain/auction/confirm_modify_price
   * @secure
   */
  confirmDomainMarketModifyPrice = (
    data: MarketConfirmModifyPriceRequest,
    params: RequestParams = {},
  ) =>
    this.request<MarketConfirmModifyPriceResponse, any>({
      path: `/v3/market/domain/auction/confirm_modify_price`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
