import environment from "./config";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import { formatNearAmount } from "near-api-js/lib/utils/format";

const nearEnv = environment("testnet");

// initialize contract
export async function initializeContract() {
    const near = await connect(
      Object.assign(
        { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
        nearEnv
      )
    );
    window.walletConnection = new WalletConnection(near);
    window.accountId = window.walletConnection.getAccountId();
    window.contract = new Contract(
      window.walletConnection.account(),
      nearEnv.contractName,
      {
        // define the method we want to use
        viewMethods: ["getProduct", "getProducts"],
        changeMethods: ["buyProduct", "setProduct"],
      }
    );
  }

  export async function accountBalance() {
    return formatNearAmount(
      (await window.walletConnection.account().getAccountBalance()).total,
      2
    );
  }
  
  export async function getAccountId() {
    return window.walletConnection.getAccountId();
  }
  
  export function login() {
    window.walletConnection.requestSignIn(nearEnv.contractName);
  }
  
  export function logout() {
    window.walletConnection.signOut();
    window.location.reload();
  }