# Error Codes Overview

This document provides a summary of the error code ranges and categories used across different UniSat service modules. Each service module is assigned a distinct numeric range to help identify and handle errors consistently.

| Service Module          | Error Code Range | Capacity | Description                                                                |
| ----------------------- | ---------------- | -------- | -------------------------------------------------------------------------- |
| `Common`                | -1 ~ -99         | 99       | Cross-service errors, including network issues and authentication failures |
| `Marketplace`           | -100~-999        | 1,000    | Errors related to trading, NFT operations, and auctions                    |
| `Inscribe`              | -1000~-1999      | 1,000    | Errors specific to the Inscribe module                                     |
| `Basic & BRC20 Indexer` | -3000~-3999      | 1,000    | Errors related to Basic and BRC20 protocol indexing                        |
| `Runes Indexer`         | -4000~-4999      | 1,000    | Errors related to Runes protocol indexing                                  |
| `Alkanes Indexer`       | -5000~-5999      | 1,000    | Errors related to Alkanes protocol indexing                                |

## Usage

When handling errors returned from UniSat APIs or services, refer to the error code to quickly identify the source module and nature of the problem.

The negative integer error codes allow precise categorization and easier debugging.

Always check for updated error code mappings in the latest error code JSON files in this repository.
