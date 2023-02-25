import { createContext, useContext, useState } from "react"
import { ethers } from "ethers"
import { PITAbi, PITAddress } from "@/contracts/PIT"
import { ContractModel } from "./ContractModel"
import { cookAppData } from "@/utils"
import constants from "@/utils/constants"

declare global {
  interface Window {
    ethereum?: any
  }
}

let g_Model: any
let g_GameStatus: any

interface IAppContext {
  gameStatus: string
  actionStatus: string
  txStatus: string
  appData: any
  changeStatus: any
  appDataTemp: any
  update: any
  wallet: any
  eventData: any
  g_Model: any
  g_GameStatus: any
}

interface IAppContextProvider {
  children: any
}

const defaultState = {
  gameStatus: "",
  actionStatus: "",
  txStatus: "",
  appData: {},
  changeStatus: () => { },
  appDataTemp: {},
  update: () => { },
  wallet: {},
  eventData: {},
  g_Model: {},
  g_GameStatus: "",
}

const AppContext = createContext<IAppContext>(defaultState)

export function AppContextProvider({ children }: IAppContextProvider) {
  const [gameStatus, setGameStatus] = useState<string>(constants.DISCONNECTED)
  const [actionStatus, setActionStatus] = useState<string>("")
  const [txStatus, setTxStatus] = useState<string>("")
  const [appDataTemp, setAppDataTemp] = useState<any>({})
  const [appData, setAppData] = useState<any>({})
  const [provider, setProvider] = useState<any>()
  const [contract, setContract] = useState<any>()
  const [wallet, setWallet] = useState<any>()
  const [eventData, setEventData] = useState<any>({})
  let signer, accounts: any

  const changeStatus = async (action: string, payload: any) => {
    switch (gameStatus) {
      case constants.DISCONNECTED:
        if (action === constants.connect) {
          await connect()
        }
        break
      case constants.NEW_GAME:
        if (actionStatus === constants.DISPLAY && action === constants.start) {
          if (appDataTemp.balance < payload * 1e8) {
            setActionStatus(constants.BLINK)
            setTimeout(() => {
              setActionStatus(constants.DISPLAY)
            }, 1000)
          }
          else startFarm(payload)
        }
        if (actionStatus === constants.START) {
          if (txStatus === constants.FAILED && action === constants.okay) setActionStatus(constants.DISPLAY)
          if (txStatus === constants.SUCCESS && action === constants.okay) {
            setGameStatus(constants.CUTSCENE_2)
            setTimeout(async () => {
              await update()
              setGameStatus(constants.FARMING)
              setActionStatus(constants.DISPLAY)
            }, constants.CUTSCENE_2_TIME)
          }
        }
        break
      case constants.FARMING:
        break
      case constants.DEADLINE_1:
        if (action === constants.harvest) {
          harvest()
        }
        if (action === constants.level_up) {
          levelUp()
        }
        if (actionStatus === constants.HARVEST) {
          if (txStatus === constants.FAILED && action === constants.okay) setActionStatus(constants.DISPLAY)
          if (txStatus === constants.SUCCESS && action === constants.okay) {
            await update()
            setGameStatus(constants.NEW_GAME)
            setActionStatus(constants.DISPLAY)
          }
        }
        if (actionStatus === constants.LEVEL_UP) {
          if (txStatus === constants.FAILED && action === constants.okay) setActionStatus(constants.DISPLAY)
          if (txStatus === constants.SUCCESS && action === constants.okay) {
            await update()
            setGameStatus(constants.FARMING)
            setActionStatus(constants.DISPLAY)
          }
        }
        break
      case constants.DEADLINE_2:
        if (action === constants.harvest) harvest()
        if (actionStatus === constants.HARVEST) {
          if (txStatus === constants.FAILED && action === constants.okay) setActionStatus(constants.DISPLAY)
          if (txStatus === constants.SUCCESS && action === constants.okay) {
            await update()
            setGameStatus(constants.NEW_GAME)
            setActionStatus(constants.DISPLAY)
          }
        }
        break
      case constants.GAMEOVER:
        if (action === constants.remove) remove()
        if (actionStatus === constants.REMOVE) {
          if (txStatus === constants.FAILED && action === constants.okay) setActionStatus(constants.DISPLAY)
          if (txStatus === constants.SUCCESS && action === constants.okay) {
            await update()
            setGameStatus(constants.NEW_GAME)
            setActionStatus(constants.DISPLAY)
          }
        }
        break
      default:
        break
    }

    if (gameStatus != constants.DISCONNECTED) {
      if (action === constants.disconnect) {
        setActionStatus(constants.DISCONNECTED)
        disconnect()
      }
    }
  }

  const connect = async () => {
    await switchEthereumChain()
    await addToken()

    if (window.ethereum) {
      try {
        setGameStatus(constants.CONNECTING)
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
        signer = provider.getSigner()
        const contracts = new ethers.Contract(PITAddress, PITAbi, signer)
        setContract(contracts)
        const Model: ContractModel = new ContractModel
        Model.setContract(contracts)
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setWallet(accounts[0])
        Model.setWallet(accounts[0])
        Model.setEventFunc(setEventData)
        g_Model = Model
        const farmInfo: any = await Model.getAppData()
        if (farmInfo.success) {
          if (farmInfo.farmingID == 0) {
            setGameStatus(constants.CUTSCENE_1)
            setTimeout(() => {
              setGameStatus(constants.NEW_GAME)
            }, constants.CUTSCENE_1_TIME)
          }
          else {
            if (farmInfo.currentDay < farmInfo.endDay)
              setGameStatus(constants.FARMING)
            else if (farmInfo.currentDay - farmInfo.endDay < 16)
              setGameStatus(constants.DEADLINE_1)
            else if (farmInfo.currentDay - farmInfo.endDay > 15 && farmInfo.currentDay - farmInfo.endDay < 31)
              setGameStatus(constants.DEADLINE_2)
            else if (farmInfo.currentDay - farmInfo.endDay > 30)
              setGameStatus(constants.GAMEOVER)
          }
          setActionStatus(constants.DISPLAY)
          setAppData(cookAppData(farmInfo))
          g_GameStatus = constants.CONNECTING
        }
        else {
          setGameStatus(constants.DISCONNECTED)
          g_GameStatus = constants.DISCONNECTED
        }
        window.ethereum.on("accountsChanged", handleAccountsChanged)
        window.ethereum.on("chainChanged", handleChainChanged)
      } catch (error) {
        console.error(error)
        setGameStatus(constants.DISCONNECTED)
      }
    }
  }

  const switchEthereumChain = async () => {
    // Check if MetaMask is installed
    // MetaMask injects the global API into window.ethereum
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }], // chainId must be in hexadecimal numbers
        })
      } catch (error: any) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        console.error(error)
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              id: 1,
              jsonrpc: "2.0",
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                  chainName: "Polygon Testnet Mumbai",
                  nativeCurrency: {
                    name: "tMATIC",
                    symbol: "tMATIC", // 2-6 characters long
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            })
          } catch (addError) {
            console.error(addError)
          }
        }
        console.error(error)
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
      alert("MetaMask is not installed. Please consider installing it: https://metamask.io/download.html")
    }
  }

  const addToken = async () => {
    if (localStorage.getItem("wasAdded") === "true") { return }
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: PITAddress, // The address that the token is at.
            symbol: "PIT", // A ticker symbol or shorthand, up to 5 chars.
            decimals: 8, // The number of decimals in the token
            // image: tokenImage, // A string url of the token logo
          },
        },
      })

      if (wasAdded) {
        console.log("Thanks for your interest!")
        localStorage.setItem("wasAdded", "true")
      } else {
        console.log("Your loss!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const update = async () => {
    let g_gameStatus: any
    const farmInfo: any = await g_Model.getAppData()
    if (!farmInfo.success || g_GameStatus === constants.DISCONNECTED) {
      return
    }
    if (farmInfo.farmingID > 0) {
      if (farmInfo.currentDay < farmInfo.endDay) {
        g_gameStatus = constants.FARMING
      }
      else if (farmInfo.currentDay - farmInfo.endDay < 16)
        g_gameStatus = constants.DEADLINE_1
      else if (farmInfo.currentDay - farmInfo.endDay > 15 && farmInfo.currentDay - farmInfo.endDay < 31)
        g_gameStatus = constants.DEADLINE_2
      else if (farmInfo.currentDay - farmInfo.endDay > 30)
        g_gameStatus = constants.GAMEOVER
    }
    else g_gameStatus = constants.NEW_GAME
    setGameStatus(g_gameStatus)

    const temp = { ...appDataTemp, ...farmInfo }
    const appData = cookAppData(temp)
    setAppDataTemp(temp)
    setAppData(appData)
  }

  const startFarm = async (ammount: any) => {
    setActionStatus(constants.START)
    setTxStatus(constants.PENDING)
    const result: any = await g_Model.startFarming(Math.trunc(ammount * 1e8))
    if (result.success) {
      setTxStatus(constants.SUCCESS)
      setAppData({ ...appData, txHash: result.txHash })
    } else {
      setTxStatus(constants.FAILED)
    }
  }

  const levelUp = async () => {
    setActionStatus(constants.LEVEL_UP)
    setTxStatus(constants.PENDING)
    const result: any = await g_Model.levelUp()
    if (result.success) {
      setTxStatus(constants.SUCCESS)
      setAppData({ ...appData, txHash: result.txHash })
    } else {
      setTxStatus(constants.FAILED)
    }
  }

  const remove = async () => {
    setActionStatus(constants.REMOVE)
    setTxStatus(constants.PENDING)
    const result: any = await g_Model.harvest()
    if (result.success) {
      setTxStatus(constants.SUCCESS)
      setAppData({ ...appData, txHash: result.txHash })
    } else {
      setTxStatus(constants.FAILED)
    }
  }

  const harvest = async () => {
    try {
      setActionStatus(constants.HARVEST)
      setTxStatus(constants.PENDING)
      let startTx = await contract.harvest()
      contract
        .on("Harvest", (farmer: string, farmingID: string, reward: string, payout: string) => {
          setEventData({
            farmer: farmer,
            farmingID: farmingID,
            reward: reward,
            payout: payout,
          })
          setTxStatus(constants.SUCCESS)
        })
      let txReceipt = await startTx.wait()
      let txHash = txReceipt.events[0].transactionHash
      setAppData({ ...appData, txHash: txHash })
    }
    catch (err) {
      setTxStatus(constants.FAILED)
    }
  }

  const handleAccountsChanged = async (accounts: any) => {
    setWallet(accounts[0])
    g_Model.setWallet(accounts[0])
    await update()
  }

  const handleChainChanged = async (chainId: any) => {
    window.ethereum.removeAllListeners("accountsChanged")
    window.ethereum.removeAllListeners("chainChanged")
    disconnect()
  }

  const disconnect = () => {
    setGameStatus(constants.DISCONNECTED)
    g_GameStatus = constants.DISCONNECTED
    window.ethereum.removeAllListeners("accountsChanged")
    window.ethereum.removeAllListeners("chainChanged")
  }

  return (
    <AppContext.Provider value={{
      gameStatus, actionStatus, txStatus, appData, changeStatus,
      appDataTemp, update, wallet, eventData, g_Model, g_GameStatus
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
