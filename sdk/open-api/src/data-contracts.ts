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

/** @example "token" */
export enum AlkaneType {
  Token = "token",
  Collection = "collection",
  Nft = "nft",
  Contract = "contract",
}

export interface BlockInfo {
  height?: number;
  version?: string;
  auxpow?: boolean;
  id?: string;
  prev?: string;
  next?: string;
  merkle?: string;
  ntx?: number;
  inSatoshi?: number;
  outSatoshi?: number;
  coinbaseOut?: number;
  timestamp?: number;
  bits?: number;
  size?: number;
}

export interface LocalPushParams {
  /**
   * rawtx
   * @example ""
   */
  txHex?: string;
  /** maxfeerate btc/kvB(optional and must less than 1 btc/kvB) */
  maxFeeRate?: number;
}

export interface LocalPushtxsParams {
  txsHex?: string[];
  /** maxfeerate btc/kvB(optional and must less than 1 btc/kvB) */
  maxFeeRate?: number;
}

export interface TxHistoryItem {
  txid?: string;
  nIn?: number;
  nOut?: number;
  inSatoshi?: number;
  outSatoshi?: number;
  locktime?: number;
  size?: number;
  witOffset?: number;
  height?: number;
  idx?: number;
  blkid?: string;
  confirmations?: number;
  timestamp?: number;
}

export interface UTXO {
  address?: string;
  codeType?: number;
  height?: number;
  idx?: number;
  inscriptions?: InscriptionItem[];
  /** @example false */
  isOpInRBF?: boolean;
  /** @example 10000 */
  satoshi?: number;
  scriptPk?: string;
  scriptType?: string;
  txid?: string;
  /** @example 0 */
  vout?: number;
  /** Whether the UTXO has a low fee rate (less than 1 sat/vB) */
  isLowFee?: boolean;
}

export interface InscriptionItem {
  inscriptionId?: string;
  inscriptionNumber?: number;
  isBRC20?: boolean;
  moved?: boolean;
  offset?: number;
}

export interface InscriptionData {
  address?: string;
  offset?: number;
  inscriptionIndex?: number;
  inscriptionId?: string;
  inscriptionNumber?: number;
  hasPointer?: boolean;
  hasParent?: boolean;
  hasDeligate?: boolean;
  hasMetaProtocal?: boolean;
  hasContentEncoding?: boolean;
  pointer?: number;
  parent?: string;
  deligate?: string;
  metaprotocol?: string;
  metadata?: string;
  contentEncoding?: string;
  contentType?: string;
  contentLength?: number;
  height?: number;
  timestamp?: number;
  inSatoshi?: number;
  outSatoshi?: number;
  /** Only BRC20 transfer have this value */
  brc20?: {
    amt?: string;
    decimal?: string;
    lim?: string;
    max?: string;
    minted?: string;
    op?: string;
    tick?: string;
    to?: string;
  };
  utxo?: UTXO;
}

export interface InscriptionEvent {
  /** false: a mint event; true: a transfer event */
  isTransfer?: boolean;
  inscriptionId?: string;
  inscriptionNumber?: number;
  /** current address */
  address?: string;
  /** only present when it's a mint event */
  contentBody?: string;
  /** only present when it's a mint event */
  contentType?: string;
  /** total input satoshi in tx */
  inSatoshi?: number;
  /** total output satoshi in tx */
  outSatoshi?: number;
  pkScript?: string;
  /** satoshi in inscription */
  satoshi?: number;
  /** block timestamp */
  timestamp?: number;
  /** inscription genesis txid */
  txid?: string;
  /** inscription genesis vout */
  i?: number;
  /** tx vout */
  vout?: number;
  sequence?: number;
  height?: number;
  /** tx index in block */
  txidx?: number;
}

export interface AbandonNFTUTXO {
  /** @example 10000 */
  balance?: number;
  /** @example 0 */
  cursor?: number;
  /** @example 1 */
  nftMintCount?: number;
  /** @example 0 */
  nftTransferCount?: number;
  /** @example 1 */
  total?: number;
  utxo?: UTXO[];
}

