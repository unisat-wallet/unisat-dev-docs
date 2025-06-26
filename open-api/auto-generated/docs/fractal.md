# Fractal Only API

This API is limited to Fractal only. It provides endpoints to interact with the Fractal network, including supply information, address statistics, and rich lists.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---

## 📑 Table of Contents

- [Fractal](#fractal)
  - [/v1/public/fractal/supply (Get circulating FB in fractal mainnet) ](#get-circulating-fb-in-fractal-mainnet)
  - [/v1/public/fractal/total-supply (Get total supply FB in fractal mainnet) ](#get-total-supply-fb-in-fractal-mainnet)
  - [/v1/public/address/total (Get total address) ](#get-total-address)
  - [/v1/public/address/rich-list (Get address rich list) ](#get-address-rich-list)

---

## Fractal

### Get circulating FB in fractal mainnet
<a id="get-circulating-fb-in-fractal-mainnet"></a>

**Method**: `GET`  
**Path**: `/v1/public/fractal/supply`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Fractal/getFractalSupply)  

#### Description
Retrieves the circulating supply of Fractal Bitcoin (FB) in the mainnet.

#### Response (200)


---

### Get total supply FB in fractal mainnet
<a id="get-total-supply-fb-in-fractal-mainnet"></a>

**Method**: `GET`  
**Path**: `/v1/public/fractal/total-supply`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Fractal/getFractalTotalSupply)  

#### Description
Retrieves the total supply of Fractal Bitcoin (FB) in the mainnet.

#### Response (200)


---

### Get total address
<a id="get-total-address"></a>

**Method**: `GET`  
**Path**: `/v1/public/address/total`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Fractal/getFractalTotalAddress)  

#### Description
Retrieves the total number of addresses in the Fractal network.

#### Response (200)


---

### Get address rich list
<a id="get-address-rich-list"></a>

**Method**: `GET`  
**Path**: `/v1/public/address/rich-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Fractal/getFractalRichList)  

#### Description
Retrieves a list of addresses sorted by their balance in descending order.

#### Parameters
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned (Max 10000)

#### Response (200)


---

