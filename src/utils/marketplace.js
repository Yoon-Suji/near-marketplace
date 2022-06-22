// contain the functions that we will use to interact our smart contract
import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000; // 100TGas(terra gas)

// create new product
export function createProduct(product) {
  product.id = uuid4(); // generate a unique ID
  product.price = parseNearAmount(product.price + ""); // convert the price to the correct format
  return window.contract.setProduct({ product });
}

export function getProducts() {
  return window.contract.getProducts();
}

export async function buyProduct({ id, price }) {
  await window.contract.buyProduct({ productId: id }, GAS, price);
}