export interface BRC20InfoItem {
  ticker?: string;
  creator?: string;
  totalMinted?: string;
  confirmedMinted?: string;
  confirmedMinted1h?: string;
  confirmedMinted24h?: string;
  completeBlocktime?: number;
  completeHeight?: number;
  inscriptionNumberEnd?: number;
  inscriptionNumberStart?: number;
  minted?: string;
  mintTimes?: number;
  historyCount?: number;
  holdersCount?: number;
  txid?: string;
  deployHeight?: number;
  deployBlocktime?: number;
  inscriptionId?: string;
  inscriptionNumber?: number;
  max?: string;
  decimal?: number;
  limit?: string;
}

export interface BRC20HistoryInscription {
  confirmations?: number;
  data?: {
    amt?: string;
    decimal?: string;
    lim?: string;
    max?: string;
    minted?: string;
    op?: string;
    tick?: string;
    to?: string;
  };
  inscriptionId?: string;
  inscriptionNumber?: number;
}

export interface BRC20HistoryItem {
  valid?: boolean;
  type?: string;
  from?: string;
  to?: string;
  amount?: string;
  overallBalance?: string;
  availableBalance?: string;
  transferBalance?: string;
  inscriptionId?: string;
  inscriptionNumber?: number;
  height?: number;
  blockhash?: string;
  blocktime?: number;
  txIdx?: number;
  txid?: string;
  satoshi?: number;
  offset?: number;
}

export interface ModuleHistoryItem {
  type?: string;
  valid?: boolean;
  txid?: string;
  idx?: number;
  vout?: number;
  offset?: number;
  inscriptionNumber?: number;
  inscriptionId?: string;
  contentType?: string;
  contentBody?: string;
  oldSatPoint?: string;
  newSatPoint?: string;
  from?: string;
  to?: string;
  satoshi?: number;
  data?: {
    tick?: string;
    amount?: string;
  };
  height?: number;
  txidx?: number;
  blockhash?: string;
  blocktime?: number;
}

export interface RuneUtxo {
  address?: string;
  /** @example 10000 */
  satoshi?: number;
  scriptPk?: string;
  txid?: string;
  /** @example 0 */
  vout?: number;
  runes?: RunesBalance[];
}

export interface RunesEventItem {
  type?: "etch" | "mint" | "burn" | "send" | "receive";
  address?: string;
  amount?: string;
  height?: number;
  txidx?: number;
  txid?: string;
  timestamp?: number;
  rune?: string;
  runeid?: string;
}

export interface RunesBalance {
  /** @example "10000" */
  amount?: string;
  /** @example "2584327:44" */
  runeid?: string;
  /** @example "AAAAAAAAAAAAAB" */
  rune?: string;
  /** @example "AAAAA•AAA•AAAAA•B" */
  spacedRune?: string;
  /** @example "G" */
  symbol?: string;
  /** @example 0 */
  divisibility?: number;
}

export interface RuneHolder {
  address?: string;
  /** @example "10000" */
  amount?: string;
}

export interface RuneEntry {
  /** @example "2583283:1333" */
  runeid?: string;
  /** @example "UNCOMMONGOODS" */
  rune?: string;
  /** @example "UNCOMMON•GOODS" */
  spacedRune?: string;
  /**
   * @format uint64
   * @example 0
   */
  number?: number;
  /**
   * @format uint64
   * @example 2583283
   */
  height?: number;
  /**
   * @format uint64
   * @example 1333
   */
  txidx?: number;
  /** @example 1623423423 */
  timestamp?: number;
  /**
   * @format uint8
   * @example 2
   */
  divisibility?: number;
  /**
   * @format Option<char>
   * @example "G"
   */
  symbol?: string;
  /** @example "7cd19fef13aa2924d4446b1a86c1904e02e46d16630370bc6de86f769692e242" */
  etching?: string;
  /** @example "10000" */
  premine?: string;
  terms?: {
    /** @example "1000000" */
    amount?: string;
    /** @example "234000" */
    cap?: string;
    /** @example 245000 */
    heightStart?: number;
    /** @example 2480000 */
    heightEnd?: number;
    /** @example null */
    offsetStart?: number;
    /** @example null */
    offsetEnd?: number;
  };
  /** @example "500" */
  mints?: string;
  /**
   * @format u128
   * @example "1000"
   */
  burned?: string;
  /** @example 1000 */
  holders?: number;
  /** @example 1000 */
  transactions?: number;
  /** @example "500010000" */
  supply?: string;
  start?: number;
  end?: number;
  mintable?: boolean;
  remaining?: string;
}

