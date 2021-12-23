const opensea = require("opensea-js");
const Network = opensea.Network;

const config = {

	///config for mainnet
	"production": {
		"network": Network.Main,
	    "https_rpc" : "wss://mainnet.infura.io/ws/v3/4cdbf9ce83b54525b32285f327836b53",
		"api_base_url": "https://api.opensea.io",
		"opensea_api": "98e3c67d43d74d66a79df13456d4618a",

		"collections": [
						{
							"collection_slug": "meta-legends",
							"token_address": "0xf9c362cdd6eeba080dd87845e88512aa0a18c615",
							"fix_price": .01,
							"floor_percent": 71, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "metabillionaire",
						    "token_address": "0xc6c817cd60e17fed0af2a759624e02dd6c812e64",
						    "fix_price": .01,
							"floor_percent": 71, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "akc",
						    "token_address": "0x9bf252f97891b907f002f2887eff9246e3054080",
						    "fix_price": .01,
							"floor_percent": 71, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "deadfellaz",
						    "token_address": "0x2acab3dea77832c09420663b0e1cb386031ba17b",
						    "fix_price": .01,
							"floor_percent": 71, // floor price percent when bid format == 1. like 90 (%)
						}
					],
	    "duration": 40000,
	    "bid_format": 1,  // 0: fixed price, 1: floor price percent
	    "limit_overbid": 13, // % percentage
	    "overbid": .5, // % percentage
	    
	    "wallet_address": "0xBeCCBBCD53Ee5f49bf63F5c1795AbBB3B6173283",
	    "private_key": "a00662d511330abf215cca22232fd83e0b8e016a74517ab190719fa6cb4e9ec8",
	},
	/// config for rinkeby network
	"development": {
		"network": Network.Rinkeby,
	    "https_rpc" : "https://rinkeby.infura.io/v3/",
		"api_base_url": "https://testnets-api.opensea.io",
		"opensea_api": "",

		"collections": [
						{
							"collection_slug": "",
						    "token_address": "0xbd4455da5929d5639ee098abfaa3241e9ae111af",
						    "fix_price": 1
						},
						{
							"collection_slug": "",
						    "token_address": "0xbd4455da5929d5639ee098abfaa3241e9ae111af",
						    "fix_price": 1
						},
						{
							"collection_slug": "",
						    "token_address": "0xbd4455da5929d5639ee098abfaa3241e9ae111af",
						    "fix_price": 1
						}
					],
	    "duration": 3600, // unit: second
	    "bid_format": 0,  // 0: fixed price, 1: floor price percent
	    "floor_percent": 0.0001,
	    "limit_overbid": 10, // % percent
	    "overbid": 1, // % percent

	    "wallet_address": "0x80AC1437c39cD98ad716FCB6dCBbd8C1977B7d42",
	    "private_key": "",
	}
}

exports.config = config.production;