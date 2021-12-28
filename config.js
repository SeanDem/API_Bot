const opensea = require("opensea-js");
const Network = opensea.Network;

const config = {

	///config for mainnet
	"production": {
		"network": Network.Main,
	    "https_rpc" : "wss://mainnet.infura.io/ws/v3/4cdbf9ce83b54525b32285f327836b53",
		"api_base_url": "https://api.opensea.io",
		"opensea_api": "73390599da6243559194a3da413a31ce",

		"duration": 40000,
	    "bid_format": 1,  // 0: fixed price, 1: floor price percent
	    "limit_overbid": 15, // % percentage
	    "overbid": .5, // % percentage
	    
		//1
	    //"wallet_address": "0xBeCCBBCD53Ee5f49bf63F5c1795AbBB3B6173283",
	    //"private_key": "a00662d511330abf215cca22232fd83e0b8e016a74517ab190719fa6cb4e9ec8",

		//2
		//"wallet_address": "0x7C29Bc84cE3866c6A5ebcC932363471317B8C0EB",
	    //"private_key": "2faacf9ea495ab972568d4b5892ba6ac127be534c6948a5c09dd3fa963c8115d",

		"collections": [
						/*
				
						{
							"collection_slug": "akc",
						    "token_address": "0x9bf252f97891b907f002f2887eff9246e3054080",
						    "fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "metabillionaire",
						    "token_address": "0xc6c817cd60e17fed0af2a759624e02dd6c812e64",
						    "fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "deadfellaz",
						    "token_address": "0x2acab3dea77832c09420663b0e1cb386031ba17b",
						    "fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "meta-legends",
							"token_address": "0xf9c362cdd6eeba080dd87845e88512aa0a18c615",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "alienfrensnft", 
							"token_address": "0x123b30e25973fecd8354dd5f41cc45a3065ef88c",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "punks-comic",
							"token_address": "0x128675d4fddbc4a0d3f8aa777d8ee0fb8b427c2f",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "slotienft",
							"token_address": "0x5fdb2b0c56afa73b8ca2228e6ab92be90325961d",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "queenskings",
							"token_address": "0xbb869f884186c3cba0ffa89ab84980cb86f8744d",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "lostpoets",
							"token_address": "0x4b3406a41399c7fd2ba65cbc93697ad9e7ea61e5",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "queenskings",
							"token_address": "0xbb869f884186c3cba0ffa89ab84980cb86f8744d",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "robotos-official",
							"token_address": "0x099689220846644f87d1137665cded7bf3422747",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "cryptomories",
							"token_address": "0x1a2f71468f656e97c2f86541e57189f59951efe7",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "peaceful-groupies",
							"token_address": "0x4f89cd0cae1e54d98db6a80150a824a533502eea",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "cryptomories",
							"token_address": "0x1a2f71468f656e97c2f86541e57189f59951efe7",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "the-meta-kongz",
							"token_address": "0x5a293a1e234f4c26251fa0c69f33c83c38c091ff",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "mekaverse",
							"token_address": "0x9a534628b4062e123ce7ee2222ec20b86e16ca8f",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "kaiju-kingz",
							"token_address": "0x0c2e57efddba8c768147d1fdf9176a0a6ebd5d83",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "shiba-social-club",
							"token_address": "0xd692ced124a474f051f9744a301c26d1017b3d54",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "sappy-seals",
							"token_address": "0x364c828ee171616a39897688a831c2499ad972ec",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
						{
							"collection_slug": "theshiboshis",
							"token_address": "0xd692ced124a474f051f9744a301c26d1017b3d54",
							"fix_price": .01,
							"floor_percent": 70, // floor price percent when bid format == 1. like 90 (%)
						},
					

						*/
					],

	},
}

exports.config = config.production;