export interface RuneStatus {
  bestHeight?: number;
  /** @example 100 */
  runes?: number;
  /** @example "AAAAAAAAAAAA" */
  minimumRune?: string;
  /** @example 100 */
  halvingBlockCount?: number;
}

export interface AlkaneUtxo {
  address?: string;
  /** @example 10000 */
  satoshi?: number;
  scriptPk?: string;
  txid?: string;
  /** @example 0 */
  vout?: number;
  confirmations?: number;
  alkanes?: AlkanesUTXOBalance[];
}

export interface AlkanesUTXOBalance {
  alkaneid?: string;
  amount?: string;
  type?: AlkaneType;
  logo?: string;
  tokenData?: TokenData;
  nftData?: NFTData;
  collectionData?: CollectionData;
}

export interface AlkanesBalance {
  /** @example "10000" */
  amount?: string;
  /** @example "2584327:44" */
  alkaneid?: string;
  /** @example "AAAAAAAAAAAAAB" */
  alkane?: string;
  /** @example "G" */
  symbol?: string;
  /** @example 0 */
  divisibility?: number;
}

export interface AlkaneHolder {
  address?: string;
  /** @example "10000" */
  amount?: string;
}

export interface AlkaneInfo {
  /** @example "2583283:1333" */
  alkaneid?: string;
  /**
   * @format uint64
   * @example 2583283
   */
  height?: number;
  txid?: string;
  timestamp?: number;
  type?: string;
  logo?: string;
  tokenData?: TokenData;
  nftData?: NFTData;
  collectionData?: CollectionData;
}

export interface TokenData {
  /** @example "MyToken" */
  name?: string;
  /** @example "MTK" */
  symbol?: string;
  /** @example 0 */
  divisibility?: number;
  /** @example "1000000" */
  totalSupply?: string;
  /** @example "1000000" */
  maxSupply?: string;
  /** @example "100000" */
  premine?: string;
  /** @example "1000" */
  perMint?: string;
  /** @example "10000000" */
  cap?: string;
  /** @example "500000" */
  minted?: string;
  mintable?: boolean;
  /** @example 100 */
  holders?: number;
}

export interface NFTData {
  /** @example "MyNFT" */
  name?: string;
  attributes?: object;
  contentType?: string;
  contentUrl?: string;
  collectionId?: string;
}

export interface CollectionData {
  /** @example "MyCollection" */
  name?: string;
  /** @example "1000" */
  totalSupply?: string;
  /** @example "1000" */
  maxSupply?: string;
  minted?: number;
  holders?: number;
}

export interface AlkanesStatus {
  bestHeight?: number;
  /** @example 100 */
  alkanes?: number;
  metashrewVersion?: string;
  alkanesRsVersion?: string;
}

export interface AlkaneEvent {
  alkaneid?: string;
  caller?: string;
  type?: string;
  opcode?: string;
  fuel?: string;
  inputs?: string[];
  status?: string;
  height?: number;
  txid?: string;
  vout?: number;
}

export interface AlkaneTransferHistory {
  height?: number;
  txid?: string;
  type?: string;
  subType?: string;
  alkaneid?: string;
  address?: string;
  /** @example "10000" */
  amount?: string;
}

