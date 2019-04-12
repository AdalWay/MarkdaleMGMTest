import axios from "axios";
import validate from "bitcoin-address-validation";
import { ECPair, networks, TransactionBuilder } from "bitcoinjs-lib";
import buffer from "buffer";

export function createTransaction() {
  let testing = networks.testnet;

  const addr = "mkQHzmRmERNGyN3A4cmrUNDu1CtDResXRv";
  const pk = "93X17ouXMugC51LxiyrKNNg2Tsp5RSYGs7XfpMwTcwCNJZFkH7i";
  const keys = ECPair.fromWIF(pk, testing);

  //create transaction
  let txb = new TransactionBuilder(testing);

  //get previus transaction

  txb.setVersion(1);
  let txid = "6830bdf769c327907a6dbb36d0d32bc7da088f176a807285882d8644f6ad36d0";
  let outn = 1;

  //input
  txb.addInput(txid, outn);

  //output
  txb.addOutput("mfZuYWz4ijedYSJssKgTzFPQbW96d3yT99", 90000);

  let keypairSpend = keys;
  txb.sign(0, keypairSpend);

  let tx = txb.build();
  let txhex = tx.toHex();
  console.log(txhex);
  return txhex;
}

export function isValidAddress(addresses) {
  if (validate(addresses)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Send bitcoin in testnet using BlockCypher
 * @param {number} amount - Bitcoin amount in BTC
 * @param {string} to - output Bitcoin wallet address
 * @param {string} from - input Bitcoin wallet address
 * @param {string} wif
 */
export function sendPayment(from, to, wif, amount) {
  const WIF = "93X17ouXMugC51LxiyrKNNg2Tsp5RSYGs7XfpMwTcwCNJZFkH7i";

  const keys = ECPair.fromWIF(WIF, networks.testnet);

  const newtx = {
    inputs: [{ addresses: ["mkQHzmRmERNGyN3A4cmrUNDu1CtDResXRv"] }],
    outputs: [
      { addresses: ["mfZuYWz4ijedYSJssKgTzFPQbW96d3yT99"], value: 100000 }
    ]
  };

  // create tx skeleton
  axios
    .post(
      "https://api.blockcypher.com/v1/btc/test3/txs/new",
      JSON.stringify(newtx)
    )
    .then(tmptx => {
      const txs = tmptx.data;
      // signing each of the hex-encoded string required to finalize the transaction
      txs.pubkeys = [];

      txs.signatures = txs.tosign.map(function(tosign, n) {
        txs.pubkeys.push(keys.getPublicKeyBuffer().toString("hex"));
        return keys
          .sign(new buffer.Buffer(tosign, "hex"))
          .toDER()
          .toString("hex");
      });
      console.log(txs);

      // sending back the transaction with all the signatures to broadcast
      axios
        .post("https://api.blockcypher.com/v1/btc/test3/txs/send", txs)
        .then(function(finaltx) {
          console.log(finaltx);
        });
    });
}

export async function getBalance(address) {
  //get the validated address from the state
  const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
