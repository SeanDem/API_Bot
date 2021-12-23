const ethers = require("ethers");
const opensea = require("opensea-js");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const axios = require("axios");
const { writeFile } = require('fs');

// get last status of bot from status.json file
var status = require('./status.json');

var { config } = require('./config.js');

var api_key = config.opensea_api;
var accountAddress = config.wallet_address;
var WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
var path = './status.json';
let index = 0;

var limit_overbid = config.limit_overbid;
var overbid = config.overbid;

// create provider object from priv key and rpc
const providerEngine = new HDWalletProvider([config.private_key], config.https_rpc);
// const provider = new ethers.providers.JsonRpcProvider(config.https_rpc);

// create opensea-js object
const seaport = new OpenSeaPort(providerEngine, {
  networkName: config.network,
  apiKey: api_key
});

// save current collection and token id to status.js file when bot stop
function writeJson(data) {
	writeFile(path, JSON.stringify(data, null, 2), (error) => {
	  	if (error) {
	    	console.log('An error has occurred dataSave', error);
	    	return;
	  	}
	});
}

// get collection info from opensea api.
// from here, can get payment tokens array and floor_price, total_supply
// example: https://api.opensea.io/collection/crypto-dino-v3
// parameter: collection's slug

async function getCollectionInfo(slug) {
  try {
    const url = `${config.api_base_url}/api/v1/collection/${slug}`;
    const response = await axios.get(url);
    
    var json_str = JSON.stringify(response.data)
    var json_obj = JSON.parse(json_str)

    return json_obj['collection'];
  } catch (err) {
  	writeJson({collection: index, tokenId: 0});
    console.log(err);
    // process.exit(1);
  }
}


// get top bid from single asset info
async function getAsset(tokenId, tokenAddress) {
	try {
    const url = `${config.api_base_url}/asset/${tokenAddress}/${tokenId}`;

    const response = await axios.get(url);
    
    var json_str = JSON.stringify(response.data)
    var json_obj = JSON.parse(json_str);

    // return null when there is not any orders
    if (json_obj['orders'] == null) {
    	return null;
    }
    // return biggest order price when there are any orders
    else {
    	let top_bid = 0;
    	for (let i = 0; i < json_obj['orders'].length; i++) {
    		// get order price 
    		let bid_price = json_obj['orders'][i]['current_price'];

    		if (bid_price.includes(".")) {
				bid_price = bid_price.slice(0, bid_price.indexOf("."));
    		}

    		// format price by handle decimal of payment token
    		bid_price = parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(bid_price), 18));
    		// get top bid by comparing them.
    		if (bid_price > top_bid)
    			top_bid = bid_price;
    	}

    	return top_bid;
    }
  } catch (err) {
    console.log(err);
    writeJson({collection: index, tokenId: tokenId + 1});
    return null;
    // process.exit(1)
  }
}

// get top bid from single asset info
async function getTopBid(tokenId, tokenAddress) {
	try {
    	let orders = await seaport.api.getOrders({
    		asset_contract_address: tokenAddress,
    		token_id: tokenId,
    		side: 0
    	});
    	
	    // return null when there is not any orders
	    if (orders['orders'] == null) {
	    	return null;
	    }
	    // return biggest order price when there are any orders
	    else {
	    	let top_bid = 0;
	    	for (let i = 0; i < orders['orders'].length; i++) {
	    		// get order price 
	    		let bid_price = orders['orders'][i]['currentPrice'].toString();

	    		if (bid_price.includes(".")) {
					bid_price = bid_price.slice(0, bid_price.indexOf("."));
	    		}

	    		// format price by handle decimal of payment token
	    		bid_price = parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(bid_price), 18));
	    		// get top bid by comparing them.
	    		if (bid_price > top_bid)
	    			top_bid = bid_price;
	    	}

	    	return top_bid;
	    }
  	} catch (err) {
	    console.log(err);
	    writeJson({collection: index, tokenId: tokenId + 1});
	    return null;
	    // process.exit(1)
  }
}