export interface Order {
  /** @example "" */
  orderId?: string;
  /**
   * Order Status
   * @example "pending"
   */
  status?: "pending" | "inscribing" | "minted";
  /**
   * Pay to this address to start inscribing
   * @example ""
   */
  payAddress?: string;
  /**
   * Bitcoin address to receive the inscriptions
   * @example ""
   */
  receiveAddress?: string;
  /**
   * The BTC amount (in satoshis) need to pay
   * @example 3000
   */
  amount?: number;
  /** The paid BTC amount (in satoshis) */
  paidAmount?: number;
  /** The outputValue of each inscription */
  outputValue?: number;
  /** The feeRate of inscribing transactions */
  feeRate?: number;
  /** The miner fee of this order */
  minerFee?: number;
  /** The service fee of this order */
  serviceFee?: number;
  /** The developer fee of this order */
  devFee?: number;
  files?: {
    /** @example "10000.sats" */
    filename?: string;
    /** @example "" */
    inscriptionId?: string;
    status?: "pending" | "unconfirmed" | "confirmed";
  }[];
  /**
   * The total inscriptions count
   * @example 1
   */
  count?: number;
  /**
   * The pending inscriptions count
   * @example 1
   */
  pendingCount?: number;
  /**
   * The unconfirmed inscriptions count
   * @format int32
   * @example 0
   */
  unconfirmedCount?: number;
  /**
   * The confirmed inscriptions count
   * @format int32
   * @example 0
   */
  confirmedCount?: number;
  /** @example 1693439128100 */
  createTime?: number;
  /** @example "" */
  refundTxid?: string;
  refundAmount?: number;
  refundFeeRate?: number;
}

export interface OrderSummary {
  orderCount?: {
    total?: number;
    pendingCount?: number;
    inscribingCount?: number;
    mintedCount?: number;
    closedCount?: number;
    refundedCount?: number;
  };
}

export interface OrderCreateParams {
  /** Bitcoin address to receive the inscriptions */
  receiveAddress?: string;
  /**
   * The fee rate of transaction
   * @format float
   * @example 1
   */
  feeRate?: number;
  /**
   * The balance of inscription
   * @format int32
   * @example 546
   */
  outputValue?: number;
  /** @example [{"filename":"1000.sats","dataURL":"data:text/plain;charset=utf-8;base64,eyJwIjoic25zIiwib3AiOiJyZWciLCJuYW1lIjoiMTAwMDAuc2F0cyJ9"}] */
  files?: {
    filename?: string;
    dataURL?: string;
  }[];
  /** Developer address to receive extra fee */
  devAddress?: string;
  /**
   * Extra fee to pay to developer's address
   * @format int32
   */
  devFee?: number;
}

export interface OrderCreateBRC20DeployParams {
  /**
   * Bitcoin address to receive the inscriptions
   * @example ""
   */
  receiveAddress?: string;
  /**
   * The fee rate of transaction
   * @format float
   * @example 1
   */
  feeRate?: number;
  /**
   * The balance of inscription
   * @format int32
   * @example 546
   */
  outputValue?: number;
  /**
   * Developer address to receive extra fee
   * @example ""
   */
  devAddress?: string;
  /**
   * Extra fee to pay to developer's address
   * @format int32
   */
  devFee?: number;
  /**
   * tick in brc20-deploy
   * @example ""
   */
  brc20Ticker?: string;
  /**
   * max in brc20-deploy
   * @example ""
   */
  brc20Max?: string;
  /**
   * lim in brc20-deploy
   * @example ""
   */
  brc20Limit?: string;
}

export interface OrderCreateBRC20MintParams {
  /**
   * Bitcoin address to receive the inscriptions
   * @example ""
   */
  receiveAddress?: string;
  /**
   * The fee rate of transaction
   * @format float
   * @example 1
   */
  feeRate?: number;
  /**
   * The balance of inscription
   * @format int32
   * @example 546
   */
  outputValue?: number;
  /**
   * Developer address to receive extra fee
   * @example ""
   */
  devAddress?: string;
  /**
   * Extra fee to pay to developer's address
   * @format int32
   */
  devFee?: number;
  /**
   * tick in brc20-mint
   * @example ""
   */
  brc20Ticker?: string;
  /**
   * amt in brc20-mint
   * @example ""
   */
  brc20Amount?: string;
  /**
   * Repetition count
   * @format int32
   * @example 1
   */
  count?: number;
}

