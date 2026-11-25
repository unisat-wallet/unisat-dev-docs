# Address Types

UniSat Wallet supports 4 Bitcoin address formats and allows switching between them in the settings.

| Type          | Script Type | Derivation   | BIP                                                                        |
| ------------- | ----------- | ------------ | -------------------------------------------------------------------------- |
| Native Segwit | P2WPKH      | m/84'/0'/0'/ | [bip-0084](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki) |
| Nested Segwit | P2SH-P2WPKH | m/49'/0'/0'/ | [bip-0141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki) |
| Taproot       | P2TR        | m/86'/0'/0'/ | [bip-0341](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki) |
| Legacy        | P2PKH       | m/44'/0'/0'/ |                                                                            |
