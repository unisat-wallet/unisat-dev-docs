### Notes

This endpoint is used to monitor the indexer’s sync status.

- `alkanes` indicates the total number of recognized Alkanes currently indexed by the system.
- `bestHeight` represents the current height the indexer has processed. This value may lag behind the actual blockchain height. If `bestHeight` remains significantly behind the blockchain tip, it may indicate a synchronization issue, and the indexed data might be outdated.

- `metashrewVersion` The metashrewVersion field indicates the version of the Metashrew indexer being used.
  For more details, refer to the repository: https://github.com/sandshrewmetaprotocols/metashrew.

- `alkanesRsVersion` The alkanesRsVersion field indicates the version of the alkanes-rs indexer in use.
  For more information, refer to the repository: https://github.com/kungfuflex/alkanes-rs.