export interface OrderCreateBRC20TransferParams {
  /**
   * Bitcoin address to receive the inscriptions
   * @example ""
   */
  receiveAddress?: string;
  /**
   * The fee rate of transaction
   * @format float
   * @example 1
   */
  feeRate?: number;
  /**
   * The balance of inscription
   * @format int32
   * @example 546
   */
  outputValue?: number;
  /**
   * Developer address to receive extra fee
   * @example ""
   */
  devAddress?: string;
  /**
   * Extra fee to pay to developer's address
   * @format int32
   */
  devFee?: number;
  /**
   * tick in brc20-transfer
   * @example ""
   */
  brc20Ticker?: string;
  /**
   * amt in brc20-transfer
   * @example ""
   */
  brc20Amount?: string;
}

export interface OrderCreateBRC205ByteMintParams {
  /**
   * The deployer address that deployed the ticker
   * @example ""
   */
  deployerAddress?: string;
  /**
   * The deployer pubkey that deployed the ticker
   * @example ""
   */
  deployerPubkey?: string;
  /**
   * Bitcoin address to receive the inscriptions
   * @example ""
   */
  receiveAddress?: string;
  /**
   * The fee rate of transaction
   * @format float
   * @example 1
   */
  feeRate?: number;
  /**
   * The balance of inscription
   * @format int32
   * @example 546
   */
  outputValue?: number;
  /**
   * Developer address to receive extra fee
   * @example ""
   */
  devAddress?: string;
  /**
   * Extra fee to pay to developer's address
   * @format int32
   */
  devFee?: number;
  /**
   * tick in brc20-mint
   * @example ""
   */
  brc20Ticker?: string;
  /**
   * amt in brc20-mint
   * @example ""
   */
  brc20Amount?: string;
}

export interface OrderRequestCommitBRC205ByteMintParams {
  /**
   * orderId
   * @example ""
   */
  orderId?: string;
  /**
   * payer's bitcoin address
   * @example ""
   */
  payerAddress?: string;
  /**
   * payer's pubkey
   * @example ""
   */
  payerPubkey?: string;
}

export interface OrderRequestCommitBRC205ByteMintResponse {
  /**
   * psbt hex string
   * @example ""
   */
  psbtHex?: string;
  inputsToSign?: {
    address?: string;
    signingIndexes?: number[];
  }[];
}

export interface OrderSignCommitBRC205ByteMintParams {
  /**
   * orderId
   * @example ""
   */
  orderId?: string;
  /**
   * psbt hex string
   * @example ""
   */
  psbt?: string;
}

export interface OrderSignCommitBRC205ByteMintResponse {
  /**
   * psbt hex string
   * @example ""
   */
  psbtHex?: string;
  inputsToSign?: {
    address?: string;
    signingIndexes?: number[];
  }[];
}

export interface OrderSignRevealBRC205ByteMintParams {
  /**
   * orderId
   * @example ""
   */
  orderId?: string;
  /**
   * psbt hex string
   * @example ""
   */
  psbt?: string;
}

export interface OrderSignRevealBRC205ByteMintResponse {
  /**
   * inscriptionId
   * @example ""
   */
  inscriptionId?: string;
}

