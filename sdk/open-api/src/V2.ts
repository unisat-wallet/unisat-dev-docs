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
  Order,
  OrderCreateBRC205ByteMintParams,
  OrderCreateBRC20DeployParams,
  OrderCreateBRC20MintParams,
  OrderCreateBRC20TransferParams,
  OrderCreateParams,
  OrderCreateRunesEtchParams,
  OrderCreateRunesMintParams,
  OrderRequestCommitBRC205ByteMintParams,
  OrderRequestCommitBRC205ByteMintResponse,
  OrderSignCommitBRC205ByteMintParams,
  OrderSignCommitBRC205ByteMintResponse,
  OrderSignRevealBRC205ByteMintParams,
  OrderSignRevealBRC205ByteMintResponse,
  OrderSummary,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class V2<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Inscribe
   * @name GetOrderSummary
   * @summary Get order summary of current apikey
   * @request GET:/v2/inscribe/order/summary
   * @secure
   */
  getOrderSummary = (params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        /** @example "OK" */
        msg?: string;
        data?: OrderSummary;
      },
      void
    >({
      path: `/v2/inscribe/order/summary`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get order list of current apikey
   *
   * @tags Inscribe
   * @name GetOrderList
   * @summary Get order list of current apikey
   * @request GET:/v2/inscribe/order/list
   * @secure
   */
  getOrderList = (
    query: {
      /**
       * Start offset
       * @example 0
       */
      cursor: number;
      /**
       * Number of items returned
       * @example 16
       */
      size: number;
      /**
       * Sort by (asc/desc)
       * @example "asc"
       */
      sort?: "asc" | "desc";
      /** Status of order */
      status?: "pending" | "inscribing" | "minted" | "closed" | "refunded";
      /** ReceiveAddress of order */
      receiveAddress?: string;
      /** ClientId of order */
      clientId?: string;
      /** Whether to include files */
      withFiles?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: {
          detail?: Order[];
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v2/inscribe/order/list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description It's recommended to query the latest status every 10 seconds. _amount = outputValue*count + minerFee + serviceFee + devFee_
   *
   * @tags Inscribe
   * @name GetOrderById
   * @summary Search an order by orderId
   * @request GET:/v2/inscribe/order/{orderId}
   * @secure
   */
  getOrderById = (orderId: string, params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        /** @example "OK" */
        msg?: string;
        data?: Order;
      },
      void
    >({
      path: `/v2/inscribe/order/${orderId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Create an order to inscribe something
   *
   * @tags Inscribe
   * @name CreateOrder
   * @summary Create an order
   * @request POST:/v2/inscribe/order/create
   * @secure
   */
  createOrder = (data: OrderCreateParams, params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: Order;
      },
      void
    >({
      path: `/v2/inscribe/order/create`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Deprecated, please use /order/create instead
   *
   * @tags Inscribe Deprecated
   * @name CreateOrderBrc20Deploy
   * @summary Create an order to inscribe BRC-20 DEPLOY (Deprecated)
   * @request POST:/v2/inscribe/order/create/brc20-deploy
   * @secure
   */
  createOrderBrc20Deploy = (
    data: OrderCreateBRC20DeployParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: Order;
      },
      void
    >({
      path: `/v2/inscribe/order/create/brc20-deploy`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Deprecated, please use /order/create instead
   *
   * @tags Inscribe Deprecated
   * @name CreateOrderBrc20Mint
   * @summary Create an order to inscribe BRC-20 MINT (Deprecated)
   * @request POST:/v2/inscribe/order/create/brc20-mint
   * @secure
   */
  createOrderBrc20Mint = (
    data: OrderCreateBRC20MintParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: Order;
      },
      void
    >({
      path: `/v2/inscribe/order/create/brc20-mint`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Deprecated, please use /order/create instead
   *
   * @tags Inscribe Deprecated
   * @name CreateOrderBrc20Transfer
   * @summary Create an order to inscribe BRC-20 TRANSFER (Deprecated)
   * @request POST:/v2/inscribe/order/create/brc20-transfer
   * @secure
   */
  createOrderBrc20Transfer = (
    data: OrderCreateBRC20TransferParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: Order;
      },
      void
    >({
      path: `/v2/inscribe/order/create/brc20-transfer`,
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
   * @tags Inscribe
   * @name RequestCommit
   * @summary Request commit txs of some order
   * @request POST:/v2/inscribe/order/request-commit
   * @secure
   */
  requestCommit = (
    data: OrderRequestCommitBRC205ByteMintParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: OrderRequestCommitBRC205ByteMintResponse;
      },
      void
    >({
      path: `/v2/inscribe/order/request-commit`,
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
   * @tags Inscribe
   * @name SignCommit
   * @summary Sign commit txs of some order
   * @request POST:/v2/inscribe/order/sign-commit
   * @secure
   */
  signCommit = (
    data: OrderSignCommitBRC205ByteMintParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: OrderSignCommitBRC205ByteMintResponse;
      },
      void
    >({
      path: `/v2/inscribe/order/sign-commit`,
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
   * @tags Inscribe
   * @name SignReveal
   * @summary Sign reveal txs of some order
   * @request POST:/v2/inscribe/order/sign-reveal
   * @secure
   */
  signReveal = (
    data: OrderSignRevealBRC205ByteMintParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: OrderSignRevealBRC205ByteMintResponse;
      },
      void
    >({
      path: `/v2/inscribe/order/sign-reveal`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Deprecated, please use /order/create instead
   *
   * @tags Inscribe Deprecated
   * @name CreateOrderBrc205ByteMint
   * @summary Create an order to inscribe BRC-20 MINT (Deprecated)
   * @request POST:/v2/inscribe/order/create/brc20-5byte-mint
   * @secure
   */
  createOrderBrc205ByteMint = (
    data: OrderCreateBRC205ByteMintParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: Order;
      },
      void
    >({
      path: `/v2/inscribe/order/create/brc20-5byte-mint`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Deprecated, please use /order/request-commit instead
   *
   * @tags Inscribe Deprecated
   * @name RequestCommitBrc205ByteMint
   * @summary Request commit txs of brc20-5byte-mint. (Deprecated)
   * @request POST:/v2/inscribe/order/request-commit/brc20-5byte-mint
   * @secure
   */
  requestCommitBrc205ByteMint = (
    data: OrderRequestCommitBRC205ByteMintParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: OrderRequestCommitBRC205ByteMintResponse;
      },
      void
    >({
      path: `/v2/inscribe/order/request-commit/brc20-5byte-mint`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Deprecated, please use /order/sign-commit instead
   *
   * @tags Inscribe Deprecated
   * @name SignCommitBrc205ByteMint
   * @summary Sign commit txs of brc20-5byte-mint (Deprecated)
   * @request POST:/v2/inscribe/order/sign-commit/brc20-5byte-mint
   * @secure
   */
  signCommitBrc205ByteMint = (
    data: OrderSignCommitBRC205ByteMintParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: OrderSignCommitBRC205ByteMintResponse;
      },
      void
    >({
      path: `/v2/inscribe/order/sign-commit/brc20-5byte-mint`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Deprecated, please use /order/sign-reveal instead
   *
   * @tags Inscribe Deprecated
   * @name SignRevealBrc205ByteMint
   * @summary Sign reveal txs of brc20-5byte-mint (Deprecated)
   * @request POST:/v2/inscribe/order/sign-reveal/brc20-5byte-mint
   * @secure
   */
  signRevealBrc205ByteMint = (
    data: OrderSignRevealBRC205ByteMintParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: OrderSignRevealBRC205ByteMintResponse;
      },
      void
    >({
      path: `/v2/inscribe/order/sign-reveal/brc20-5byte-mint`,
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
   * @tags Inscribe
   * @name CreateOrderRunesEtch
   * @summary Create an order to etch Runes
   * @request POST:/v2/inscribe/order/create/runes-etch
   * @secure
   */
  createOrderRunesEtch = (
    data: OrderCreateRunesEtchParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: Order;
      },
      void
    >({
      path: `/v2/inscribe/order/create/runes-etch`,
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
   * @tags Inscribe
   * @name CreateOrderRunesMint
   * @summary Create an order to mint Runes
   * @request POST:/v2/inscribe/order/create/runes-mint
   * @secure
   */
  createOrderRunesMint = (
    data: OrderCreateRunesMintParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        msg?: string;
        data?: Order;
      },
      void
    >({
      path: `/v2/inscribe/order/create/runes-mint`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description When the amount paid by the user includes inscriptions, inscribing cannot be performed. Refund can be requested through this method.
   *
   * @tags Inscribe
   * @name RefundOrder
   * @summary Process a refund for an order.
   * @request POST:/v2/inscribe/order/{orderId}/refund
   * @secure
   */
  refundOrder = (
    orderId: string,
    data: {
      /**
       * @format float
       * @example 1
       */
      refundFeeRate?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: {
          /** txid of refunded transaction */
          txid?: string;
        };
      },
      void
    >({
      path: `/v2/inscribe/order/${orderId}/refund`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description RefundAmount = PaidAmount - RefundTxSize * RefundFeeRate. This value must be greater than SafeRefundAmount, otherwise there's a risk of losing inscriptions used for payment due to errors.
   *
   * @tags Inscribe
   * @name EstimateRefundOrder
   * @summary Estimate the size of the refund transaction
   * @request POST:/v2/inscribe/order/{orderId}/refund-estimate
   * @secure
   */
  estimateRefundOrder = (orderId: string, params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: {
          /** @format int32 */
          paidAmount?: number;
          /**
           * The refund amount = size * refundFeeRate
           * @format int32
           */
          refundTxSize?: number;
          /** @format int32 */
          safeRefundAmount?: number;
        };
      },
      void
    >({
      path: `/v2/inscribe/order/${orderId}/refund-estimate`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
}
