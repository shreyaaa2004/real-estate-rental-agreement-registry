import { rpc, Contract, xdr, scValToNative, TransactionBuilder, Address, nativeToScVal } from "@stellar/stellar-sdk";
import { StellarWalletsKit, Networks, initKit } from "./wallet";
import { CONTRACT_ID, NETWORK_PASSPHRASE, RPC_URL } from "./config";

const server = new rpc.Server(RPC_URL);

export async function getPropertyCount(): Promise<number> {
  const contract = new Contract(CONTRACT_ID);
  
  const tx = new TransactionBuilder(
    await server.getAccount("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF"),
    { fee: "100", networkPassphrase: NETWORK_PASSPHRASE }
  )
    .addOperation(contract.call("get_property_count"))
    .setTimeout(30)
    .build();

  const simulation = await server.simulateTransaction(tx);
  
  if (rpc.Api.isSimulationSuccess(simulation) && simulation.result) {
    return scValToNative(simulation.result.retval) as number;
  }
  return 0;
}

export async function getProperty(id: number): Promise<any> {
    const contract = new Contract(CONTRACT_ID);
    
    const tx = new TransactionBuilder(
      await server.getAccount("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF"),
      { fee: "100", networkPassphrase: NETWORK_PASSPHRASE }
    )
      .addOperation(contract.call("get_property", nativeToScVal(id, { type: "u32" })))
      .setTimeout(30)
      .build();
  
    const simulation = await server.simulateTransaction(tx);
    
    if (rpc.Api.isSimulationSuccess(simulation) && simulation.result) {
      return scValToNative(simulation.result.retval);
    }
    return null;
}

export async function submitTransaction(
  methodName: string,
  args: xdr.ScVal[],
  publicKey: string
): Promise<string> {
  try {
    initKit();
    const contract = new Contract(CONTRACT_ID);
    const account = await server.getAccount(publicKey);
    
    let tx = new TransactionBuilder(account, {
      fee: "1000",
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(contract.call(methodName, ...args))
      .setTimeout(30)
      .build();

    const preparedTx = await server.prepareTransaction(tx);

    const signedTx = await StellarWalletsKit.signTransaction(preparedTx.toXDR(), {
      networkPassphrase: NETWORK_PASSPHRASE,
      address: publicKey
    });

    const transactionToSubmit = TransactionBuilder.fromXDR(signedTx.signedTxXdr, NETWORK_PASSPHRASE);
    
    // @ts-ignore
    const sendResponse = await server.sendTransaction(transactionToSubmit);
    if (sendResponse.status !== "PENDING") {
      throw new Error(`Failed to send transaction: ${sendResponse.status}`);
    }

    let statusResponse = await server.getTransaction(sendResponse.hash);
    while (statusResponse.status === "NOT_FOUND") {
      await new Promise(resolve => setTimeout(resolve, 2000));
      statusResponse = await server.getTransaction(sendResponse.hash);
    }

    if (statusResponse.status === "SUCCESS") {
      return sendResponse.hash;
    } else {
      throw new Error(`Transaction failed: ${statusResponse.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
