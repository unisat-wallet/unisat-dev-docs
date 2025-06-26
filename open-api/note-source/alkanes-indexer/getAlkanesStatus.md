### Notes

This endpoint is used to monitor the indexer’s sync status.

- `alkanes` indicates the total number of recognized Alkanes currently indexed by the system.
- `bestHeight` represents the current height the indexer has processed. This value may lag behind the actual blockchain height. If `bestHeight` remains significantly behind the blockchain tip, it may indicate a synchronization issue, and the indexed data might be outdated.