export interface OrderCreateRunesEtchParams {
  /**
   * Bitcoin address to receive the inscriptions
   * @example ""
   */
  receiveAddress?: string;
  /**
   * The fee rate of transaction
   * @format float
   * @example 1
   */
  feeRate?: number;
  /**
   * The balance of inscription
   * @format int32
   * @example 546
   */
  outputValue?: number;
  /** @example [{"filename":"logo","dataURL":"data:text/plain;charset=utf-8;base64,eyJwIjoic25zIiwib3AiOiJyZWciLCJuYW1lIjoiMTAwMDAuc2F0cyJ9","runes_etch":{"etching":{"spacedRune":"AAAABBBBB","symbol":"G","divisibility":0,"premine":100,"terms":{"amount":1000,"cap":21000000,"height":[840000,880000],"offset":[0,10000]}}}}] */
  files?: {
    filename?: string;
    dataURL?: string;
    runes_etch?: {
      etching?: {
        spacedRune?: string;
        symbol?: string;
        divisibility?: number;
        premine?: string;
        terms?: {
          amount?: string;
          cap?: string;
          height?: number[];
          offset?: number[];
        };
      };
    };
  }[];
  /** Developer address to receive extra fee */
  devAddress?: string;
  /**
   * Extra fee to pay to developer's address
   * @format int32
   */
  devFee?: number;
}

export interface OrderCreateRunesMintParams {
  /**
   * Bitcoin address to receive the inscriptions
   * @example ""
   */
  receiveAddress?: string;
  /**
   * The fee rate of transaction
   * @format float
   * @example 1
   */
  feeRate?: number;
  /**
   * The balance of inscription
   * @format int32
   * @example 546
   */
  outputValue?: number;
  /** @example "848484:10" */
  runeid?: string;
  /** @example 2 */
  count?: number;
  /** Developer address to receive extra fee */
  devAddress?: string;
  /**
   * Extra fee to pay to developer's address
   * @format int32
   */
  devFee?: number;
}

export interface MarketInscriptionInfoRequest {
  inscriptionId: string;
}

export interface MarketInscriptionInfoResponse {
  code: number;
  msg: string;
  data: {
    auctionId?: string | null;
    inscriptionId: string;
    inscriptionNumber?: number | null;
    /** @example "fixedPrice" */
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
    /** The UTXO where the inscription is located */
    utxo?: object;
  };
}

export interface MarketInscriptionInfoListRequest {
  address?: string;
  inscriptionIds?: string[];
}

export interface MarketInscriptionInfoListResponse {
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
      status?: string;
    }[];
  };
}

export interface MarketCreatePutOnRequest {
  nftType?: string;
  inscriptionId: string;
  /** Set the initial total price */
  initPrice: string;
  /** Unit Price (for tick) */
  unitPrice: string;
  /** User public key */
  pubkey: string;
  /** @example "fixedPrice" */
  marketType: "auction" | "fixedPrice";
  /** (Optional) Only for multi-address wallet, such as Xverse, hiro. Specifies the BTC receive address */
  btcAddress?: string;
}

export interface MarketCreatePutOnResponse {
  code: number;
  msg: string;
  data: {
    auctionId: string;
    psbt: string;
    /** Specifies the signature location used by the xverse wallet */
    signIndexes: number[];
  };
}

export interface MarketConfirmPutOnRequest {
  auctionId: string;
  psbt: string;
  /** Is Base64 format, the default is hex format */
  fromBase64?: boolean;
}

export interface MarketConfirmPutOnResponse {
  code: number;
  msg: string;
  data: object;
}

export interface MarketCreateBidPrepareRequest {
  auctionId: string;
  bidPrice: number;
  /** Bidder address */
  address: string;
  /** Bidder pubkey */
  pubkey: string;
}

export interface MarketCreateBidPrepareResponse {
  code: number;
  msg: string;
  data: {
    /** Expected service fee. */
    serverFee?: number;
    /** Real service fee. */
    serverReal?: number;
    /** Real service fee rate. */
    serverFeeRate?: number;
    /** Estimated transaction size */
    txSize?: number;
    /** Satoshis carried by the inscription */
    nftValue?: number;
    /** Network fee rate */
    feeRate?: number;
    /** Available confirmed balance for the user */
    availableBalance?: number;
    /** Available total balance for the user */
    allBalance?: number;
  };
}

