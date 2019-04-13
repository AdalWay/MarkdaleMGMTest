import axios from "axios";
import validate from "bitcoin-address-validation";
import { ECPair, networks, TransactionBuilder } from "bitcoinjs-lib";
import buffer from "buffer";
import { saveTransaction } from "./DbUtil";

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
 *
 */
export function sendPayment(src, dest, amount) {
  const WIF = "93X17ouXMugC51LxiyrKNNg2Tsp5RSYGs7XfpMwTcwCNJZFkH7i";
  const keys = ECPair.fromWIF(WIF, networks.testnet);
  // const testAddrtoSend = "mfZuYWz4ijedYSJssKgTzFPQbW96d3yT99";

  //clean white space from the inpusts
  const source = src.replace(/\s/g, "");
  let destination = dest.replace(/\s/g, "");
  const howMuch = parseFloat(amount);

  const newtx = {
    inputs: [{ addresses: ["mkQHzmRmERNGyN3A4cmrUNDu1CtDResXRv"] }],
    outputs: [{ addresses: [destination], value: howMuch }]
  };
  console.log(newtx);

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
      // sending back the transaction with all the signatures to broadcast
      axios
        .post("https://api.blockcypher.com/v1/btc/test3/txs/send", txs)
        .then(function(finaltx) {
          console.log(finaltx);
          return finaltx.data;
        })
        .then(function(data) {
          console.log(data);
          // save data in firebase

          const amount = data.tx.outputs[0].value;
          const src = data.tx.addresses[0];
          const des = data.tx.addresses[1];
          const hash = data.tx.hash;

          const tranxInfo = {
            srcAddr: src,
            destAddr: des,
            amount: amount,
            hashcode: hash,
            datetime: new Date()
          };
          console.log(tranxInfo);

          saveTransaction(tranxInfo);
        })
        .catch(error => {
          console.log("We have an error" + error);
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
