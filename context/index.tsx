import { createContext, useContext, useState } from "react"
import { ethers } from "ethers"
import PITAbi from "@/contracts/PIT.json"

declare global {
  interface Window {
    ethereum?: any
  }
}

const PITAddress = "0xEe80212570c41E1D21C7B0FA1d2539945fC88868" //Polygon Mumbai Testnet

interface IAppContext {
  connected: boolean
  connecting: boolean
  accounts: string[]
  setAccounts?: any
  contract?: any
  connect?: any
  disconnect?: any
  showScene1: boolean
  balance: bigint
  getBalance: any
}

interface IAppContextProvider {
  children: any;
}

const defaultState = {
  connected: false,
  connecting: false,
  accounts: [],
  setAccounts: () => { },
  contract: [],
  connect: () => { },
  disconnect: () => { },
  showScene1: false,
  balance: BigInt(0),
  getBalance: () => { }
};

const AppContext = createContext<IAppContext>(defaultState)

export function AppContextProvider({ children }: IAppContextProvider) {

  const [connected, setWalletConnected] = useState<boolean>(false)
  const [connecting, setWalletConnecting] = useState<boolean>(false)
  const [provider, setProvider] = useState<any>(null)
  const [signer, setSigner] = useState<any>(null)
  const [contract, setContract] = useState<any>(null)
  const [accounts, setAccounts] = useState<string[]>([])
  const [showScene1, setShowScene1] = useState<boolean>(false);
  const [balance, setBalance] = useState<bigint>(BigInt(0))

  const connect = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(PITAddress, PITAbi, signer)

        setWalletConnecting(true)
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setWalletConnected(true)
        setWalletConnecting(false)
        window.ethereum.on("accountsChanged", setAccounts)
        setProvider(provider)
        setSigner(signer)
        setContract(contract)
        setAccounts(accounts)
        // setShowScene1(true)

        // setTimeout(() => {
        //   setShowScene1(false)
        // }, 6000);

      } catch (e) {
      } finally {

      }
    } else {

    }
  };

  const disconnect = () => {
    window.ethereum.removeListener("accountsChanged", setAccounts)
    setWalletConnected(false)
    setAccounts([])
  }

  const getBalance = async () => {
    console.log("GET_BALANCE========>", accounts[0])
    const balanceOf = await contract.balanceOf(accounts[0]);
    setBalance(balanceOf);
    return balanceOf;
  }

  return (
    <AppContext.Provider value={{
      connected, connecting, accounts, setAccounts, contract, connect, disconnect, showScene1,
      balance, getBalance
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext)
}