export interface MarketCreateBidRequest {
  auctionId: string;
  bidPrice: number;
  /** Bidder address */
  address: string;
  /** Bidder pubkey */
  pubkey: string;
  /** The user sets the rate */
  feeRate?: number;
  /** (Optional) Only for multi-address wallet, such as Xverse, hiro. Inscription receiving address */
  nftAddress?: string;
  /** Custom utxo */
  utxos?: {
    txid?: string;
    index?: number;
  }[];
}

export interface MarketCreateBidResponse {
  code: number;
  msg: string;
  data: {
    bidId: string;
    /** Bid psbt */
    psbtBid: string;
    /** Auction mode is used, and the current empty string can be passed */
    psbtBid2?: string;
    /** Auction mode is used, and the current empty string can be passed */
    psbtSettle?: string;
    /** The service fee charged by the platform */
    serverFee: number;
    /** BTC network total fee */
    networkFee: number;
    /** BTC network fee rate */
    feeRate: number;
    nftValue: number;
    /** Specifies the bid signature location used by the xverse wallet */
    bidSignIndexes?: number[];
  };
}

export interface MarketConfirmBidRequest {
  auctionId: string;
  bidId: string;
  psbtBid: string;
  /** Auction mode is used, and the current empty string can be passed */
  psbtBid2?: string;
  /** Auction mode is used, and the current empty string can be passed */
  psbtSettle?: string;
  /** Is Base64 format, the default is hex format */
  fromBase64?: boolean;
}

export interface MarketConfirmBidResponse {
  code: number;
  msg: string;
  data: {
    /** Transaction txid */
    txid: string;
  };
}

export interface MarketCreatePutOffRequest {
  auctionId: string;
  /** (Optional) Only for multi-address wallet, such as Xverse, hiro. Inscription receiving address. */
  nftAddress?: string;
  /** (Optional) Only for multi-address wallet, such as Xverse, hiro. The public key used in the inscription of the order. */
  btcPubkey?: string;
  /** Custom utxo */
  utxos?: {
    txid?: string;
    index?: number;
  }[];
  rbf?: boolean;
  offChain?: boolean;
}

export interface MarketCreatePutOffResponse {
  code: number;
  msg: string;
  data: {
    psbt: string;
    txSize?: number;
    /** Specifies the btc signature location used by the xverse wallet */
    btcSignIndexes?: number[];
    /** Specifies the nft signature location used by the xverse wallet */
    nftSignIndexes?: number[];
  };
}

export interface MarketConfirmPutOffRequest {
  auctionId: string;
  psbt: string;
  /** Is Base64 format, the default is hex format */
  fromBase64?: boolean;
  offChain?: boolean;
}

export interface MarketConfirmPutOffResponse {
  code: number;
  msg: string;
  data: {
    txid: string;
  };
}

export interface MarketCreateModifyPriceRequest {
  auctionId: string;
  initPrice: string;
  unitPrice: string;
}

export interface MarketCreateModifyPriceResponse {
  code: number;
  msg: string;
  data: {
    psbt: string;
    /** Specifies the signature location used by the xverse wallet */
    signIndexes: number[];
  };
}

export interface MarketConfirmModifyPriceRequest {
  auctionId: string;
  psbt: string;
  fromBase64: boolean;
}

export interface MarketConfirmModifyPriceResponse {
  code: number;
  msg: string;
  data: object;
}

export interface BindInfoRequest {
  address: string;
}

export interface BindInfoResponse {
  btcAddress: string;
  nftAddress: string;
}

export interface RunesMarketCreatePutOnRequest {
  nftType?: string;
  /** The txid of the rune utxo txid */
  txid: string;
  /** The txid of the rune utxo index */
  index: string;
  /** Set the initial total price */
  initPrice: string;
  /** Unit Price (for tick) */
  unitPrice: string;
  /** User public key */
  pubkey: string;
  /** @example "fixedPrice" */
  marketType: "fixedPrice";
  /** (Optional) Only for multi-address wallet, such as Xverse, hiro. Specifies the BTC receive address */
  btcAddress?: string;
}

