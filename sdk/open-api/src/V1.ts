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
  AbandonNFTUTXO,
  AddressBalance,
  AlkaneEvent,
  AlkaneHolder,
  AlkaneInfo,
  AlkaneTransferHistory,
  AlkaneUtxo,
  AlkanesStatus,
  AlkanesUTXOBalance,
  BRC20HistoryInscription,
  BRC20HistoryItem,
  BRC20InfoItem,
  BlockInfo,
  CAT20TokenStats,
  FractalSupply,
  InscriptionData,
  InscriptionEvent,
  InscriptionItem,
  LocalPushParams,
  LocalPushtxsParams,
  ModuleHistoryItem,
  RuneEntry,
  RuneHolder,
  RuneStatus,
  RuneUtxo,
  RunesBalance,
  RunesEventItem,
  TxHistoryItem,
  UTXO,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class V1<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Get the current blockchain information, including chain type, block count, and best block hash.
   *
   * @tags Blocks
   * @name GetBlockchainInfo
   * @summary Get Blockchain Info
   * @request GET:/v1/indexer/blockchain/info
   * @secure
   */
  getBlockchainInfo = (params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: {
          chain?: string;
          blocks?: number;
          headers?: number;
          bestBlockHash?: string;
          prevBlockHash?: string;
          medianTime?: number;
          chainwork?: string;
        };
      },
      void
    >({
      path: `/v1/indexer/blockchain/info`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the recommended fees for different confirmation times. (like mempool.space)
   *
   * @tags Blocks
   * @name GetRecommendedFees
   * @summary Get Recommended Fees
   * @request GET:/v1/indexer/fees/recommended
   * @secure
   */
  getRecommendedFees = (params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: {
          fastestFee?: number;
          halfHourFee?: number;
          hourFee?: number;
          economyFee?: number;
          minimumFee?: number;
          updateTime?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/fees/recommended`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get block info by height.
   *
   * @tags Blocks
   * @name GetBlockByHeight
   * @summary Get block info by height
   * @request GET:/v1/indexer/height/{height}/block
   * @secure
   */
  getBlockByHeight = (height: number, params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: BlockInfo;
      },
      void
    >({
      path: `/v1/indexer/height/${height}/block`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get block info by blockid.
   *
   * @tags Blocks
   * @name GetBlockById
   * @summary Get block info by blockid
   * @request GET:/v1/indexer/block/id/{blockid}
   * @secure
   */
  getBlockById = (blockid: string, params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: BlockInfo;
      },
      void
    >({
      path: `/v1/indexer/block/id/${blockid}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get txs by block height.
   *
   * @tags Blocks
   * @name GetTxsByBlockHeight
   * @summary Get txs by block height.
   * @request GET:/v1/indexer/block/{height}/txs
   * @secure
   */
  getTxsByBlockHeight = (
    height: number,
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
          detail?: TxHistoryItem[];
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/block/${height}/txs`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get tx info by txid.
   *
   * @tags Transactions
   * @name GetTxById
   * @summary Get tx info by txid
   * @request GET:/v1/indexer/tx/{txid}
   * @secure
   */
  getTxById = (txid: string, params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: TxHistoryItem;
      },
      void
    >({
      path: `/v1/indexer/tx/${txid}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the inputs of a tx.
   *
   * @tags Transactions
   * @name GetInputsByTxId
   * @summary Get the inputs of a tx
   * @request GET:/v1/indexer/tx/{txid}/ins
   * @secure
   */
  getInputsByTxId = (
    txid: string,
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
          address?: string;
          /** 0~3: Reserved , 4: CodeType_P2PK, 5: CodeType_P2PKH, 6: CodeType_P2SH, 7: CodeType_P2WPKH, 8: CodeType_P2WSH, 9: CodeType_P2TR */
          codeType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
          inscriptions?: InscriptionItem[];
          satoshi?: number;
          scriptPk?: string;
          scriptSig?: string;
          scriptType?: string;
          scriptWits?: string;
          sequence?: number;
          height?: number;
          txid?: string;
          idx?: number;
          heightTxo?: number;
          utxid?: string;
          vout?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/tx/${txid}/ins`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the outputs of a tx.
   *
   * @tags Transactions
   * @name GetOutputsByTxId
   * @summary Get the outputs of a tx
   * @request GET:/v1/indexer/tx/{txid}/outs
   * @secure
   */
  getOutputsByTxId = (
    txid: string,
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
          address?: string;
          codeType?: number;
          inscriptions?: InscriptionItem[];
          satoshi?: number;
          scriptPk?: string;
          scriptType?: string;
          height?: number;
          txid?: string;
          idx?: number;
          heightSpent?: number;
          txidSpent?: string;
          vout?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/tx/${txid}/outs`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the raw tx by txid.
   *
   * @tags Transactions
   * @name GetRawTxById
   * @summary Get the raw tx by txid
   * @request GET:/v1/indexer/rawtx/{txid}
   * @secure
   */
  getRawTxById = (txid: string, params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: string;
      },
      void
    >({
      path: `/v1/indexer/rawtx/${txid}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the UTXO by txid and index.
   *
   * @tags Transactions
   * @name GetUtxoByTxIdAndIndex
   * @summary Get the UTXO by txid and index
   * @request GET:/v1/indexer/utxo/{txid}/{index}
   * @secure
   */
  getUtxoByTxIdAndIndex = (
    txid: string,
    index: string,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: {
          txid?: string;
          /** @example 0 */
          vout?: number;
          /** @example 10000 */
          satoshi?: number;
          scriptType?: string;
          scriptPk?: string;
          codeType?: number;
          address?: string;
          height?: number;
          idx?: number;
          inscriptions?: InscriptionItem[];
          /** @example false */
          isOpInRBF?: boolean;
          /** @example false */
          isSpent?: boolean;
        };
      },
      void
    >({
      path: `/v1/indexer/utxo/${txid}/${index}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Push rawtx to bitcoin node.
   *
   * @tags Transactions
   * @name LocalPushTx
   * @summary Push rawtx to bitcoin node.
   * @request POST:/v1/indexer/local_pushtx
   * @secure
   */
  localPushTx = (data: LocalPushParams, params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: string;
      },
      void
    >({
      path: `/v1/indexer/local_pushtx`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Push rawtxs to bitcoin node.
   *
   * @tags Transactions
   * @name LocalPushTxs
   * @summary Push rawtxs to bitcoin node.
   * @request POST:/v1/indexer/local_pushtxs
   * @secure
   */
  localPushTxs = (data: LocalPushtxsParams, params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: string[];
      },
      void
    >({
      path: `/v1/indexer/local_pushtxs`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get the balance by address.
   *
   * @tags Addresses
   * @name GetBalanceByAddress
   * @summary Get the balance by address
   * @request GET:/v1/indexer/address/{address}/balance
   * @secure
   */
  getBalanceByAddress = (address: string, params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: {
          address?: string;
          satoshi?: number;
          pendingSatoshi?: number;
          utxoCount?: number;
          btcSatoshi?: number;
          btcPendingSatoshi?: number;
          btcUtxoCount?: number;
          inscriptionSatoshi?: number;
          inscriptionPendingSatoshi?: number;
          inscriptionUtxoCount?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/balance`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get transaction history by address.
   *
   * @tags Addresses
   * @name GetTxHistoryByAddress
   * @summary Get transaction history by address
   * @request GET:/v1/indexer/address/{address}/history
   * @secure
   */
  getTxHistoryByAddress = (
    address: string,
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
          detail?: TxHistoryItem[];
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve the UTXOs of an address that do not contain inscriptions. Note that this excludes, but does not completely cover, assets from protocols such as Alkanes, Runes, and others. To obtain the UTXOs of an address that are available for spending as BTC, please use the available-utxo endpoint.
   *
   * @tags Addresses
   * @name GetUtxoDataByAddress
   * @summary Get BTCUTXO list by address
   * @request GET:/v1/indexer/address/{address}/utxo-data
   * @secure
   */
  getUtxoDataByAddress = (
    address: string,
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
          cursor?: number;
          total?: number;
          totalConfirmed?: number;
          totalUnconfirmed?: number;
          totalUnconfirmedSpend?: number;
          utxo?: UTXO[];
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/utxo-data`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve all UTXOs of an address.
   *
   * @tags Addresses
   * @name GetAllUtxoDataByAddress
   * @summary Get all UTXO list by address
   * @request GET:/v1/indexer/address/{address}/all-utxo-data
   * @secure
   */
  getAllUtxoDataByAddress = (
    address: string,
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
          cursor?: number;
          total?: number;
          totalConfirmed?: number;
          totalUnconfirmed?: number;
          totalUnconfirmedSpend?: number;
          utxo?: UTXO[];
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/all-utxo-data`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface will return the current address's available balance that can be used for BTC spending. Balances of assets such as inscriptions, runes, and alkanes will not be included.
   *
   * @tags Addresses
   * @name GetAvailableBalanceByAddress
   * @summary Get available balance by address
   * @request GET:/v1/indexer/address/{address}/available-balance
   * @secure
   */
  getAvailableBalanceByAddress = (
    address: string,
    query?: {
      /**
       * Whether to include UTXOs balance with low fee rate (less than 1 sat/vB)
       * @example false
       */
      withLowFee?: boolean;
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
          totalBalance?: number;
          totalUtxoCount?: number;
          availableBalance?: number;
          availableUtxoCount?: number;
          unavailableBalance?: number;
          unavailableUtxoCount?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/available-balance`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface will return the current address's available UTXO list that can be used for BTC spending. UTXOs of assets such as inscriptions, runes, and alkanes will not be included. The UTXO management tool (https://unisat.io/utxo) can unlock these UTXOs, making them available again. Additionally, UTXOs with less than 600 satoshis will not be returned to avoid potential unspendable outputs from unrecognized asset protocols or burns.
   *
   * @tags Addresses
   * @name GetAvailableUtxoDataByAddress
   * @summary Get available UTXO list by address
   * @request GET:/v1/indexer/address/{address}/available-utxo-data
   * @secure
   */
  getAvailableUtxoDataByAddress = (
    address: string,
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
       * Whether to include UTXOs with low fee rate (less than 1 sat/vB)
       * @example false
       */
      withLowFee?: boolean;
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
          cursor?: number;
          total?: number;
          totalConfirmed?: number;
          totalUnconfirmed?: number;
          totalUnconfirmedSpend?: number;
          utxo?: UTXO[];
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/available-utxo-data`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Inscriptions
   * @name GetInscriptionInfo
   * @summary Get inscription info by inscriptionId
   * @request GET:/v1/indexer/inscription/info/{inscriptionId}
   * @secure
   */
  getInscriptionInfo = (inscriptionId: string, params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: InscriptionData;
      },
      void
    >({
      path: `/v1/indexer/inscription/info/${inscriptionId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Inscriptions
   * @name GetInscriptionContent
   * @summary Get inscription content info by inscriptionId
   * @request GET:/v1/indexer/inscription/content/{inscriptionId}
   * @secure
   */
  getInscriptionContent = (inscriptionId: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/indexer/inscription/content/${inscriptionId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Inscriptions
   * @name GetInscriptionEvents
   * @summary Get inscription events
   * @request GET:/v1/indexer/inscription/events
   * @secure
   */
  getInscriptionEvents = (
    query: {
      /**
       * Start blockheight
       * @example 0
       */
      start: number;
      /**
       * End blockheight (0 represents the inclusion of mempool data.)
       * @example 0
       */
      end: number;
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
          cursor?: number;
          total?: number;
          detail?: InscriptionEvent[];
        };
      },
      void
    >({
      path: `/v1/indexer/inscription/events`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Inscriptions
   * @name GetInscriptionDataByAddress
   * @summary Get inscription UTXO list by address
   * @request GET:/v1/indexer/address/{address}/inscription-data
   * @secure
   */
  getInscriptionDataByAddress = (
    address: string,
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
          cursor?: number;
          total?: number;
          totalConfirmed?: number;
          totalUnconfirmed?: number;
          totalUnconfirmedSpend?: number;
          inscription?: InscriptionData[];
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/inscription-data`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns the list of inscription UTXOs for the given address. **Note:** In previous versions, this endpoint returned all inscription UTXOs. After a recent upgrade, UTXOs corresponding to "abandoned inscriptions" are now filtered out. **Abandoned inscriptions** refer to: - BRC20 MINT inscriptions - BRC20 TRANSFER inscriptions that have already been transferred These inscriptions do not carry BRC20 assets and account for a large proportion of the index. To improve efficiency, they are now excluded from the normal inscription list. If you still need access to these UTXOs, please use the `/abandon-nft-utxo-data` endpoint.
   *
   * @tags Inscriptions
   * @name GetInscriptionUtxoDataByAddress
   * @summary Get inscription UTXO list by address
   * @request GET:/v1/indexer/address/{address}/inscription-utxo-data
   * @secure
   */
  getInscriptionUtxoDataByAddress = (
    address: string,
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
          cursor?: number;
          total?: number;
          totalConfirmed?: number;
          totalUnconfirmed?: number;
          totalUnconfirmedSpend?: number;
          utxo?: UTXO[];
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/inscription-utxo-data`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns the list of UTXOs for "abandoned inscriptions" for the given address. **Abandoned inscriptions** are defined as: - BRC20 MINT inscriptions - BRC20 TRANSFER inscriptions that have already been transferred These inscriptions do not carry BRC20 assets and are excluded from the normal `/inscription-utxo-data` results. Use this endpoint if you specifically need to access these UTXOs.
   *
   * @tags Inscriptions
   * @name GetAbandonNftUtxoDataByAddress
   * @summary Get abandon nft UTXO list by address
   * @request GET:/v1/indexer/address/{address}/abandon-nft-utxo-data
   * @secure
   */
  getAbandonNftUtxoDataByAddress = (
    address: string,
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
          cursor?: number;
          total?: number;
          totalConfirmed?: number;
          totalUnconfirmed?: number;
          totalUnconfirmedSpend?: number;
          utxo?: AbandonNFTUTXO[];
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/abandon-nft-utxo-data`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the best block height of BRC20 data. This value will be consistent with the latest block height a short time after the block has been confirmed.
   *
   * @tags BRC-20
   * @name GetBrc20BestHeight
   * @summary Get the best block height of BRC20 data
   * @request GET:/v1/indexer/brc20/bestheight
   * @secure
   */
  getBrc20BestHeight = (params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: {
          /** best block height of brc20 */
          height?: number;
          /** best block id of brc20 */
          blockid?: string;
          /** timestamp of best block */
          timestamp?: number;
          /** total number of brc20 tickers */
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/brc20/bestheight`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the tiker list of BRC20 token.
   *
   * @tags BRC-20
   * @name GetBrc20TickerList
   * @summary Get the tiker list of BRC20 token.
   * @request GET:/v1/indexer/brc20/list
   * @secure
   */
  getBrc20TickerList = (
    query: {
      /**
       * Start offset
       * @example 0
       */
      start: number;
      /**
       * Number of inscriptions returned
       * @example 16
       */
      limit: number;
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
          detail?: string[];
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/brc20/list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Obtain BRC20 list status
   *
   * @tags BRC-20
   * @name GetBrc20Status
   * @summary Get the status of BRC20 list.
   * @request GET:/v1/indexer/brc20/status
   * @secure
   */
  getBrc20Status = (
    query: {
      /**
       * Start offset
       * @example 0
       */
      start: number;
      /**
       * Number of inscriptions returned
       * @example 16
       */
      limit: number;
      /**
       * sort by (holders/deploy/minted/transactions)
       * @example "deploy"
       */
      sort?: "holders" | "deploy" | "minted" | "transactions";
      /** filter by (completed or not) */
      complete?: "yes" | "no";
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
          height?: number;
          start?: number;
          total?: number;
          detail?: BRC20InfoItem[];
        };
      },
      void
    >({
      path: `/v1/indexer/brc20/status`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the infomation of BRC20 by ticker.
   *
   * @tags BRC-20
   * @name GetBrc20InfoByTicker
   * @summary Get the infomation of BRC20 by ticker
   * @request GET:/v1/indexer/brc20/{ticker}/info
   * @secure
   */
  getBrc20InfoByTicker = (ticker: string, params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: BRC20InfoItem;
      },
      void
    >({
      path: `/v1/indexer/brc20/${ticker}/info`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the holders of BRC20 by ticker.
   *
   * @tags BRC-20
   * @name GetBrc20HoldersByTicker
   * @summary Get the holders of BRC20 by ticker.
   * @request GET:/v1/indexer/brc20/{ticker}/holders
   * @secure
   */
  getBrc20HoldersByTicker = (
    ticker: string,
    query: {
      /**
       * Start offset
       * @example 0
       */
      start: number;
      /**
       * Number of returned
       * @example 16
       */
      limit: number;
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
          detail?: {
            address?: string;
            availableBalance?: string;
            overallBalance?: string;
            transferableBalance?: string;
          }[];
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/brc20/${ticker}/holders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the full history of BRC20.
   *
   * @tags BRC-20
   * @name GetBrc20HistoryByTicker
   * @summary Get the full history of BRC20 by ticker.
   * @request GET:/v1/indexer/brc20/{ticker}/history
   * @secure
   */
  getBrc20HistoryByTicker = (
    ticker: string,
    query: {
      /** Filter by history type */
      type:
        | "inscribe-deploy"
        | "inscribe-mint"
        | "inscribe-transfer"
        | "transfer"
        | "send"
        | "receive";
      /** Block height */
      height: number;
      /**
       * Start offset
       * @example 0
       */
      start: number;
      /**
       * Number of inscriptions returned
       * @example 16
       */
      limit: number;
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
          detail?: BRC20HistoryItem[];
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/brc20/${ticker}/history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the full history of BRC20 by address.
   *
   * @tags BRC-20
   * @name GetBrc20HistoryByTickerAndTxid
   * @summary Get the full history of BRC20 by address.
   * @request GET:/v1/indexer/brc20/{ticker}/tx/{txid}/history
   * @secure
   */
  getBrc20HistoryByTickerAndTxid = (
    ticker: string,
    txid: string,
    query: {
      /** Filter by history type */
      type:
        | "inscribe-deploy"
        | "inscribe-mint"
        | "inscribe-transfer"
        | "transfer"
        | "send"
        | "receive";
      /**
       * Start offset
       * @example 0
       */
      start: number;
      /**
       * Number of inscriptions returned
       * @example 16
       */
      limit: number;
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
          detail?: BRC20HistoryItem[];
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/brc20/${ticker}/tx/${txid}/history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the tiker list of BRC20 token.
   *
   * @tags BRC-20
   * @name GetBrc20HistoryByHeight
   * @summary Get the tiker list of BRC20 token by height.
   * @request GET:/v1/indexer/brc20/history-by-height/{height}
   * @secure
   */
  getBrc20HistoryByHeight = (
    height: number,
    query: {
      /**
       * Start offset
       * @example 0
       */
      start: number;
      /**
       * Number of inscriptions returned
       * @example 16
       */
      limit: number;
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
          height?: number;
          total?: number;
          start?: number;
          detail?: BRC20HistoryItem[];
        };
      },
      void
    >({
      path: `/v1/indexer/brc20/history-by-height/${height}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Obtain BRC20 token summary by address, including available balance, transferable balance
   *
   * @tags BRC-20
   * @name GetBrc20SummaryByAddress
   * @summary Get the BRC20 token summary by address.
   * @request GET:/v1/indexer/address/{address}/brc20/summary
   * @secure
   */
  getBrc20SummaryByAddress = (
    address: string,
    query: {
      /**
       * Start offset
       * @example 0
       */
      start: number;
      /**
       * Number of inscriptions returned
       * @example 16
       */
      limit: number;
      /**
       * -> filter by tick type 8 - Returns only 4-character BRC20 tokens 16 - Returns only 5-character BRC20 tokens 32 - Returns only 6-character BRC20 tokens 24 - Returns 4 and 5-character BRC20 tokens (bitwise combination 8 | 16) 56 - Returns 4, 5, and 6-character BRC20 tokens (bitwise combination 8 | 16 | 32)
       * @example 24
       */
      tick_filter?: 8 | 16 | 24;
      /**
       * Exclude zero balance
       * @example true
       */
      exclude_zero?: boolean;
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
          height?: number;
          start?: number;
          total?: number;
          detail?: {
            ticker?: string;
            overallBalance?: string;
            transferableBalance?: string;
            availableBalance?: string;
          }[];
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/brc20/summary`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Obtain BRC20 token summary by address, including available balance, transferable balance
   *
   * @tags BRC-20
   * @name GetBrc20SummaryByAddressAndHeight
   * @summary Get the BRC20 token summary by address and height.
   * @request GET:/v1/indexer/address/{address}/brc20/summary-by-height/{height}
   * @secure
   */
  getBrc20SummaryByAddressAndHeight = (
    address: string,
    height: string,
    query: {
      /**
       * Start offset
       * @example 0
       */
      start: number;
      /**
       * Number of inscriptions returned
       * @example 16
       */
      limit: number;
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
          height?: number;
          start?: number;
          total?: number;
          detail?: {
            ticker?: string;
            overallBalance?: string;
            transferableBalance?: string;
            availableBalance?: string;
          }[];
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/brc20/summary-by-height/${height}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Obtain BRC20 token infomation by address, including available balance, transferable balance, number of transferable inscriptions, the first few Inscriptions, etc.
   *
   * @tags BRC-20
   * @name GetBrc20InfoByAddressAndTicker
   * @summary Get the BRC20 token info by address and ticker.
   * @request GET:/v1/indexer/address/{address}/brc20/{ticker}/info
   * @secure
   */
  getBrc20InfoByAddressAndTicker = (
    address: string,
    ticker: string,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: 0 | -1;
        /** @example "OK" */
        msg?: string;
        data?: {
          ticker?: string;
          overallBalance?: string;
          availableBalance?: string;
          availableBalanceSafe?: string;
          availableBalanceUnSafe?: string;
          transferableBalance?: string;
          historyCount?: number;
          historyInscriptions?: BRC20HistoryInscription[];
          transferableCount?: number;
          transferableInscriptions?: BRC20HistoryInscription[];
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/brc20/${ticker}/info`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the full history of BRC20 by address.
   *
   * @tags BRC-20
   * @name GetBrc20HistoryByAddress
   * @summary Get the full history of BRC20 by address.
   * @request GET:/v1/indexer/address/{address}/brc20/history
   * @secure
   */
  getBrc20HistoryByAddress = (
    address: string,
    query: {
      /**
       * Start offset
       * @example 0
       */
      start: number;
      /**
       * Number of inscriptions returned
       * @example 16
       */
      limit: number;
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
          detail?: BRC20HistoryItem[];
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/brc20/history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the full history of BRC20 by address.
   *
   * @tags BRC-20
   * @name GetBrc20HistoryByAddressAndTicker
   * @summary Get the full history of BRC20 by address and ticker.
   * @request GET:/v1/indexer/address/{address}/brc20/{ticker}/history
   * @secure
   */
  getBrc20HistoryByAddressAndTicker = (
    address: string,
    ticker: string,
    query: {
      /** Filter by history type */
      type:
        | "inscribe-deploy"
        | "inscribe-mint"
        | "inscribe-transfer"
        | "transfer"
        | "send"
        | "receive";
      /**
       * Start offset
       * @example 0
       */
      start: number;
      /**
       * Number of inscriptions returned
       * @example 16
       */
      limit: number;
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
          detail?: BRC20HistoryItem[];
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/brc20/${ticker}/history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the transferable inscriptions list of BRC20 by address.
   *
   * @tags BRC-20
   * @name GetBrc20TransferableInscriptionsByAddressAndTicker
   * @summary Get the transferable inscriptions list of BRC20 by address.
   * @request GET:/v1/indexer/address/{address}/brc20/{ticker}/transferable-inscriptions
   * @secure
   */
  getBrc20TransferableInscriptionsByAddressAndTicker = (
    address: string,
    ticker: string,
    query: {
      /**
       * Start offset
       * @example 0
       */
      start: number;
      /**
       * Number of inscriptions returned
       * @example 16
       */
      limit: number;
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
          detail?: {
            inscriptionNumber?: number;
            inscriptionId?: string;
            satoshi?: number;
            confirmations?: number;
            data?: {
              op?: string;
              tick?: string;
              lim?: string;
              amt?: string;
              decimal?: string;
            };
          };
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/address/${address}/brc20/${ticker}/transferable-inscriptions`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the history of BRC20 Module.
   *
   * @tags BRC-20
   * @name GetBrc20ModuleHistoryByAddress
   * @summary Get the history of BRC20 Module by address.
   * @request GET:/v1/indexer/brc20-module/{module}/history
   * @secure
   */
  getBrc20ModuleHistoryByAddress = (
    module: string,
    query: {
      /**
       * Start height
       * @example 0
       */
      start: number;
      /**
       * End height
       * @example 0
       */
      end: number;
      /**
       * Start Offset
       * @example 0
       */
      cursor: number;
      /**
       * Number of events returned
       * @example 16
       */
      size: number;
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
          detail?: ModuleHistoryItem[];
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/brc20-module/${module}/history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the withdraw history of BRC20.
   *
   * @tags BRC-20
   * @name GetBrc20WithdrawHistory
   * @summary Get the withdraw history of BRC20.
   * @request GET:/v1/indexer/brc20-module/withdraw-history
   * @secure
   */
  getBrc20WithdrawHistory = (
    query: {
      /**
       * Start height
       * @example 0
       */
      start: number;
      /**
       * End height
       * @example 0
       */
      end: number;
      /**
       * Start Offset
       * @example 0
       */
      cursor: number;
      /**
       * Number of events returned
       * @example 16
       */
      size: number;
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
          detail?: ModuleHistoryItem[];
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/brc20-module/withdraw-history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get runes global status
   *
   * @tags Runes
   * @name GetRunesStatus
   * @summary Get runes status
   * @request GET:/v1/indexer/runes/status
   * @secure
   */
  getRunesStatus = (params: RequestParams = {}) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: RuneStatus;
      },
      any
    >({
      path: `/v1/indexer/runes/status`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Runes
   * @name GetRunesList
   * @summary Get runes list
   * @request GET:/v1/indexer/runes/info-list
   * @secure
   */
  getRunesList = (
    query?: {
      /**
       * search by rune spacedRune
       * @example 0
       */
      rune?: string;
      /**
       * by (holders/transactions/timestamp)
       * @example "timestamp"
       */
      sort?: string;
      /**
       * complete type(yes/no)
       * @example "no"
       */
      complete?: string;
      /**
       * default=0
       * @example 0
       */
      start?: number;
      /**
       * required,min=1,max=500,default=10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          /** @example 3045 */
          total?: number;
          /** @example 0 */
          start?: number;
          detail?: RuneEntry[];
        };
      },
      any
    >({
      path: `/v1/indexer/runes/info-list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Runes
   * @name GetRuneInfo
   * @summary Get rune info by runeid
   * @request GET:/v1/indexer/runes/{runeid}/info
   * @secure
   */
  getRuneInfo = (runeid: string, params: RequestParams = {}) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: RuneEntry;
      },
      any
    >({
      path: `/v1/indexer/runes/${runeid}/info`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Runes
   * @name GetRuneHolders
   * @summary Get runes holders by runeid
   * @request GET:/v1/indexer/runes/{runeid}/holders
   * @secure
   */
  getRuneHolders = (
    runeid: string,
    query?: {
      /**
       * Start offset
       * @example 0
       */
      start?: number;
      /**
       * Number of inscriptions returned
       * @example 16
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          /** @example 1 */
          total?: number;
          /** @example 0 */
          start?: number;
          detail?: RuneHolder[];
        };
      },
      any
    >({
      path: `/v1/indexer/runes/${runeid}/holders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Runes
   * @name GetRunesBalanceList
   * @summary Get runes balance list by address
   * @request GET:/v1/indexer/address/{address}/runes/balance-list
   * @secure
   */
  getRunesBalanceList = (
    address: string,
    query?: {
      /**
       * Start offset
       * @example 0
       */
      start?: number;
      /**
       * Number of items returned
       * @example 16
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          start?: number;
          total?: number;
          detail?: RunesBalance[];
        };
      },
      any
    >({
      path: `/v1/indexer/address/${address}/runes/balance-list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Runes
   * @name GetRunesBalance
   * @summary Get runes balance by address and runeid
   * @request GET:/v1/indexer/address/{address}/runes/{runeid}/balance
   * @secure
   */
  getRunesBalance = (
    address: string,
    runeid: string,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: RunesBalance;
      },
      any
    >({
      path: `/v1/indexer/address/${address}/runes/${runeid}/balance`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Runes
   * @name GetRunesUtxoBalance
   * @summary Get runes balance by utxo
   * @request GET:/v1/indexer/runes/utxo/{txid}/{index}/balance
   * @secure
   */
  getRunesUtxoBalance = (
    txid: string,
    index: string,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: RunesBalance[];
      },
      any
    >({
      path: `/v1/indexer/runes/utxo/${txid}/${index}/balance`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Runes
   * @name GetRunesUtxoByAddressAndRuneid
   * @summary Get utxo runes balance by address and runeid
   * @request GET:/v1/indexer/address/{address}/runes/{runeid}/utxo
   * @secure
   */
  getRunesUtxoByAddressAndRuneid = (
    address: string,
    runeid: string,
    query?: {
      /**
       * default=0
       * @example 0
       */
      start?: number;
      /**
       * required,min=1,max=500,default=10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          start?: number;
          total?: number;
          utxo?: RuneUtxo[];
        };
      },
      any
    >({
      path: `/v1/indexer/address/${address}/runes/${runeid}/utxo`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the full history events of Runes.
   *
   * @tags Runes
   * @name GetRunesEvents
   * @summary Get Runes Events
   * @request GET:/v1/indexer/runes/event
   * @secure
   */
  getRunesEvents = (
    query?: {
      /** Filter by rune */
      rune?: string;
      /** Filter by history type */
      type?: "etch" | "mint" | "burn" | "receive" | "send";
      /** Filter by address */
      address?: string;
      /** Filter by block height */
      height?: number;
      /** Filter by tx */
      txid?: string;
      /**
       * Start offset
       * @example 0
       */
      start?: number;
      /**
       * Number of inscriptions returned
       * @example 16
       */
      limit?: number;
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
          detail?: RunesEventItem[];
          start?: number;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/indexer/runes/event`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get alkanes global status
   *
   * @tags Alkanes
   * @name GetAlkanesStatus
   * @summary Get alkanes status
   * @request GET:/v1/indexer/alkanes/status
   * @secure
   */
  getAlkanesStatus = (params: RequestParams = {}) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: AlkanesStatus;
      },
      any
    >({
      path: `/v1/indexer/alkanes/status`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Alkanes
   * @name GetAlkanesInfoList
   * @summary Get alkanes list
   * @request GET:/v1/indexer/alkanes/info-list
   * @secure
   */
  getAlkanesInfoList = (
    query?: {
      /** search by type,optional */
      type?: "token" | "collection" | "nft" | "contract";
      /**
       * sort by timestamp, alkaneid, default=timestamp
       * @default "timestamp"
       */
      sortBy?: "timestamp" | "alkaneid";
      /**
       * sort order,optional,default=asc
       * @default "asc"
       */
      order?: "asc" | "desc";
      /**
       * default=0
       * @example 0
       */
      start?: number;
      /**
       * min=1,max=500,default=10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          /** @example 3045 */
          total?: number;
          /** @example 0 */
          start?: number;
          detail?: AlkaneInfo[];
        };
      },
      any
    >({
      path: `/v1/indexer/alkanes/info-list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Alkanes
   * @name GetAlkanesInfo
   * @summary Get alkane info by alkaneid
   * @request GET:/v1/indexer/alkanes/{alkaneid}/info
   * @secure
   */
  getAlkanesInfo = (alkaneid: string, params: RequestParams = {}) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: AlkaneInfo;
      },
      any
    >({
      path: `/v1/indexer/alkanes/${alkaneid}/info`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Alkanes
   * @name GetAlkanesTokenList
   * @summary Get alkanes token list
   * @request GET:/v1/indexer/alkanes/token-list
   * @secure
   */
  getAlkanesTokenList = (
    query?: {
      /**
       * search by alkaneid
       * @example "2:1"
       */
      alkaneid?: string;
      /** search by name */
      name?: string;
      /**
       * sort by timestamp, alkaneid, default=timestamp
       * @default "timestamp"
       */
      sortBy?: "timestamp" | "alkaneid";
      /**
       * sort order,optional,default=asc
       * @default "asc"
       */
      order?: "asc" | "desc";
      /**
       * default=0
       * @example 0
       */
      start?: number;
      /**
       * min=1,max=500,default=10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          /** @example 3045 */
          total?: number;
          /** @example 0 */
          start?: number;
          detail?: AlkaneInfo[];
        };
      },
      any
    >({
      path: `/v1/indexer/alkanes/token-list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Alkanes
   * @name GetAlkanesHolders
   * @summary Get alkanes holders by alkaneid
   * @request GET:/v1/indexer/alkanes/{alkaneid}/holders
   * @secure
   */
  getAlkanesHolders = (
    alkaneid: string,
    query?: {
      /**
       * Start offset
       * @example 0
       */
      start?: number;
      /**
       * min=1,max=500,default=10
       * @example 16
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          /** @example 1 */
          total?: number;
          /** @example 0 */
          start?: number;
          detail?: AlkaneHolder[];
        };
      },
      any
    >({
      path: `/v1/indexer/alkanes/${alkaneid}/holders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Alkanes
   * @name GetAlkanesCollectionItems
   * @summary Get collection items
   * @request GET:/v1/indexer/alkanes/{alkaneid}/collection-items
   * @secure
   */
  getAlkanesCollectionItems = (
    alkaneid: string,
    query?: {
      /**
       * default=0
       * @example 0
       */
      start?: number;
      /**
       * min=1,max=500,default=10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          total?: number;
          start?: number;
          detail?: AlkaneInfo[];
        };
      },
      any
    >({
      path: `/v1/indexer/alkanes/${alkaneid}/collection-items`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Alkanes
   * @name GetAlkanesContractEvents
   * @summary Get contract events
   * @request GET:/v1/indexer/alkanes/{alkaneid}/contract-events
   * @secure
   */
  getAlkanesContractEvents = (
    alkaneid: string,
    query: {
      /** search by from height */
      fromHeight: number;
      /** search by to height */
      toHeight: number;
      /**
       * default=0
       * @example 0
       */
      start?: number;
      /**
       * min=1,max=500,default=10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          total?: number;
          start?: number;
          detail?: AlkaneEvent[];
        };
      },
      any
    >({
      path: `/v1/indexer/alkanes/${alkaneid}/contract-events`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Alkanes
   * @name GetAlkanesUtxoBalance
   * @summary Get alkanes utxo balance
   * @request GET:/v1/indexer/alkanes/utxo/{txid}/{index}/balance
   * @secure
   */
  getAlkanesUtxoBalance = (
    txid: string,
    index: string,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: AlkanesUTXOBalance[];
      },
      any
    >({
      path: `/v1/indexer/alkanes/utxo/${txid}/${index}/balance`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Alkanes
   * @name GetAddressAlkanesUtxo
   * @summary Get utxo alkanes balance by address and alkaneid
   * @request GET:/v1/indexer/address/{address}/alkanes/{alkaneid}/utxo
   * @secure
   */
  getAddressAlkanesUtxo = (
    address: string,
    alkaneid: string,
    query?: {
      /**
       * default=0
       * @example 0
       */
      start?: number;
      /**
       * min=1,max=500,default=10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          start?: number;
          total?: number;
          utxo?: AlkaneUtxo[];
        };
      },
      any
    >({
      path: `/v1/indexer/address/${address}/alkanes/${alkaneid}/utxo`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Alkanes
   * @name GetAddressAlkanesTokenList
   * @summary Get address alkanes token list
   * @request GET:/v1/indexer/address/{address}/alkanes/token-list
   * @secure
   */
  getAddressAlkanesTokenList = (
    address: string,
    query?: {
      /**
       * default=0
       * @example 0
       */
      start?: number;
      /**
       * min=1,max=500,default=10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          /** @example 3045 */
          total?: number;
          /** @example 0 */
          start?: number;
          detail?: AlkaneInfo[];
        };
      },
      any
    >({
      path: `/v1/indexer/address/${address}/alkanes/token-list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Alkanes
   * @name GetAddressAlkanesCollectionList
   * @summary Get address alkanes collection list
   * @request GET:/v1/indexer/address/{address}/alkanes/collection-list
   * @secure
   */
  getAddressAlkanesCollectionList = (
    address: string,
    query?: {
      /**
       * default=0
       * @example 0
       */
      start?: number;
      /**
       * min=1,max=500,default=10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          /** @example 3045 */
          total?: number;
          /** @example 0 */
          start?: number;
          detail?: AlkaneInfo[];
        };
      },
      any
    >({
      path: `/v1/indexer/address/${address}/alkanes/collection-list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Alkanes
   * @name GetAddressAlkanesCollectionItems
   * @summary Get address collection items by alkaneid
   * @request GET:/v1/indexer/address/{address}/alkanes/{alkaneid}/collection-items
   * @secure
   */
  getAddressAlkanesCollectionItems = (
    address: string,
    alkaneid: string,
    query?: {
      /**
       * default=0
       * @example 0
       */
      start?: number;
      /**
       * min=1,max=500,default=10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          /** @example 3045 */
          total?: number;
          /** @example 0 */
          start?: number;
          detail?: AlkaneInfo[];
        };
      },
      any
    >({
      path: `/v1/indexer/address/${address}/alkanes/${alkaneid}/collection-items`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Alkanes
   * @name GetAddressAlkanesTransferHistory
   * @summary Get transfer history
   * @request GET:/v1/indexer/address/{address}/alkanes/{alkaneid}/transfer-history
   * @secure
   */
  getAddressAlkanesTransferHistory = (
    address: string,
    alkaneid: string,
    query: {
      /** search by from height */
      fromHeight: number;
      /** search by to height */
      toHeight: number;
      /**
       * default=0
       * @example 0
       */
      start?: number;
      /**
       * min=1,max=500,default=10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 0 */
        code?: number;
        /** @example "" */
        msg?: string;
        data?: {
          /** @example 3045 */
          total?: number;
          /** @example 0 */
          start?: number;
          detail?: AlkaneTransferHistory[];
        };
      },
      any
    >({
      path: `/v1/indexer/address/${address}/alkanes/${alkaneid}/transfer-history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface provides the global configuration information for the BRC20 Swap service. It includes details such as the module ID, service gas tick, and pending deposit confirmation numbers.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapConfig
   * @summary Swap's global configuration information.
   * @request GET:/v1/brc20-swap/config
   * @secure
   */
  getBrc20SwapConfig = (params: RequestParams = {}) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          moduleId?: string;
          /** The tick used for the second layer gas. */
          serviceGasTick?: string;
          /** Number of confirmations required for direct deposit. */
          pendingDepositDirectNum?: number;
          /** Number of confirmations required for matching deposit. */
          pendingDepositMatchingNum?: number;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/config`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the balance for a specific address and tick in the BRC20 Swap service. It returns the confirmed module balance, swap balance, pending swap balance, and pending available balance.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapBalance
   * @summary Gets the balance for the specified address and tick.
   * @request GET:/v1/brc20-swap/balance
   * @secure
   */
  getBrc20SwapBalance = (
    query: {
      address: string;
      tick: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          balance?: {
            /** Confirmed module balance. */
            module?: string;
            /** Confirmed swap balance. */
            swap?: string;
            /** The balance converted from pending to swap. */
            pendingSwap?: string;
            /** The balance converted from pending to module. */
            pendingAvailable?: string;
          };
          decimal?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/balance`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the complete list of all BRC20 token balances for a specific wallet address in the BRC20 Swap service. For each tick, it returns detailed balance information including the confirmed module balance, swap balance, pending swap balance, and pending available balance.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapAllBalances
   * @summary Gets all BRC20 token balances for a specified address.
   * @request GET:/v1/brc20-swap/all_balance
   * @secure
   */
  getBrc20SwapAllBalances = (
    query: {
      address: string;
      pubkey?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        /** A map where each key is a token ticker symbol. */
        data: Record<
          string,
          {
            balance: {
              /** Confirmed module balance. */
              module?: string;
              /** Confirmed swap balance. */
              swap?: string;
              /** The balance converted from pending to swap. */
              pendingSwap?: string;
              /** The balance converted from pending to module. */
              pendingAvailable?: string;
            };
            /** Token decimal precision. */
            decimal: string;
            /** Type of the asset (e.g., 'brc20', 'btc'). */
            assetType: string;
            /** Underlying network (e.g., 'BITCOIN_MAINNET', 'FRACTAL_BITCOIN_MAINNET'). */
            networkType: string;
            /** Current price of the token, if available. */
            price?: number;
          }
        >;
      },
      any
    >({
      path: `/v1/brc20-swap/all_balance`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the pool information for a specific trade pair in the BRC20 Swap service. It includes details such as whether the pool exists, if liquidity has been added, tick prices, LP quantity, TVL, volume, and rewards.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPoolInfo
   * @summary Get Pool information based on trade pair.
   * @request GET:/v1/brc20-swap/pool_info
   * @secure
   */
  getBrc20SwapPoolInfo = (
    query?: {
      tick0?: string;
      tick1?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** Is the pool existed */
          existed?: boolean;
          /** Has LP been added to the pool */
          addLiq?: boolean;
          tick0?: string;
          tick1?: string;
          /** Quantity of pool lp */
          lp?: string;
          tvl?: string;
          volume24h?: string;
          volume7d?: string;
          reward0?: string;
          reward1?: string;
          /** Active pool ID */
          activedPid?: string;
          /** Market cap */
          marketCap?: number;
          /** Market cap tick */
          marketCapTick?: string;
          /** Network type for tick0 */
          networkType0?: string;
          /** Network type for tick1 */
          networkType1?: string;
          /** Asset type for tick0 */
          assetType0?: string;
          /** Asset type for tick1 */
          assetType1?: string;
          /** L1 tick0 */
          l1Tick0?: string;
          /** L1 tick1 */
          l1Tick1?: string;
          /** Amount of tick0 */
          amount0?: string;
          /** Amount of tick1 */
          amount1?: string;
          /** 30 days volume */
          volume30d?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pool_info`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the tick information that can be used for swapping based on the provided address. It returns the tick, decimal, BRC20 balance, and swap balance for each available tick.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapSelect
   * @summary Select the tick information that you can use based on the address.
   * @request GET:/v1/brc20-swap/select
   * @secure
   */
  getBrc20SwapSelect = (
    query: {
      address: string;
      /** Fuzzy matching */
      search?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          tick?: string;
          decimal?: string;
          /** Module balance (not participate in swap calculations) */
          brc20Balance?: string;
          /** Swap balance */
          swapBalance?: string;
        }[];
      },
      any
    >({
      path: `/v1/brc20-swap/select`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /deploy_pool operation, providing the signature content, gas, and byte information required for deploying a pool in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPreDeployPool
   * @summary Prepare deploy pool operation
   * @request GET:/v1/brc20-swap/pre_deploy_pool
   * @secure
   */
  getBrc20SwapPreDeployPool = (
    query: {
      address: string;
      tick0: string;
      tick1: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
          /** Tick used as fee */
          feeTick?: string;
          /** Total free quota */
          totalFreeQuota?: string;
          /** Remaining free quota */
          remainingFreeQuota?: string;
          /** Total used free quota */
          totalUsedFreeQuota?: string;
          /** Usage free quota */
          usageFreeQuota?: string;
          /** Has voucher */
          hasVoucher?: boolean;
          /** Asset fee amount */
          assetFeeAmount?: string;
          /** Asset fee tick */
          assetFeeTick?: string;
          /** Asset fee tick price */
          assetFeeTickPrice?: string;
          /** Asset fee tick balance */
          assetFeeTickBalance?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pre_deploy_pool`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface deploys a pool in the BRC20 Swap service. It requires the address, tick0, tick1, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapDeployPool
   * @summary Deploy the pool operation.
   * @request POST:/v1/brc20-swap/deploy_pool
   * @secure
   */
  postBrc20SwapDeployPool = (
    data: {
      address: string;
      tick0: string;
      tick1: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** The fee that the user needs to pay */
      feeAmount: string;
      /** The price of fee tick */
      feeTickPrice: string;
      /** User signature */
      sigs?: string[];
      payType?: string;
      rememberPayType?: boolean;
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
      path: `/v1/brc20-swap/deploy_pool`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /add_liq operation, providing the signature content, gas, and byte information required for adding liquidity in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPreAddLiq
   * @summary Prepare add liquidity operation
   * @request GET:/v1/brc20-swap/pre_add_liq
   * @secure
   */
  getBrc20SwapPreAddLiq = (
    query: {
      address: string;
      tick0: string;
      tick1: string;
      /** Input amount of tick0 */
      amount0: string;
      /** Input amount of tick1 */
      amount1: string;
      /** Expect amount of lp */
      lp: string;
      slippage: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
          /** Tick used as fee */
          feeTick?: string;
          /** Total free quota */
          totalFreeQuota?: string;
          /** Remaining free quota */
          remainingFreeQuota?: string;
          /** Total used free quota */
          totalUsedFreeQuota?: string;
          /** Usage free quota */
          usageFreeQuota?: string;
          /** Has voucher */
          hasVoucher?: boolean;
          /** Asset fee amount */
          assetFeeAmount?: string;
          /** Asset fee tick */
          assetFeeTick?: string;
          /** Asset fee tick price */
          assetFeeTickPrice?: string;
          /** Asset fee tick balance */
          assetFeeTickBalance?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pre_add_liq`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface adds liquidity to a pool in the BRC20 Swap service. It requires the address, tick0, tick1, amounts, LP, slippage, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name Brc20SwapAddLiqCreate
   * @summary Add the liquidity operation
   * @request POST:/v1/brc20-swap/add_liq
   * @secure
   */
  brc20SwapAddLiqCreate = (
    data: {
      address: string;
      tick0: string;
      tick1: string;
      /** Input amount of tick0 */
      amount0: string;
      /** Input amount of tick1 */
      amount1: string;
      lp: string;
      slippage: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** The fee that the user needs to pay */
      feeAmount: string;
      /** The price of fee tick */
      feeTickPrice: string;
      /** User signature */
      sigs?: string[];
      payType?: string;
      rememberPayType?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** Function id */
          id?: string;
          /** The rollup inscription id where the function is located */
          rollupInscriptionId?: string;
          address?: string;
          type?: string;
          tick0?: string;
          tick1?: string;
          /** Input amount of tick0 */
          amount0: string;
          /** Input amount of tick1 */
          amount1: string;
          lp?: string;
          ts?: number;
          /** Operation success status */
          success?: boolean;
          /** Operation value */
          value?: number;
          /** Pre-operation result */
          preResult?: object;
          /** Operation result */
          result?: object;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/add_liq`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /remove_liq operation, providing the signature content, gas, and byte information required for removing liquidity in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPreRemoveLiq
   * @summary Prepare remove liquidity operation
   * @request GET:/v1/brc20-swap/pre_remove_liq
   * @secure
   */
  getBrc20SwapPreRemoveLiq = (
    query: {
      address: string;
      tick0: string;
      tick1: string;
      /** Input amount of tick0 */
      amount0: string;
      /** Input amount of tick1 */
      amount1: string;
      lp: string;
      slippage: string;
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
          /** Tick used as fee */
          feeTick?: string;
          /** Total free quota */
          totalFreeQuota?: string;
          /** Remaining free quota */
          remainingFreeQuota?: string;
          /** Total used free quota */
          totalUsedFreeQuota?: string;
          /** Usage free quota */
          usageFreeQuota?: string;
          /** Has voucher */
          hasVoucher?: boolean;
          /** Asset fee amount */
          assetFeeAmount?: string;
          /** Asset fee tick */
          assetFeeTick?: string;
          /** Asset fee tick price */
          assetFeeTickPrice?: string;
          /** Asset fee tick balance */
          assetFeeTickBalance?: string;
          /** Reward amount for tick0 */
          reward0?: string;
          /** Reward amount for tick1 */
          reward1?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pre_remove_liq`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface removes liquidity from a pool in the BRC20 Swap service. It requires the address, tick0, tick1, amounts, LP, slippage, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name Brc20SwapRemoveLiqCreate
   * @summary Remove the liquidity operation
   * @request POST:/v1/brc20-swap/remove_liq
   * @secure
   */
  brc20SwapRemoveLiqCreate = (
    data: {
      address: string;
      tick0: string;
      tick1: string;
      lp: string;
      /** Input amount of tick0 */
      amount0: string;
      /** Input amount of tick1 */
      amount1: string;
      slippage: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** The fee that the user needs to pay */
      feeAmount: string;
      /** The price of fee tick */
      feeTickPrice: string;
      /** User signature */
      sigs?: string[];
      payType?: string;
      rememberPayType?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** Function id */
          id?: string;
          /** The rollup inscription id where the function is located */
          rollupInscriptionId?: string;
          address?: string;
          type?: string;
          tick0?: string;
          tick1?: string;
          /** Input amount of tick0 */
          amount0: string;
          /** Input amount of tick1 */
          amount1: string;
          lp?: string;
          ts?: number;
          /** Operation success status */
          success?: boolean;
          /** Operation value */
          value?: number;
          /** Pre-operation result */
          preResult?: object;
          /** Operation result */
          result?: object;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/remove_liq`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /send operation, providing the signature content, gas, and byte information required for sending a tick in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPreSend
   * @summary Prepare send operation
   * @request GET:/v1/brc20-swap/pre_send
   * @secure
   */
  getBrc20SwapPreSend = (
    query: {
      address: string;
      /** Send tick */
      tick: string;
      /** The amount of send tick */
      amount: string;
      /** The receiver of send tick */
      to: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pre_send`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /batch_send operation, providing the signature content, gas, and byte information required for sending multiple ticks in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name Brc20SwapPreBatchSendCreate
   * @summary Prepare batch send operation
   * @request POST:/v1/brc20-swap/pre_batch_send
   * @secure
   */
  brc20SwapPreBatchSendCreate = (
    data: {
      address: string;
      /** Send tick */
      tick: string;
      /** The amount of send tick */
      amount: string;
      /** The receiver of send tick */
      to: string[];
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pre_batch_send`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /swap operation, providing the signature content, gas, and byte information required for swapping ticks in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPreSwap
   * @summary Prepare swap operation
   * @request GET:/v1/brc20-swap/pre_swap
   * @secure
   */
  getBrc20SwapPreSwap = (
    query: {
      address: string;
      /** Input tick */
      tickIn: string;
      /** Output tick */
      tickOut: string;
      /** The amount of input tick */
      amountIn: string;
      /** The amount of output tick */
      amountOut: string;
      slippage: string;
      /** @example "exactIn" */
      exactType: "exactIn" | "exactOut";
      /** Timestamp(seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pre_swap`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface sends a tick in the BRC20 Swap service. It requires the address, tick, amount, receiver, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapSend
   * @summary The send operation.
   * @request POST:/v1/brc20-swap/send
   * @secure
   */
  postBrc20SwapSend = (
    data: {
      address: string;
      /** Send tick */
      tick: string;
      /** The amount of send tick */
      amount: string;
      /** The receiver of send tick */
      to: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** The fee that the user needs to pay */
      feeAmount: string;
      /** The price of fee tick */
      feeTickPrice: string;
      /** User signature */
      sigs?: string[];
      payType?: string;
      rememberPayType?: boolean;
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
      path: `/v1/brc20-swap/send`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface sends multiple ticks in the BRC20 Swap service. It requires the address, tick, amount, receivers, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapBatchSend
   * @summary The batch send operation.
   * @request POST:/v1/brc20-swap/batch_send
   * @secure
   */
  postBrc20SwapBatchSend = (
    data: {
      address: string;
      /** Send tick */
      tick: string;
      /** The amount of send tick */
      amount: string;
      /** The receiver of send tick */
      to: string[];
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** The fee that the user needs to pay */
      feeAmount: string;
      /** The price of fee tick */
      feeTickPrice: string;
      /** User signature */
      sigs?: string[];
      payType?: string;
      rememberPayType?: boolean;
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
      path: `/v1/brc20-swap/batch_send`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface swaps ticks in the BRC20 Swap service. It requires the address, input tick, output tick, input amount, output amount, slippage, exact type, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapSwap
   * @summary The swap operation.
   * @request POST:/v1/brc20-swap/swap
   * @secure
   */
  postBrc20SwapSwap = (
    data: {
      address: string;
      /** Input tick */
      tickIn: string;
      /** Output tick */
      tickOut: string;
      /** The amount of input tick */
      amountIn: string;
      /** The amount of output tick */
      amountOut: string;
      feeTick: string;
      slippage: string;
      exactType: "exactIn" | "exactOut";
      /** Timestamp (seconds) */
      ts: number;
      /** The fee that the user needs to pay */
      feeAmount: string;
      /** The price of fee tick */
      feeTickPrice: string;
      /** User signature */
      sigs?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** Function id */
          id?: string;
          /** The rollup inscription id where the function is located */
          rollupInscriptionId?: string;
          address?: string;
          tickIn?: string;
          tickOut?: string;
          amountIn?: string;
          amountOut?: string;
          exactType?: string;
          ts?: number;
          /** Operation success status */
          success?: boolean;
          /** Operation value */
          value?: number;
          /** Pre-operation result */
          preResult?: object;
          /** Operation result */
          result?: object;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/swap`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the pool list information in the BRC20 Swap service. It supports filtering by address, tick, and fuzzy matching, and allows pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPoolList
   * @summary Gets the pool list information.
   * @request GET:/v1/brc20-swap/pool_list
   * @secure
   */
  getBrc20SwapPoolList = (
    query: {
      /** Fuzzy matching */
      search?: string;
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
          total?: number;
          list?: {
            tick0?: string;
            tick1?: string;
            lp?: string;
            /** Total pool value */
            tvl?: string;
            volume24h?: string;
            volume7d?: string;
            /** 30 days volume */
            volume30d?: string;
            /** Amount of tick0 */
            amount0?: string;
            /** Amount of tick1 */
            amount1?: string;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pool_list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the user's pool list information in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapMyPoolList
   * @summary Gets the user's pool list information.
   * @request GET:/v1/brc20-swap/my_pool_list
   * @secure
   */
  getBrc20SwapMyPoolList = (
    query: {
      address: string;
      tick?: string;
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
          total?: number;
          list?: {
            lp?: string;
            shareOfPool?: string;
            tick0?: string;
            tick1?: string;
            /** Amount of tick0 */
            amount0: string;
            /** Amount of tick1 */
            amount1: string;
            claimedReward0?: string;
            claimedReward1?: string;
            unclaimedReward0?: string;
            unclaimedReward1?: string;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/my_pool_list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the user pool information for a specific pair in the BRC20 Swap service. It requires the address, tick0, and tick1 parameters to identify the pool.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapMyPool
   * @summary Gets the user pool information for the specified pair.
   * @request GET:/v1/brc20-swap/my_pool
   * @secure
   */
  getBrc20SwapMyPool = (
    query: {
      address: string;
      tick0: string;
      tick1: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          lp?: string;
          shareOfPool?: string;
          tick0?: string;
          tick1?: string;
          /** Amount of tick0 */
          amount0: string;
          /** Amount of tick1 */
          amount1: string;
          /** Locked LP amount */
          lockedLp?: string;
          /** Claimed reward for tick0 */
          claimedReward0?: string;
          /** Claimed reward for tick1 */
          claimedReward1?: string;
          /** Unclaimed reward for tick0 */
          unclaimedReward0?: string;
          /** Unclaimed reward for tick1 */
          unclaimedReward1?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/my_pool`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface provides an overview of the swap information in the BRC20 Swap service, including total liquidity, 7-day volume, 24-hour volume, number of transactions, and number of pairs.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapOverview
   * @summary An overview of swap information
   * @request GET:/v1/brc20-swap/overview
   * @secure
   */
  getBrc20SwapOverview = (params: RequestParams = {}) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** Total value of all pools */
          liquidity?: string;
          /** 7 days volume */
          volume7d?: string;
          /** 24 hours volume */
          volume24h?: string;
          /** Number of transactions in 24 hours */
          transactions?: number;
          pairs?: number;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/overview`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the gas consumption records for a user aggregation operation in the BRC20 Swap service. It supports filtering by address and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapGasHistory
   * @summary Gets the gas consumption records for a user aggregation operation.
   * @request GET:/v1/brc20-swap/gas_history
   * @secure
   */
  getBrc20SwapGasHistory = (
    query: {
      address?: string;
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
          total?: number;
          list?: {
            /**
             * Function type
             * @example "swap"
             */
            funcType?: string;
            tickA?: string;
            tickB?: string;
            gas?: string;
            /** Fee tick */
            tick?: string;
            /** Recipient address */
            to?: string;
            ts?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/gas_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the history of send transactions in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapSendHistory
   * @summary Gets the history of send transaction.
   * @request GET:/v1/brc20-swap/send_history
   * @secure
   */
  getBrc20SwapSendHistory = (
    query: {
      address?: string;
      tick?: string;
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
          total?: number;
          list?: {
            tick?: string;
            amount?: string;
            to?: string;
            ts?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/send_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the history of pair addition pools in the BRC20 Swap service. It supports filtering by address, tick, type (add or remove), and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapLiqHistory
   * @summary Gets the history of a pair addition pool.
   * @request GET:/v1/brc20-swap/liq_history
   * @secure
   */
  getBrc20SwapLiqHistory = (
    query: {
      address?: string;
      tick?: string;
      /** Optional: add, remove */
      type?: string;
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
          total?: number;
          list?: {
            type?: string;
            tick0?: string;
            tick1?: string;
            amount0?: string;
            amount1?: string;
            /** Reward amount for tick0 */
            reward0?: string;
            /** Reward amount for tick1 */
            reward1?: string;
            lp?: string;
            ts?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/liq_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the history of swap transactions in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapSwapHistory
   * @summary Gets the history of swap.
   * @request GET:/v1/brc20-swap/swap_history
   * @secure
   */
  getBrc20SwapSwapHistory = (
    query: {
      address?: string;
      tick?: string;
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
          total?: number;
          list?: {
            /** Input tick */
            tickIn: string;
            /** Output tick */
            tickOut: string;
            /** The amount of input tick */
            amountIn: string;
            /** The amount of output tick */
            amountOut: string;
            exactType?: string;
            ts?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/swap_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the chain history of rollup inscriptions in the BRC20 Swap service. It supports filtering by inscription ID and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapRollupHistory
   * @summary Get chain history of rollup inscription.
   * @request GET:/v1/brc20-swap/rollup_history
   * @secure
   */
  getBrc20SwapRollupHistory = (
    query: {
      /** @exclusiveMax true */
      start: number;
      /**
       * @max 1000
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
          total?: number;
          list?: {
            txid?: string;
            height?: number;
            /** Number of transactions in the inscription */
            transactionNum?: number;
            /** Rollup inscription id */
            inscriptionId?: string;
            /** Rollup inscription number */
            inscriptionNumber?: number;
            ts?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/rollup_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the deposit list for a user in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapDepositList
   * @summary Gets the deposit list for a user.
   * @request GET:/v1/brc20-swap/deposit_list
   * @secure
   */
  getBrc20SwapDepositList = (
    query: {
      address: string;
      tick?: string;
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
          total?: number;
          list?: {
            tick?: string;
            amount?: string;
            /** Current number of confirmations */
            cur?: number;
            /** Total number of confirmations */
            sum?: number;
            ts?: number;
            txid?: string;
            type?: string;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/deposit_list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface creates a deposit PSBT to be signed by the user in the BRC20 Swap service. It requires the inscription ID, public key, and address parameters to generate the PSBT.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapCreateDeposit
   * @summary Create a deposit psbt to be signed by the user.
   * @request GET:/v1/brc20-swap/create_deposit
   * @secure
   */
  getBrc20SwapCreateDeposit = (
    query: {
      inscriptionId: string;
      pubkey: string;
      address: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          psbt?: string;
          /** Direct or matching */
          type?: string;
          expiredTimestamp?: number;
          recommendDeposit?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/create_deposit`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface allows the user to sign the deposit PSBT and submit the confirmation in the BRC20 Swap service. It requires the PSBT and inscription ID to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapConfirmDeposit
   * @summary User signature deposit psbt, submit confirmation.
   * @request POST:/v1/brc20-swap/confirm_deposit
   * @secure
   */
  postBrc20SwapConfirmDeposit = (
    data: {
      psbt: string;
      inscriptionId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** Transaction ID */
          txid?: string;
          /** Number of pending confirmations */
          pendingNum?: number;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/confirm_deposit`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the current system state of the BRC20 Swap service, including whether rollup inscription committing is enabled.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapSystemStatus
   * @summary Gets the current system state.
   * @request GET:/v1/brc20-swap/system_status
   * @secure
   */
  getBrc20SwapSystemStatus = (params: RequestParams = {}) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** Is rollup inscription committing */
          committing?: boolean;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/system_status`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the user withdrawal history in the BRC20 Swap service. It supports filtering by address, pagination through start and limit parameters, and an optional tick parameter.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapWithdrawHistory
   * @summary Gets the user withdrawal history.
   * @request GET:/v1/brc20-swap/withdraw_history
   * @secure
   */
  getBrc20SwapWithdrawHistory = (
    query: {
      address: string;
      start: number;
      limit: number;
      tick?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          total?: number;
          list?: {
            id?: string;
            tick?: string;
            /** Total amount withdrawal */
            totalAmount?: string;
            /** The number of withdrawal completed */
            completedAmount?: string;
            ts?: number;
            /** The current number of confirmations */
            totalConfirmedNum?: number;
            /** The total number of confirmations */
            totalNum?: number;
            status?: string;
            type?: string;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/withdraw_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retries to create a withdrawal PSBT to be signed by the user in the BRC20 Swap service. It requires the withdrawal order ID, public key, and address parameters to generate the PSBT.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapCreateRetryWithdraw
   * @summary Retry create a withdraw psbt to be signed by the user.
   * @request GET:/v1/brc20-swap/create_retry_withdraw
   * @secure
   */
  getBrc20SwapCreateRetryWithdraw = (
    query: {
      id: string;
      pubkey: string;
      address: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** The user psbt with payment */
          paymentPsbt?: string;
          /** The user psbt with approve insctiption */
          approvePsbt?: string;
          networkFee?: number;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/create_retry_withdraw`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface allows the user to sign the retry withdrawal PSBT and submit the confirmation in the BRC20 Swap service. It requires the withdrawal order ID, payment PSBT, and approve PSBT to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapConfirmRetryWithdraw
   * @summary User signature withdraw psbt, submit confirmation.
   * @request POST:/v1/brc20-swap/confirm_retry_withdraw
   * @secure
   */
  postBrc20SwapConfirmRetryWithdraw = (
    data: {
      /** The withdraw order id */
      id: string;
      paymentPsbt: string;
      approvePsbt: string;
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
      path: `/v1/brc20-swap/confirm_retry_withdraw`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface creates a withdrawal PSBT to be signed by the user in the BRC20 Swap service. It requires the public key, address, tick, amount, timestamp, and fee tick parameters to generate the PSBT.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapCreateWithdraw
   * @summary Create a withdraw psbt to be signed by the user.
   * @request GET:/v1/brc20-swap/create_withdraw
   * @secure
   */
  getBrc20SwapCreateWithdraw = (
    query: {
      pubkey: string;
      address: string;
      tick: string;
      amount: string;
      ts: number;
      feeTick: string;
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
      path: `/v1/brc20-swap/create_withdraw`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface allows the user to sign the withdrawal PSBT and submit the confirmation in the BRC20 Swap service. It requires the withdrawal order ID, payment PSBT, approve PSBT, fee tick, and optional fee amount to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapConfirmWithdraw
   * @summary User signature withdraw psbt, submit confirmation.
   * @request POST:/v1/brc20-swap/confirm_withdraw
   * @secure
   */
  postBrc20SwapConfirmWithdraw = (
    data: {
      /** The withdraw order id */
      id: string;
      paymentPsbt: string;
      approvePsbt: string;
      feeTick: string;
      /** The fee that the user needs to pay */
      feeAmount?: string;
      /** The price of fee tick */
      feeTickPrice?: string;
      /** User signature */
      sigs?: string[];
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
      path: `/v1/brc20-swap/confirm_withdraw`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the withdrawal progress for a specific ID in the BRC20 Swap service. It requires the ID parameter to identify the withdrawal order.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapWithdrawProcess
   * @summary Gets the withdrawal progress for the specified ID.
   * @request GET:/v1/brc20-swap/withdraw_process
   * @secure
   */
  getBrc20SwapWithdrawProcess = (
    query: {
      id: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          id?: string;
          tick?: string;
          amount?: string;
          ts?: number;
          status?: string;
          totalConfirmedNum?: number;
          /** Total number of confirmations (rollUp + approve) */
          totalNum?: number;
          rollUpConfirmNum?: number;
          /** Total number of rollUp confirmations */
          rollUpTotalNum?: number;
          approveConfirmNum?: number;
          /** Total number of approve confirmations */
          approveTotalNum?: number;
          cancelConfirmedNum?: number;
          cancelTotalNum?: number;
          /** Decrease operation is required to withdraw, which in rollup inscription */
          rollUpTxid?: string;
          paymentTxid?: string;
          inscribeTxid?: string;
          approveTxid?: string;
          completedAmount?: string;
          matchHistory?: {
            /** Withdraw inscription */
            approveInscriptionId?: string;
            /** Deposit inscription */
            transferInscriptionId?: string;
            tick?: string;
            consumeAmount?: string;
            /** Residual cash withdrawal */
            remainAmount?: string;
            /** Withdraw user address */
            approveAddress?: string;
            /** Deposit user address */
            transferAddress?: string;
            /** Matching txid */
            txid?: string;
            ts?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/withdraw_process`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags brc20-swap
   * @name GetBrc20SwapQuoteSwap
   * @summary Returns the estimated number of swaps based on the input and exact type.
   * @request GET:/v1/brc20-swap/quote_swap
   * @secure
   */
  getBrc20SwapQuoteSwap = (
    query: {
      address: string;
      /** Input tick */
      tickIn: string;
      /** Output tick */
      tickOut: string;
      /** If it is exactIn, it is the amount of input tick, else is the amount of output tick */
      amount: string;
      /**
       * Exact input or exact output
       * @example "exactIn"
       */
      exactType: "exactIn" | "exactOut";
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** Input amount of usd value */
          amountUSD?: string;
          /** Estimated amount of usd value */
          expectUSD?: string;
          /** Estimated amount */
          expect?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/quote_swap`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags brc20-swap
   * @name GetBrc20SwapQuoteAddLiq
   * @summary Based on the pair to get the actual addition ratio, LP number and other information.
   * @request GET:/v1/brc20-swap/quote_add_liq
   * @secure
   */
  getBrc20SwapQuoteAddLiq = (
    query: {
      address: string;
      tick0: string;
      tick1: string;
      /** The expect amount of tick0 */
      amount0?: string;
      /** The expect amount of tick1 */
      amount1?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** The real amount of tick0 */
          amount0?: string;
          /** The real amount of tick1 */
          amount1?: string;
          /** The usd value of amount0 */
          amount0USD?: string;
          /** The usd value of amount1 */
          amount1USD?: string;
          /** Estimated lp */
          lp?: string;
          /** tick0/tick1 */
          tick0PerTick1?: string;
          /** tick1/tick0 */
          tick1PerTick0?: string;
          /** The proportion of the injected quantity in the pool */
          shareOfPool?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/quote_add_liq`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags brc20-swap
   * @name GetBrc20SwapQuoteRemoveLiq
   * @summary Estimate the number of ticks you can get by typing LP.
   * @request GET:/v1/brc20-swap/quote_remove_liq
   * @secure
   */
  getBrc20SwapQuoteRemoveLiq = (
    query: {
      address: string;
      tick0: string;
      tick1: string;
      lp: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          tick0?: string;
          tick1?: string;
          /** Amount of tick0 */
          amount0: string;
          /** Amount of tick1 */
          amount1: string;
          amount0USD?: string;
          amount1USD?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/quote_remove_liq`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /stake operation, providing the signature content, gas, and byte information required for staking in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPreStake
   * @summary Prepare stake operation
   * @request GET:/v1/brc20-swap/pre_stake
   * @secure
   */
  getBrc20SwapPreStake = (
    query: {
      pid: string;
      address: string;
      /** The amount of send tick */
      amount: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pre_stake`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /unstake operation, providing the signature content, gas, and byte information required for unstaking in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPreUnstake
   * @summary Prepare unstake operation
   * @request GET:/v1/brc20-swap/pre_unstake
   * @secure
   */
  getBrc20SwapPreUnstake = (
    query: {
      pid: string;
      address: string;
      /** The amount of send tick */
      amount: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pre_unstake`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /claim operation, providing the signature content, gas, and byte information required for claiming rewards in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPreClaim
   * @summary Prepare claim operation
   * @request GET:/v1/brc20-swap/pre_claim
   * @secure
   */
  getBrc20SwapPreClaim = (
    query: {
      pid: string;
      address: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pre_claim`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /send_lp operation, providing the signature content, gas, and byte information required for sending LP in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPreSendLp
   * @summary Prepare send LP operation
   * @request GET:/v1/brc20-swap/pre_send_lp
   * @secure
   */
  getBrc20SwapPreSendLp = (
    query: {
      address: string;
      /** Lp tick0 */
      tick0: string;
      /** Lp tick1 */
      tick1: string;
      /** The amount of send tick */
      amount: string;
      /** The receiver of send tick */
      to: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
          amount0PerLp?: string;
          amount1PerLp?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pre_send_lp`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface sends LP in the BRC20 Swap service. It requires the address, tick0, tick1, amount, receiver, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapSendLp
   * @summary The send LP operation.
   * @request POST:/v1/brc20-swap/send_lp
   * @secure
   */
  postBrc20SwapSendLp = (
    data: {
      address: string;
      /** Lp tick0 */
      tick0: string;
      /** Lp tick1 */
      tick1: string;
      /** The amount of send tick */
      amount: string;
      /** The receiver of send tick */
      to: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** The fee that the user needs to pay */
      feeAmount: string;
      /** The price of fee tick */
      feeTickPrice: string;
      /** User signature */
      sigs?: string[];
      payType?: string;
      rememberPayType?: boolean;
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
      path: `/v1/brc20-swap/send_lp`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface stakes LP in the BRC20 Swap service. It requires the pid, address, amount, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapStake
   * @summary The stake operation.
   * @request POST:/v1/brc20-swap/stake
   * @secure
   */
  postBrc20SwapStake = (
    data: {
      pid: string;
      address: string;
      /** The amount of send tick */
      amount: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** The fee that the user needs to pay */
      feeAmount: string;
      /** The price of fee tick */
      feeTickPrice: string;
      /** User signature */
      sigs?: string[];
      payType?: string;
      rememberPayType?: boolean;
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
      path: `/v1/brc20-swap/stake`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface unstakes LP in the BRC20 Swap service. It requires the pid, address, amount, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapUnstake
   * @summary The unstake operation.
   * @request POST:/v1/brc20-swap/unstake
   * @secure
   */
  postBrc20SwapUnstake = (
    data: {
      pid: string;
      address: string;
      /** The amount of send tick */
      amount: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** The fee that the user needs to pay */
      feeAmount: string;
      /** The price of fee tick */
      feeTickPrice: string;
      /** User signature */
      sigs?: string[];
      payType?: string;
      rememberPayType?: boolean;
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
      path: `/v1/brc20-swap/unstake`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface claims rewards in the BRC20 Swap service. It requires the pid, address, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapClaim
   * @summary The claim operation.
   * @request POST:/v1/brc20-swap/claim
   * @secure
   */
  postBrc20SwapClaim = (
    data: {
      pid: string;
      address: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** The fee that the user needs to pay */
      feeAmount: string;
      /** The price of fee tick */
      feeTickPrice: string;
      /** User signature */
      sigs?: string[];
      payType?: string;
      rememberPayType?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** Claimed reward amount */
          amount?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/claim`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the LP reward history for a specific pair in the BRC20 Swap service. It requires the address, tick0, tick1, and pagination parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapLpRewardHistory
   * @summary Gets the user pool information for the specified pair.
   * @request GET:/v1/brc20-swap/lp_reward_history
   * @secure
   */
  getBrc20SwapLpRewardHistory = (
    query: {
      address: string;
      tick0: string;
      tick1: string;
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
          total?: number;
          list?: {
            id?: string;
            type?: string;
            address?: string;
            tick0?: string;
            tick1?: string;
            reward0?: string;
            reward1?: string;
            ts?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/lp_reward_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the stake history in the BRC20 Swap service. It supports filtering by pid, address, type, and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapStakeHistory
   * @summary Gets the stake history.
   * @request GET:/v1/brc20-swap/stake_history
   * @secure
   */
  getBrc20SwapStakeHistory = (
    query: {
      pid?: string;
      search?: string;
      address: string;
      type: string;
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
          total?: number;
          list?: {
            pid?: string;
            address?: string;
            poolTick0?: string;
            poolTick1?: string;
            type?: string;
            amount?: string;
            tick?: string;
            ts?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/stake_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the stake list in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapStakeList
   * @summary Gets the stake list.
   * @request GET:/v1/brc20-swap/stake_list
   * @secure
   */
  getBrc20SwapStakeList = (params: RequestParams = {}) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list?: {
            startBlock?: number;
            endBlock?: number;
            stakePools?: {
              summary?: {
                pid?: string;
                poolTick0?: string;
                poolTick1?: string;
                rewardTick?: string;
                curTotalLp?: string;
                baseReward?: string;
                stageNeedLp?: string[];
                stageAddedRewards?: string[];
              };
            }[];
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/stake_list`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags brc20-swap
   * @name GetBrc20SwapStakeItem
   * @summary Gets the stake item.
   * @request GET:/v1/brc20-swap/stake_item
   * @secure
   */
  getBrc20SwapStakeItem = (
    query: {
      eid: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          item?: {
            startBlock?: number;
            endBlock?: number;
            stakePools?: {
              summary?: {
                pid?: string;
                poolTick0?: string;
                poolTick1?: string;
                rewardTick?: string;
                curTotalLp?: string;
                baseReward?: string;
                stageNeedLp?: string[];
                stageAddedRewards?: string[];
              };
            }[];
          };
          newestHeight?: number;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/stake_item`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the stake user information in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapStakeUserInfo
   * @summary Gets the user info.
   * @request GET:/v1/brc20-swap/stake_user_info
   * @secure
   */
  getBrc20SwapStakeUserInfo = (
    query?: {
      address?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: Record<string, any>;
      },
      any
    >({
      path: `/v1/brc20-swap/stake_user_info`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the user information in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapUserInfo
   * @summary Gets the user info.
   * @request GET:/v1/brc20-swap/user_info
   * @secure
   */
  getBrc20SwapUserInfo = (
    query: {
      address: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          defaultPayType?: string;
          rememberPayType?: boolean;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/user_info`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags brc20-swap
   * @name GetBrc20SwapSelectDeposit
   * @summary Select deposit information
   * @request GET:/v1/brc20-swap/select_deposit
   * @secure
   */
  getBrc20SwapSelectDeposit = (
    query: {
      pubkey: string;
      address: string;
      v?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: Record<string, any>;
      },
      any
    >({
      path: `/v1/brc20-swap/select_deposit`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags brc20-swap
   * @name GetBrc20SwapFuncInfo
   * @summary Gets the func info.
   * @request GET:/v1/brc20-swap/func_info
   * @secure
   */
  getBrc20SwapFuncInfo = (
    query: {
      id: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: Record<string, any>;
      },
      any
    >({
      path: `/v1/brc20-swap/func_info`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags brc20-swap
   * @name GetBrc20SwapDepositBalance
   * @summary Gets the deposit balance
   * @request GET:/v1/brc20-swap/deposit_balance
   * @secure
   */
  getBrc20SwapDepositBalance = (
    query: {
      pubkey: string;
      address: string;
      tick: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: Record<string, any>;
      },
      any
    >({
      path: `/v1/brc20-swap/deposit_balance`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the deposit process for a specific transaction ID in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapDepositProcess
   * @summary Gets the deposit process.
   * @request GET:/v1/brc20-swap/deposit_process
   * @secure
   */
  getBrc20SwapDepositProcess = (
    query: {
      txid: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          tick?: string;
          amount?: string;
          /** Current number of confirmations */
          cur?: number;
          /** Total number of confirmations */
          sum?: number;
          ts?: number;
          txid?: string;
          type?: string;
          status?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/deposit_process`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the price for a specific tick in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapTickPrice
   * @summary Gets the tick price
   * @request GET:/v1/brc20-swap/tick_price
   * @secure
   */
  getBrc20SwapTickPrice = (
    query: {
      tick: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          price?: number;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/tick_price`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the total gas consumption for a specific address and fee tick in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapAddressGas
   * @summary Gets the address's total tick fee
   * @request GET:/v1/brc20-swap/address_gas
   * @secure
   */
  getBrc20SwapAddressGas = (
    query: {
      address: string;
      feeTick: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          total?: number;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/address_gas`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the price line data for a specific pair in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPriceLine
   * @summary Gets the price line.
   * @request GET:/v1/brc20-swap/price_line
   * @secure
   */
  getBrc20SwapPriceLine = (
    query: {
      tick0: string;
      tick1: string;
      timeRange: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          list?: {
            price?: number;
            usdPrice?: number;
            ts?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/price_line`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the community information for a specific tick in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapCommunityInfo
   * @summary Gets the community info.
   * @request GET:/v1/brc20-swap/community_info
   * @secure
   */
  getBrc20SwapCommunityInfo = (
    query: {
      tick: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          tick?: string;
          twitter?: string;
          telegram?: string;
          website?: string;
          discord?: string;
          desc?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/community_info`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface adds or updates community information for a specific tick in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapAddCommunityInfo
   * @summary Adds community info.
   * @request POST:/v1/brc20-swap/add_community_info
   * @secure
   */
  postBrc20SwapAddCommunityInfo = (
    data: {
      tick: string;
      twitter?: string;
      telegram?: string;
      website?: string;
      discord?: string;
      desc?: string;
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
      path: `/v1/brc20-swap/add_community_info`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the list of all community information in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapCommunityList
   * @summary Gets the community info list.
   * @request GET:/v1/brc20-swap/community_list
   * @secure
   */
  getBrc20SwapCommunityList = (params: RequestParams = {}) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          total?: number;
          list?: {
            tick?: string;
            twitter?: string;
            telegram?: string;
            website?: string;
            discord?: string;
            desc?: string;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/community_list`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the list of tick holders for a specific tick in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapTickHolders
   * @summary Gets the tick holders.
   * @request GET:/v1/brc20-swap/tick_holders
   * @secure
   */
  getBrc20SwapTickHolders = (
    query: {
      tick: string;
      start: number;
      /** @max 100 */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          total?: number;
          list?: {
            address?: string;
            amount?: string;
            percentage?: number;
            relativePercentage?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/tick_holders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the list of pool holders for a specific pair in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPoolHolders
   * @summary Gets the pool holders.
   * @request GET:/v1/brc20-swap/pool_holders
   * @secure
   */
  getBrc20SwapPoolHolders = (
    query: {
      tick0: string;
      tick1: string;
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
          total?: number;
          list?: {
            address?: string;
            amount0?: string;
            amount1?: string;
            lp?: string;
            shareOfPool?: string;
            lockLp?: {
              lp?: string;
              amount0?: string;
              amount1?: string;
            };
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pool_holders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the reward curve data for a specific pair and time range in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapRewardCurve
   * @summary Get reward curve data.
   * @request GET:/v1/brc20-swap/reward_curve
   * @secure
   */
  getBrc20SwapRewardCurve = (
    query: {
      address: string;
      tick0: string;
      tick1: string;
      startTime: number;
      endTime: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: Record<string, any>;
      },
      any
    >({
      path: `/v1/brc20-swap/reward_curve`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the history of send LP transactions in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapSendLpHistory
   * @summary Gets the history of send lp transaction.
   * @request GET:/v1/brc20-swap/send_lp_history
   * @secure
   */
  getBrc20SwapSendLpHistory = (
    query: {
      address?: string;
      tick?: string;
      fuzzySearch?: boolean;
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
          total?: number;
          list?: {
            tick?: string;
            amount?: string;
            to?: string;
            ts?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/send_lp_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the history of burn transactions in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapBurnHistory
   * @summary Gets the history of burn transaction.
   * @request GET:/v1/brc20-swap/burn_history
   * @secure
   */
  getBrc20SwapBurnHistory = (
    query: {
      address?: string;
      tick?: string;
      fuzzySearch?: boolean;
      start: number;
      /**
       * @max 100
       * @exclusiveMax true
       */
      limit: number;
      ts?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          total?: number;
          /** Total LP amount */
          totalLp?: string;
          /** Burned LP amount */
          burnedLp?: string;
          list?: {
            tick?: string;
            amount?: string;
            to?: string;
            ts?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/burn_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the task list for a specific address in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapTaskList
   * @summary Get task list for address.
   * @request GET:/v1/brc20-swap/task_list
   * @secure
   */
  getBrc20SwapTaskList = (
    query: {
      /** @default "1" */
      tid?: string;
      address: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          tid?: string;
          list?: {
            tid?: string;
            itemId?: string;
            address?: string;
            done?: boolean;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/task_list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the USD value of assets for a specific address in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapAddressUsd
   * @summary Get address usd.
   * @request GET:/v1/brc20-swap/address_usd
   * @secure
   */
  getBrc20SwapAddressUsd = (
    query: {
      address: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          assetsUSD?: string;
          lpUSD?: string;
        }[];
      },
      any
    >({
      path: `/v1/brc20-swap/address_usd`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /lock_lp operation, providing the signature content, gas, and byte information required for locking LP in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPreLockLp
   * @summary Prepare lock LP operation
   * @request GET:/v1/brc20-swap/pre_lock_lp
   * @secure
   */
  getBrc20SwapPreLockLp = (
    query: {
      address: string;
      lockDay: string;
      /** Lp tick0 */
      tick0: string;
      /** Lp tick1 */
      tick1: string;
      /** The amount of lock tick */
      amount: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
          amount0PerLp?: string;
          amount1PerLp?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pre_lock_lp`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface locks LP in the BRC20 Swap service. It requires the address, lockDay, tick0, tick1, amount, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapLockLp
   * @summary The lock lp operation.
   * @request POST:/v1/brc20-swap/lock_lp
   * @secure
   */
  postBrc20SwapLockLp = (
    data: {
      address: string;
      lockDay: string;
      tick0: string;
      tick1: string;
      /** The amount of lock tick */
      amount: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** The fee that the user needs to pay */
      feeAmount: string;
      /** The price of fee tick */
      feeTickPrice: string;
      /** User signature */
      sigs?: string[];
      payType?: string;
      rememberPayType?: boolean;
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
      path: `/v1/brc20-swap/lock_lp`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /unlock_lp operation, providing the signature content, gas, and byte information required for unlocking LP in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPreUnlockLp
   * @summary Prepare unlock LP operation
   * @request GET:/v1/brc20-swap/pre_unlock_lp
   * @secure
   */
  getBrc20SwapPreUnlockLp = (
    query: {
      address: string;
      /** Lp tick0 */
      tick0: string;
      /** Lp tick1 */
      tick1: string;
      /** The amount of unlock tick */
      amount: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
          amount0PerLp?: string;
          amount1PerLp?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/pre_unlock_lp`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface unlocks LP in the BRC20 Swap service. It requires the address, tick0, tick1, amount, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapUnlockLp
   * @summary The unlock lp operation.
   * @request POST:/v1/brc20-swap/unlock_lp
   * @secure
   */
  postBrc20SwapUnlockLp = (
    data: {
      address: string;
      tick0: string;
      tick1: string;
      /** The amount of unlock tick */
      amount: string;
      /** Timestamp (seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** The fee that the user needs to pay */
      feeAmount: string;
      /** The price of fee tick */
      feeTickPrice: string;
      /** User signature */
      sigs?: string[];
      payType?: string;
      rememberPayType?: boolean;
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
      path: `/v1/brc20-swap/unlock_lp`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the history of lock LP transactions in the BRC20 Swap service. It supports filtering by address, tick, lockDay, and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapLockLpHistory
   * @summary Gets the history of lock lp transaction.
   * @request GET:/v1/brc20-swap/lock_lp_history
   * @secure
   */
  getBrc20SwapLockLpHistory = (
    query: {
      tick?: string;
      tick0?: string;
      tick1?: string;
      start: number;
      limit: number;
      address?: string;
      lockDay?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          total?: number;
          list?: {
            id?: string;
            address?: string;
            tick0?: string;
            tick1?: string;
            lp?: string;
            amount0?: string;
            amount1?: string;
            amount0USD?: string;
            amount1USD?: string;
            lockDay?: number;
            unlockTime?: string;
            ts?: number;
            shareOfPool?: string;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/lock_lp_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the history of unlock LP transactions in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapUnlockLpHistory
   * @summary Gets the history of unlock lp transaction.
   * @request GET:/v1/brc20-swap/unlock_lp_history
   * @secure
   */
  getBrc20SwapUnlockLpHistory = (
    query: {
      tick?: string;
      tick0?: string;
      tick1?: string;
      start: number;
      limit: number;
      address?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          total?: number;
          list?: {
            id?: string;
            address?: string;
            tick0?: string;
            tick1?: string;
            lp?: string;
            amount0?: string;
            amount1?: string;
            amount0USD?: string;
            amount1USD?: string;
            ts?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/unlock_lp_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface exports the lock LP history to a CSV file in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapExportLockLpHistory
   * @summary Export lock lp history to CSV file.
   * @request GET:/v1/brc20-swap/export_lock_lp_history
   * @secure
   */
  getBrc20SwapExportLockLpHistory = (
    query: {
      tick0: string;
      tick1: string;
      lockDay?: number;
      lockTime?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, any>({
      path: `/v1/brc20-swap/export_lock_lp_history`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description This interface retrieves the user's lock LP information for a specific pair in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapMyLockLp
   * @summary Gets the user lock lp.
   * @request GET:/v1/brc20-swap/my_lock_lp
   * @secure
   */
  getBrc20SwapMyLockLp = (
    query: {
      tick0: string;
      tick1: string;
      address: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          lp?: string;
          lockLp?: string;
          availableLp?: string;
          availableAmount0?: string;
          availableAmount1?: string;
          shareOfPool?: string;
        };
      },
      any
    >({
      path: `/v1/brc20-swap/my_lock_lp`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the tick information that can be used for swapping based on the provided address and optional filters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapSelectPool
   * @summary Select the tick information that you can swap.
   * @request GET:/v1/brc20-swap/select_pool
   * @secure
   */
  getBrc20SwapSelectPool = (
    query: {
      address: string;
      tickIn?: string;
      tickOut?: string;
      search?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          tick?: string;
          decimal?: string;
          /** Module balance (not participate in swap calculations) */
          brc20Balance?: string;
          /** Swap balance */
          swapBalance?: string;
          /** Available routes for swapping */
          routes?: string[];
        }[];
      },
      any
    >({
      path: `/v1/brc20-swap/select_pool`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface pre-loads the /multi_swap operation, providing the signature content and gas information required for multi swapping in the BRC20 Swap service.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapPreMultiSwap
   * @summary Prepare multi swap operation
   * @request GET:/v1/brc20-swap/pre_multi_swap
   * @secure
   */
  getBrc20SwapPreMultiSwap = (
    query: {
      address: string;
      /** Input tick */
      tickIn: string;
      /** Output tick */
      tickOut: string;
      /** The amount of input tick */
      amountIn: string;
      /** The amount of output tick */
      amountOut: string;
      slippage: string;
      /** @example "exactIn" */
      exactType: "exactIn" | "exactOut";
      /** Timestamp(seconds) */
      ts: number;
      /** Tick used as fee */
      feeTick: string;
      /** Pay Type: tick, freeQuota */
      payType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** User signature id */
          ids: string[];
          /** User signature information */
          signMsgs: string[];
          /** The fee that the user needs to pay */
          feeAmount?: string;
          /** The price of fee tick */
          feeTickPrice?: string;
          /** The user's fee tick balance */
          feeBalance?: string;
          /** The dollar value of the fee */
          usdPrice?: string;
        }[];
      },
      any
    >({
      path: `/v1/brc20-swap/pre_multi_swap`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface performs multi swaps in the BRC20 Swap service. It requires an array of swap items, each with address, input tick, output tick, amounts, slippage, exact type, timestamp, fee tick, and user signatures to complete the operation.
   *
   * @tags brc20-swap
   * @name PostBrc20SwapMultiSwap
   * @summary The multi swap operation.
   * @request POST:/v1/brc20-swap/multi_swap
   * @secure
   */
  postBrc20SwapMultiSwap = (
    data: {
      items: {
        address: string;
        /** Input tick */
        tickIn: string;
        /** Output tick */
        tickOut: string;
        /** The amount of input tick */
        amountIn: string;
        /** The amount of output tick */
        amountOut: string;
        feeTick: string;
        slippage: string;
        exactType: "exactIn" | "exactOut";
        /** Timestamp (seconds) */
        ts: number;
        /** The fee that the user needs to pay */
        feeAmount: string;
        /** The price of fee tick */
        feeTickPrice: string;
        /** User signature */
        sigs?: string[];
        payType?: string;
        rememberPayType?: boolean;
        assetFeeTick?: string;
        assetFeeAmount?: string;
        assetFeeTickPrice?: string;
      }[];
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          address?: string;
          tickIn?: string;
          tickOut?: string;
          success?: boolean;
          amountIn?: string;
          amountOut?: string;
          exactType?: string;
          value?: number;
          ts?: number;
          failureReason?: string;
        }[];
      },
      any
    >({
      path: `/v1/brc20-swap/multi_swap`,
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
   * @tags brc20-swap
   * @name GetBrc20SwapQuoteMultiSwap
   * @summary Returns the estimated number of multi swaps based on the input and exact type.
   * @request GET:/v1/brc20-swap/quote_multi_swap
   * @secure
   */
  getBrc20SwapQuoteMultiSwap = (
    query: {
      address: string;
      /** Input tick */
      tickIn: string;
      /** Output tick */
      tickOut: string;
      /** If it is exactIn, it is the amount of input tick, else is the amount of output tick */
      amount: string;
      /**
       * Exact input or exact output
       * @example "exactIn"
       */
      exactType: "exactIn" | "exactOut";
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          /** Input amount of usd value */
          amountUSD?: string;
          /** Estimated amount of usd value */
          expectUSD?: string;
          /** Estimated amount */
          expect?: string;
          /** Estimated amounts for each route */
          routesExpect?: string[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/quote_multi_swap`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description This interface retrieves the history of multi swap transactions in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.
   *
   * @tags brc20-swap
   * @name GetBrc20SwapMultiSwapHistory
   * @summary Gets the history of multi swap.
   * @request GET:/v1/brc20-swap/multi_swap_history
   * @secure
   */
  getBrc20SwapMultiSwapHistory = (
    query: {
      address?: string;
      tick?: string;
      fuzzySearch?: boolean;
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
          total?: number;
          list?: {
            address?: string;
            /** Input tick */
            tickIn: string;
            /** Output tick */
            tickOut: string;
            /** The amount of input tick */
            amountIn: string;
            /** The amount of output tick */
            amountOut: string;
            exactType?: string;
            ts?: number;
            /** Swap value */
            value?: number;
            /** First route details */
            route0?: {
              id?: string;
              tickIn?: string;
              tickOut?: string;
              amountIn?: string;
              amountOut?: string;
              exactType?: string;
              ts?: number;
              success?: boolean;
              failureReason?: string;
            };
            /** Second route details */
            route1?: {
              id?: string;
              tickIn?: string;
              tickOut?: string;
              amountIn?: string;
              amountOut?: string;
              exactType?: string;
              ts?: number;
              success?: boolean;
              failureReason?: string;
            };
          }[];
        };
      },
      any
    >({
      path: `/v1/brc20-swap/multi_swap_history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieves the circulating supply of Fractal Bitcoin (FB) in the mainnet.
   *
   * @tags Fractal
   * @name GetFractalSupply
   * @summary Get circulating FB in fractal mainnet
   * @request GET:/v1/public/fractal/supply
   * @secure
   */
  getFractalSupply = (params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        /** @example "OK" */
        msg?: string;
        data?: FractalSupply;
      },
      void
    >({
      path: `/v1/public/fractal/supply`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieves the total supply of Fractal Bitcoin (FB) in the mainnet.
   *
   * @tags Fractal
   * @name GetFractalTotalSupply
   * @summary Get total supply FB in fractal mainnet
   * @request GET:/v1/public/fractal/total-supply
   * @secure
   */
  getFractalTotalSupply = (params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        /** @example "OK" */
        msg?: string;
        data?: FractalSupply;
      },
      void
    >({
      path: `/v1/public/fractal/total-supply`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieves the total number of addresses in the Fractal network.
   *
   * @tags Fractal
   * @name GetFractalTotalAddress
   * @summary Get total address
   * @request GET:/v1/public/address/total
   * @secure
   */
  getFractalTotalAddress = (params: RequestParams = {}) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        /** @example "OK" */
        msg?: string;
        data?: number;
      },
      void
    >({
      path: `/v1/public/address/total`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieves a list of addresses sorted by their balance in descending order.
   *
   * @tags Fractal
   * @name GetFractalRichList
   * @summary Get address rich list
   * @request GET:/v1/public/address/rich-list
   * @secure
   */
  getFractalRichList = (
    query: {
      /**
       * Start offset
       * @example 0
       */
      cursor: number;
      /**
       * Number of items returned (Max 10000)
       * @example 16
       */
      size: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        /** @example "OK" */
        msg?: string;
        data?: AddressBalance;
      },
      void
    >({
      path: `/v1/public/address/rich-list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieves the current price of a CAT20 token. If the token has no trades in the last 30 days, it will return the last price.
   *
   * @tags CAT20-DEX
   * @name GetTokenPrice
   * @summary Get token price
   * @request GET:/v1/cat20-dex/getTokenPrice
   * @secure
   */
  getTokenPrice = (
    query: {
      /**
       * tokenId
       * @example "45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0"
       */
      tokenId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        /** @example "OK" */
        msg?: string;
        data?: {
          askPrice?: number;
          bidPrice?: number;
          latestTradePrice?: number;
          timestamp?: string;
          height?: number;
        };
      },
      void
    >({
      path: `/v1/cat20-dex/getTokenPrice`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieves the market stats for all tokens which have trades in the last 30 days
   *
   * @tags CAT20-DEX
   * @name GetMarketStats
   * @summary Get the market stats
   * @request GET:/v1/cat20-dex/getMarketStats
   * @secure
   */
  getMarketStats = (
    query?: {
      /** The field to sort by ('volume', 'volume30d', 'volume7d', 'volume24h', 'volume6h') */
      sortField?:
        | "volume"
        | "volume30d"
        | "volume7d"
        | "volume24h"
        | "volume6h";
      /**
       * tokenId
       * @example "45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0"
       */
      tokenId?: string;
      /**
       * The offset to start from
       * @example 0
       */
      offset?: number;
      /**
       * The limit of the stats (default 20, max 100)
       * @example 20
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @format int32 */
        code?: number;
        /** @example "OK" */
        msg?: string;
        data?: {
          tokenStats?: CAT20TokenStats;
          total?: number;
        };
      },
      void
    >({
      path: `/v1/cat20-dex/getMarketStats`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns the latest height of the collection indexer, the last handled height, and the total number of collections.
   *
   * @tags Collection-Indexer
   * @name GetCollectionStatus
   * @summary Return the overall information of the collection service
   * @request GET:/v1/collection-indexer/collection/status
   * @secure
   */
  getCollectionStatus = (params: RequestParams = {}) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          newestHeight?: number;
          lastHandledHeight?: number;
          totalCollection?: number;
        };
      },
      any
    >({
      path: `/v1/collection-indexer/collection/status`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns the details of a specific collection, including its name, icon, supply, description, and social media links.
   *
   * @tags Collection-Indexer
   * @name GetCollectionInfo
   * @summary Return the details of the specified collection
   * @request GET:/v1/collection-indexer/collection/{collectionId}/info
   * @secure
   */
  getCollectionInfo = (
    collectionId: string,
    query?: {
      height?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          height?: number;
          holders?: number;
          totalItems?: number;
        };
      },
      any
    >({
      path: `/v1/collection-indexer/collection/${collectionId}/info`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns the list of addresses that hold items from a specific collection, along with the count of items each address holds.
   *
   * @tags Collection-Indexer
   * @name GetCollectionHolders
   * @summary Return the owner information of a specific collection
   * @request GET:/v1/collection-indexer/collection/{collectionId}/holders
   * @secure
   */
  getCollectionHolders = (
    collectionId: string,
    query: {
      height?: number;
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
          total?: number;
          list?: {
            address?: string;
            count?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/collection-indexer/collection/${collectionId}/holders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns the summary of all collections that the specified address holds, including collection name, icon, supply, and social media links.
   *
   * @tags Collection-Indexer
   * @name GetAddressCollectionList
   * @summary Return the collection summary for the specified address.
   * @request GET:/v1/collection-indexer/address/{address}/collection/list
   * @secure
   */
  getAddressCollectionList = (
    address: string,
    query: {
      height?: number;
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
          total?: number;
          list?: {
            count?: number;
            name?: string;
            iconInscription?: string;
            iconUrl?: string;
            iconContentType?: string;
            supply?: string;
            collectionId?: string;
            desc?: string;
            twitter?: string;
            discord?: string;
            website?: string;
          }[];
        };
      },
      any
    >({
      path: `/v1/collection-indexer/address/${address}/collection/list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns the list of inscriptions that belong to a specific collection, including details such as inscription ID, name, content type, and height.
   *
   * @tags Collection-Indexer
   * @name GetCollectionItems
   * @summary Return the list of inscriptions for a specific collection.
   * @request GET:/v1/collection-indexer/collection/{collectionId}/items
   * @secure
   */
  getCollectionItems = (
    collectionId: string,
    query: {
      height?: number;
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
          total?: number;
          list?: {
            inscriptionId?: string;
            collectionId?: string;
            collectionItemName?: string;
            inscriptionIndex?: number;
            inscriptionNumber?: number;
            inscriptionName?: string;
            contentBody?: string;
            contentLength?: number;
            contentType?: string;
            height?: number;
            holders?: number;
            totalItems?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/collection-indexer/collection/${collectionId}/items`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns the summary of a specific collection for a designated address, including collection name, icon, supply, description, and social media links.
   *
   * @tags Collection-Indexer
   * @name GetAddressCollectionSummary
   * @summary Return the summary of a specific collection for the designated address.
   * @request GET:/v1/collection-indexer/address/{address}/collection/{collectionId}/summary
   * @secure
   */
  getAddressCollectionSummary = (
    address: string,
    collectionId: string,
    query?: {
      height?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          count?: number;
          name?: string;
          iconInscription?: string;
          iconUrl?: string;
          iconContentType?: string;
          supply?: string;
          collectionId?: string;
          desc?: string;
          twitter?: string;
          discord?: string;
          website?: string;
        };
      },
      any
    >({
      path: `/v1/collection-indexer/address/${address}/collection/${collectionId}/summary`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns the list of inscriptions that belong to a specific collection at a designated address, including details such as inscription ID, name,
   *
   * @tags Collection-Indexer
   * @name GetAddressCollectionItems
   * @summary Get the list of inscriptions for a specific collection at a designated address.
   * @request GET:/v1/collection-indexer/address/{address}/collection/{collectionId}/items
   * @secure
   */
  getAddressCollectionItems = (
    address: string,
    collectionId: string,
    query: {
      height?: number;
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
          total?: number;
          list?: {
            inscriptionId?: string;
            collectionId?: string;
            collectionItemName?: string;
            inscriptionIndex?: number;
            inscriptionNumber?: number;
            inscriptionName?: string;
            contentBody?: string;
            contentLength?: number;
            contentType?: string;
            height?: number;
            holders?: number;
            totalItems?: number;
          }[];
        };
      },
      any
    >({
      path: `/v1/collection-indexer/address/${address}/collection/${collectionId}/items`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns the list of collections that a specific inscription belongs to, including collection name, icon, supply, and social media links.
   *
   * @tags Collection-Indexer
   * @name GetInscriptionCollectionList
   * @summary Get inscription collection list
   * @request GET:/v1/collection-indexer/inscription/{inscriptionId}/collection/list
   * @secure
   */
  getInscriptionCollectionList = (
    inscriptionId: string,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        code: number;
        msg: string;
        data: {
          total?: number;
          list?: {
            name?: string;
            iconInscription?: string;
            iconUrl?: string;
            iconContentType?: string;
            supply?: string;
            collectionId?: string;
            desc?: string;
            twitter?: string;
            discord?: string;
            website?: string;
          }[];
        };
      },
      any
    >({
      path: `/v1/collection-indexer/inscription/${inscriptionId}/collection/list`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