async function startCollection(slug, tokenAddress, tokenId, fixed_price, floor_percent) {
	console.log(`Starting ${slug} Collection From token ID ${tokenId}`);

	// get collection info
	var collection_info = await getCollectionInfo(slug);

	// floor_price, total_supply, payment_tokens from collection info
	var floor_price = collection_info.stats.floor_price;
	var total_supply = collection_info.stats.total_supply;

	console.log(`Firxed Price: ${fixed_price}`);
	console.log(`Floor Price: ${floor_price}`);
	console.log(`Total Supply: ${total_supply}`);
	console.log();

	let bid_price = 0;
  	// get bid price from bid format and floor price
	if (config.bid_format == 0) {
		bid_price = fixed_price;
	} else {
		bid_price = floor_price * floor_percent / 100;
	}

  	console.log(`Bid Price: ${bid_price}`);

	// get balance of WETH in your wallet	
	// var balanceOfWETH = await provider.getBalance(accountAddress);
	var balanceOfWETH = await seaport.getTokenBalance({
							accountAddress, 
							tokenAddress: WETH
						});


	let balanceWithoutDecimal = ethers.utils.formatUnits(ethers.BigNumber.from(balanceOfWETH.toString()), "ether");
	console.log(`Payment Token Balance: ${balanceWithoutDecimal.toString()} WETH`);

	// check balance
	// if (parseFloat(balanceWithoutDecimal) < parseFloat(bid_price)) {
	// 	console.error("Error: Insufficient Balance");
	// 	// writeJson({"collection": index, "tokneId": 0});
	// 	process.exit(1);
	// }

	// get assets and make assets array for buy order.
	// var assets = [];
	let offset = 0;
	
	if (tokenId != 0) {
		offset = tokenId - 1;
		status.tokenId = 0;
		writeJson(status);
	}

	for (let i = offset; i <= total_supply; i++) {
		let token_id = i + 1;
		// get top bid of token id
		// var top_bid = await getAsset(token_id, tokenAddress);
		var top_bid = await getTopBid(token_id.toString(), tokenAddress);
		
		// make order
		await makeBuyBid({
						asset: {
									tokenId: token_id,
									tokenAddress: tokenAddress
								},
						top_bid: top_bid
					}, bid_price);
	}
}


// make buy bid function
async function makeBuyBid(asset, bid_price) {
	// for (let i = 0; i < assets.length; i++) {
		try {
			let top_bid = asset['top_bid'];
			
			// decide the bid price by comparing with top bid			
			if (top_bid != null & (top_bid < bid_price * (100 + limit_overbid) / 100)) {
				bid_price = top_bid * (100 + overbid) / 100;
			}

			if (top_bid != null & top_bid > bid_price)
				return;

			const offer = await seaport.createBuyOrder({
			  asset: asset['asset'],
			  accountAddress: accountAddress,
			  startAmount: bid_price,
			  expirationTime: Math.round(Date.now() / 1000 + config.duration), // One day from now,
			});

			console.log(`${asset['asset']['tokenId']}: ${offer.hash}`);
		} catch (err) {
			writeJson({"collection": index, "tokneId": ['asset']['tokenId']});
			console.error(err);
			// process.exit(1);
		}
	// }
}

async function main() {
	console.log (`Limit Overbid: ${limit_overbid}`);
	console.log (`Overbid: ${overbid}`);
	console.log();
	
	if (status.collection !=  -1) {
		index = status.collection;
		status.collection = -1;
	}

	while (index < config.collections.length) {

		// getting collection info from config
		var tokenAddress = config.collections[index].token_address;
		var slug = config.collections[index].collection_slug;
		var fixed_price = config.collections[index].fix_price;
		var floor_percent = config.collections[index].floor_percent;
		
		await startCollection(slug, tokenAddress, parseInt(status.tokenId), fixed_price, floor_percent);
		
		index++;
		if (index == config.collections.length)
			index = 0;
	}
}

main();