export interface AlkanesMarketCreatePutOnRequest {
  nftType?: string;
  /** The txid of the alkanes utxo txid */
  txid: string;
  /** The txid of the alkanes utxo index */
  index: string;
  /** Set the initial total price */
  initPrice: string;
  /** Unit Price (for tick) */
  unitPrice: string;
  /** User public key */
  pubkey: string;
  /** @example "fixedPrice" */
  marketType: "fixedPrice";
  /** (Optional) Only for multi-address wallet, such as Xverse, hiro. Specifies the BTC receive address */
  btcAddress?: string;
}

export interface MarketCreateBatchPutOnRequest {
  /** Unit Price (for tick) */
  unitPrice: string;
  /** User public key */
  pubkey: string;
  nftType?: string;
  /** (Optional) Only for multi-address wallet, such as Xverse, hiro. Specifies the BTC receive address */
  btcAddress?: string;
  /** Custom utxo */
  utxos?: {
    txid?: string;
    index?: number;
  }[];
}

export interface MarketCreateBatchPutOnResponse {
  code: number;
  msg: string;
  data: {
    batchAuctionId?: string;
    psbt: string;
    /** Specifies the signature location used by the xverse wallet */
    signIndexes: number[];
  };
}

export interface MarketConfirmBatchPutOnRequest {
  batchAuctionId: string;
  psbt: string;
  /** Is Base64 format, the default is hex format */
  fromBase64?: boolean;
}

export interface MarketConfirmBatchPutOnResponse {
  code: number;
  msg: string;
  data: object;
}

export interface MarketCreateBatchBidPrepareRequest {
  auctionIds: string[];
  /** Bidder address */
  address: string;
  /** Bidder pubkey */
  pubkey: string;
}

export interface MarketCreateBatchBidPrepareResponse {
  code: number;
  msg: string;
  data: {
    /** Expected service fee. */
    serverFee?: number;
    /** Real service fee. */
    serverReal?: number;
    /** Real service fee rate. */
    serverFeeRate?: number;
    /** Estimated transaction size */
    txSize?: number;
    /** Network fee rate */
    feeRate?: number;
    /** Available confirmed balance for the user */
    availableBalance?: number;
    validAuctionIds?: string[];
    invalidAuctionIds?: string[];
  };
}

export interface MarketCreateBatchBidRequest {
  auctionIds: string[];
  bidPrices: number[];
  /** Bidder address */
  address: string;
  /** Bidder pubkey */
  pubkey: string;
  /** The user sets the rate */
  feeRate?: number;
  /** (Optional) Only for multi-address wallet, such as Xverse, hiro. Inscription receiving address */
  nftAddress?: string;
}

export interface MarketCreateBatchBidResponse {
  code: number;
  msg: string;
  data: {
    bidId: string;
    /** Bid psbt */
    psbtBid: string;
    /** The service fee charged by the platform */
    serverFee: number;
    /** BTC network total fee */
    networkFee: number;
    /** BTC network fee rate */
    feeRate: number;
    /** Specifies the bid signature location used by the xverse wallet */
    bidSignIndexes: number[];
  };
}

export interface MarketConfirmBatchBidRequest {
  bidId: string;
  psbtBid: string;
  /** Is Base64 format, the default is hex format */
  fromBase64?: boolean;
}

export interface MarketConfirmBatchBidResponse {
  code: number;
  msg: string;
  data: {
    /** Transaction txid */
    txid: string;
  };
}

export interface CAT20TokenStats {
  tokenId?: string;
  volume?: string;
  volume30d?: string;
  volume24h?: string;
  volume7d?: string;
  volume6h?: string;
  price?: number;
  price6h?: number;
  price24h?: number;
  price7d?: number;
  price30d?: number;
  name?: string;
  symbol?: string;
  decimals?: number;
  max?: number;
  volumeToken?: string;
  volumeToken30d?: string;
  volumeToken24h?: string;
  volumeToken7d?: string;
  volumeToken6h?: string;
}

export interface FractalSupply {
  blocks?: number;
  supply?: number;
}

export type AddressBalance = {
  address?: string;
  balance?: number;
}[];
