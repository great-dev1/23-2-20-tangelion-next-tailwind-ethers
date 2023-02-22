import { createContext, useContext, useState } from "react"
import { ethers } from "ethers"
import PITAbi from "@/contracts/PIT.json"
import constants from "@/utils/constants"

declare global {
  interface Window {
    ethereum?: any
  }
}

interface IAppContext {
  gameStatus: string
  actionStatus: string
  txStatus: string
  appData: any
  changeStatus: any
}

interface IAppContextProvider {
  children: React.ReactNode
}

const PITAddress = "0xEe80212570c41E1D21C7B0FA1d2539945fC88868" //Polygon Mumbai Testnet

const defaultState = {
  gameStatus: "",
  actionStatus: "",
  txStatus: "",
  appData: {},
  changeStatus: () => { },
};

const AppContext = createContext<IAppContext>(defaultState)

export function AppContextProvider({ children }: IAppContextProvider) {
  const [gameStatus, setGameStaus] = useState<string>(constants.GAMEOVER)
  const [actionStatus, setActionStatus] = useState<string>(constants.START)
  const [txStatus, setTxStatus] = useState<string>(constants.FAILED)
  const [appData, setAppData] = useState<any>({
    balance: "9999.1234",
    wallet: "0xcF8c7A11bAF05b249aE36D0809f668FF5C5314d5",
    deposit: "275.67865432",
    earningOfLevel: "23.19823123",
    earningOfGame: "42.34201018",
    difficultyOfToday: "12.1122",
    difficultyOfGame: "11.4422",
    advantage: "8.7429",
    estimatedEarning: "0.3024",
    level: 1,
    remainingDays: 28,
    deadline1Days: 12,
    deadline2Days: 7,
    txHash: "0xbd6133cd3de7e845152f82a44cb19b66bbf0a45970fa41e45ce5eead3253f282",
  })

  const changeStatus = (action: string, payload: string) => {
    console.log("ACTION", action)
    console.log("PAYLOAD", payload)
    // setActionStatus(constants.BLINK)
  }

  return (
    <AppContext.Provider value={{
      gameStatus, actionStatus, txStatus, appData, changeStatus
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext)
}
