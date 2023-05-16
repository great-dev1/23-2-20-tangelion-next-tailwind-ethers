import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { PIQAbi, PIQAddress } from "@/contracts/PIQ";
import { ContractModel } from "./ContractModel";
import { cookAppData, sleep } from "@/utils";
import constants from "@/utils/constants";

declare global {
  interface Window {
    ethereum?: any;
  }
}

let g_Model: any;
let g_GameStatus: string = constants.DISCONNECTED;
let g_NetID: any = "0x0";

interface IAppContext {
  gameStatus: string;
  actionStatus: string;
  txStatus: string;
  appData: any;
  changeStatus: any;
  appDataTemp: any;
  update: any;
  readOnly: any;
  wallet: any;
  eventData: any;
  g_Model: any;
  g_GameStatus: any;
  setGameStatus: any;
  videoLoading: boolean;
  setVideoLoading: any;
}

interface IAppContextProvider {
  children: any;
}

const defaultState = {
  gameStatus: "",
  actionStatus: "",
  txStatus: "",
  appData: {},
  changeStatus: () => {},
  appDataTemp: {},
  update: () => {},
  readOnly: () => {},
  wallet: {},
  eventData: {},
  g_Model: {},
  g_GameStatus: "",
  setGameStatus: () => {},
  videoLoading: true,
  setVideoLoading: () => {},
};

const AppContext = createContext<IAppContext>(defaultState);

export function AppContextProvider({ children }: IAppContextProvider) {
  const [gameStatus, setGameState] = useState<string>(constants.DISCONNECTED);
  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const [actionStatus, setActionStatus] = useState<string>("");
  const [txStatus, setTxStatus] = useState<string>("");
  const [appDataTemp, setAppDataTemp] = useState<any>({});
  const [appData, setAppData] = useState<any>({});
  const [provider, setProvider] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [wallet, setWallet] = useState<any>();
  const [eventData, setEventData] = useState<any>({});
  const router = useRouter();
  let signer, accounts: any;

  const setGameStatus = (status: string) => {
    g_GameStatus = status;
    setGameState(status);
  };

  const changeStatus = async (action: string, payload: any) => {
    if (action === constants.set_day) {
      await g_Model.setDay(Number(appData.currentDay) + payload);
      return;
    }
    switch (gameStatus) {
      case constants.DISCONNECTED:
        if (action === constants.connect) {
          await connect();
        }
        break;
      case constants.NEW_GAME:
        if (actionStatus === constants.DISPLAY && action === constants.start) {
          if (appDataTemp.balance < payload * 1e8) {
            setActionStatus(constants.BLINK);
            setTimeout(() => {
              setActionStatus(constants.DISPLAY);
            }, 1000);
          } else await startStaking(payload);
        }
        if (actionStatus === constants.START) {
          if (txStatus === constants.FAILED && action === constants.okay)
            setActionStatus(constants.DISPLAY);
          if (txStatus === constants.SUCCESS && action === constants.okay) {
            setGameStatus(constants.CUTSCENE_2);
            setActionStatus(constants.DISPLAY);
          }
        }
        break;
      case constants.STAKING:
        break;
      case constants.DEADLINE_1:
        if (action === constants.unstake) {
          await unstake();
        }
        if (action === constants.level_up) {
          await levelUp();
        }
        if (actionStatus === constants.UNSTAKE) {
          if (txStatus === constants.FAILED && action === constants.okay)
            setActionStatus(constants.DISPLAY);
          if (txStatus === constants.SUCCESS && action === constants.okay) {
            await update("Update_by_unstake_OK_btn");
            setActionStatus(constants.DISPLAY);
            setGameStatus(constants.NEW_GAME);
          }
        }
        if (actionStatus === constants.LEVEL_UP) {
          if (txStatus === constants.FAILED && action === constants.okay)
            setActionStatus(constants.DISPLAY);
          if (txStatus === constants.SUCCESS && action === constants.okay) {
            await update("Update_by_levelup_OK_btn");
            setGameStatus(constants.STAKING);
            setActionStatus(constants.DISPLAY);
          }
        }
        break;
      case constants.DEADLINE_2:
        if (action === constants.unstake) await unstake();
        if (actionStatus === constants.UNSTAKE) {
          if (txStatus === constants.FAILED && action === constants.okay)
            setActionStatus(constants.DISPLAY);
          if (txStatus === constants.SUCCESS && action === constants.okay) {
            setGameStatus(constants.NEW_GAME);
            setActionStatus(constants.DISPLAY);
            await update("Update_by_unstake_OK_btn");
          }
        }
        break;
      case constants.GAMEOVER:
        if (action === constants.remove) await remove();
        if (actionStatus === constants.REMOVE) {
          if (txStatus === constants.FAILED && action === constants.okay)
            setActionStatus(constants.DISPLAY);
          if (txStatus === constants.SUCCESS && action === constants.okay) {
            await update("Update_by_remove_btn");
            setGameStatus(constants.NEW_GAME);
            setActionStatus(constants.DISPLAY);
          }
        }
        break;
      default:
        break;
    }

    if (gameStatus != constants.DISCONNECTED) {
      if (action === constants.disconnect) {
        setActionStatus(constants.DISCONNECTED);
        disconnect();
      }
    }
  };

  const connect = async () => {
    if (window.ethereum) {
      try {
        router.push("/");
        setGameStatus(constants.CONNECTING);
        console.log("Action: User clicked connect!");
        await sleep(300);
        await switchEthereumChain();
        await sleep(300);
        g_NetID = "0x13881";

        await sleep(100);
        await addToken();
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        signer = provider.getSigner();
        const contracts = new ethers.Contract(PIQAddress, PIQAbi, signer);
        setContract(contracts);
        const Model: ContractModel = new ContractModel();
        Model.setContract(contracts);
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWallet(accounts[0]);
        Model.setWallet(accounts[0]);
        Model.setEventFunc(setEventData);
        g_Model = Model;
        const stakeData: any = await getData();
        if (stakeData.success) {
          if (stakeData.stakeID == 0) {
            setGameStatus(constants.CUTSCENE_1);
          } else {
            if (stakeData.currentDay < stakeData.endDay)
              setGameStatus(constants.STAKING);
            else if (stakeData.currentDay - stakeData.endDay < 15)
              setGameStatus(constants.DEADLINE_1);
            else if (
              stakeData.currentDay - stakeData.endDay >= 15 &&
              stakeData.currentDay - stakeData.endDay < 30
            )
              setGameStatus(constants.DEADLINE_2);
            else if (stakeData.currentDay - stakeData.endDay >= 30)
              setGameStatus(constants.GAMEOVER);
          }
          setActionStatus(constants.DISPLAY);
          setAppData(cookAppData(stakeData));
          g_GameStatus = constants.CONNECTING;
        } else {
          setGameStatus(constants.DISCONNECTED);
          g_GameStatus = constants.DISCONNECTED;
        }
        setTxStatus(constants.FAILED);
        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);
      } catch (error) {
        console.log(error);
        setGameStatus(constants.DISCONNECTED);
      }
    }
  };

  const switchEthereumChain = async () => {
    // Check if MetaMask is installed
    // MetaMask injects the global API into window.ethereum
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        console.log("Metamask: Switching to Mumbai net!");
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }], // chainId must be in hexadecimal numbers
        });
      } catch (error: any) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        console.log(error);
        console.log(
          "Metamask: Error while Switching to Mumbai net!",
          error.code
        );
        if (error.code === 4902) {
          console.log("Metamask: Adding Mumbai test net!", error.code);
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
          });
          console.log("Metamask: User confirmed Mumbai test net!", error.code);
        } else setGameStatus(constants.DISCONNECTED);
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
      localStorage.removeItem(PIQAddress);
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
    }
  };

  const addToken = async () => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      if (localStorage.getItem(PIQAddress)) return;
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: PIQAddress, // The address that the token is at.
            symbol: "PIQ", // A ticker symbol or shorthand, up to 5 chars.
            decimals: 8, // The number of decimals in the token
            image: "https://xubay.com/images/piq_256.png", // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
        localStorage.setItem(PIQAddress, "true");
      } else {
        console.log("You loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const readOnly = async () => {
    let stakeData;
    while (1) {
      stakeData = await getData();
      if (stakeData.stakeID > 0) break;
      if (
        g_GameStatus === constants.NEW_GAME ||
        g_GameStatus === constants.DISCONNECTED ||
        g_GameStatus === constants.CONNECTING ||
        g_GameStatus === constants.CUTSCENE_1 ||
        g_NetID != "0x13881" ||
        g_GameStatus === constants.DISCONNECTED ||
        stakeData.reason === "underlying network changed"
      ) {
        break;
      }
      await sleep(100);
      console.log("Retry_ReadOnly...", g_GameStatus);
    }
    if (g_NetID != "0x13881") return;
    if (stakeData.reason === "underlying network changed") return;
    const temp = { ...appDataTemp, ...stakeData };
    const appDataNew = cookAppData(temp);
    setAppDataTemp(temp);
    setAppData({ ...appData, ...appDataNew });
  };

  const getData = async () => {
    let stakeData;
    while (1) {
      stakeData = await g_Model.getAppData();
      if (
        stakeData.success ||
        g_NetID != "0x13881" ||
        g_GameStatus === constants.DISCONNECTED ||
        stakeData.reason === "underlying network changed"
      )
        break;
      console.log(
        "App: Reloading stakingInfo, reason: network fail",
        g_NetID,
        g_GameStatus
      );
      await sleep(100);
    }
    return { ...stakeData };
  };

  const refresh = async () => {
    let m_gameStatus: any;
    const stakeData = await getData();
    if (
      g_GameStatus === constants.DISCONNECTED ||
      stakeData.reason === "underlying network changed"
    ) {
      return;
    }
    if (stakeData.stakeID > 0) {
      if (stakeData.currentDay < stakeData.endDay) {
        m_gameStatus = constants.STAKING;
      } else if (stakeData.currentDay - stakeData.endDay < 15)
        m_gameStatus = constants.DEADLINE_1;
      else if (
        stakeData.currentDay - stakeData.endDay >= 15 &&
        stakeData.currentDay - stakeData.endDay < 30
      )
        m_gameStatus = constants.DEADLINE_2;
      else if (stakeData.currentDay - stakeData.endDay >= 30)
        m_gameStatus = constants.GAMEOVER;
    } else m_gameStatus = constants.NEW_GAME;

    const temp = { ...appDataTemp, ...stakeData };
    const appData = cookAppData(temp);
    setAppDataTemp(temp);
    setAppData(appData);
    setGameStatus(m_gameStatus);
  };

  const update = async (message: string) => {
    if (gameStatus === constants.DISCONNECTED || txStatus === constants.PENDING)
      return;
    if (
      gameStatus === constants.CUTSCENE_1 ||
      gameStatus === constants.CUTSCENE_2
    )
      return;
    if (gameStatus === constants.CONNECTING) return;

    console.log("App: Update_started =>", message);
    let m_gameStatus: any;
    let stakeData: any;
    if (
      (actionStatus === constants.LEVEL_UP ||
        actionStatus === constants.REMOVE ||
        actionStatus === constants.UNSTAKE) &&
      txStatus === constants.SUCCESS
    ) {
      while (1) {
        setTxStatus(constants.LOADING);
        stakeData = await getData();
        if (stakeData.reason === "underlying network changed") return;
        if (
          stakeData.level > appDataTemp.level ||
          Number(stakeData.stakeID) === 0
        ) {
          break;
        }
        console.log(
          "App: Reloading stakeData, reason: Old state",
          stakeData.level,
          appDataTemp.level
        );
        await sleep(300);
      }
    } else {
      stakeData = await getData();
      if (stakeData.reason === "underlying network changed") return;
    }
    if (g_GameStatus === constants.DISCONNECTED) {
      return;
    }
    if (stakeData.stakeID > 0) {
      if (stakeData.currentDay < stakeData.endDay) {
        m_gameStatus = constants.STAKING;
      } else if (stakeData.currentDay - stakeData.endDay < 15)
        m_gameStatus = constants.DEADLINE_1;
      else if (
        stakeData.currentDay - stakeData.endDay >= 15 &&
        stakeData.currentDay - stakeData.endDay < 30
      )
        m_gameStatus = constants.DEADLINE_2;
      else if (stakeData.currentDay - stakeData.endDay >= 30)
        m_gameStatus = constants.GAMEOVER;
    } else m_gameStatus = constants.NEW_GAME;

    const temp = { ...appDataTemp, ...stakeData };
    const appData = cookAppData(temp);
    setAppDataTemp(temp);
    setAppData(appData);
    setGameStatus(m_gameStatus);
    console.log("App: Update finished, Reason: ", message, m_gameStatus);
  };

  const startStaking = async (ammount: any) => {
    setActionStatus(constants.START);
    setTxStatus(constants.PENDING);
    const result: any = await g_Model.startStaking(Math.trunc(ammount * 1e8));
    if (result.success) {
      setTxStatus(constants.SUCCESS);
      setAppData({ ...appData, txHash: result.txHash });
    } else {
      setTxStatus(constants.FAILED);
    }
  };

  const levelUp = async () => {
    try {
      setActionStatus(constants.LEVEL_UP);
      setTxStatus(constants.PENDING);
      console.log("Action: User clicked levelUp!");
      const startTx = await contract.levelup();
      console.log("Metamask: User confirmed on Metamask!");
      const txReceipt = await startTx.wait();
      console.log("Metamask: Transaction success!");
      const txHash = txReceipt.events[0].transactionHash;
      setEventData(contract.interface.parseLog(txReceipt.logs[0]).args);
      setAppData({ ...appData, txHash: txHash });
      setTxStatus(constants.SUCCESS);
    } catch (error) {
      console.log("Metamask: Transaction failed!");
      setTxStatus(constants.FAILED);
    }
  };

  const remove = async () => {
    try {
      setActionStatus(constants.REMOVE);
      setTxStatus(constants.PENDING);

      console.log("Action: User clicked remove!");
      const startTx = await contract.unstake();
      console.log("Metamask: User confirmed on Metamask!");
      const txReceipt = await startTx.wait();
      console.log("Metamask: Transaction success!");
      const txHash = txReceipt.events[0].transactionHash;
      setTxStatus(constants.SUCCESS);
      setAppData({ ...appData, txHash: txHash });
    } catch (err) {
      console.log("Metamask: Transaction failed!");
      setTxStatus(constants.FAILED);
    }
  };

  const unstake = async () => {
    try {
      setActionStatus(constants.UNSTAKE);
      setTxStatus(constants.PENDING);

      console.log("Action: User clicked cashout!");
      const startTx = await contract.unstake();
      console.log("Metamask: User confirmed on Metamask!");
      const txReceipt = await startTx.wait();
      console.log("Metamask: Transaction success!");
      const txHash = txReceipt.events[0].transactionHash;
      setEventData(
        contract.interface.parseLog(txReceipt.logs[txReceipt.logs.length - 2])
          .args
      );
      setTxStatus(constants.SUCCESS);
      setAppData({ ...appData, txHash: txHash });
    } catch (err) {
      console.log("Metamask: Transaction failed!");
      setTxStatus(constants.FAILED);
    }
  };

  const handleAccountsChanged = async (accounts: any) => {
    console.log("Account_changed");
    await refresh();
    setTxStatus(constants.SUCCESS);
    setActionStatus(constants.DISPLAY);
    setWallet(accounts[0]);
    g_Model.setWallet(accounts[0]);
  };

  const handleChainChanged = (chainId: string) => {
    console.log("Chain_changed", chainId);
    if (chainId === "0x13881") return;
    window.ethereum.removeAllListeners("accountsChanged");
    window.ethereum.removeAllListeners("chainChanged");
    g_NetID = chainId;
    disconnect();
  };

  const disconnect = () => {
    setGameStatus(constants.DISCONNECTED);
    g_GameStatus = constants.DISCONNECTED;
    window.ethereum.removeAllListeners("accountsChanged");
    window.ethereum.removeAllListeners("chainChanged");
  };

  return (
    <AppContext.Provider
      value={{
        gameStatus,
        actionStatus,
        txStatus,
        setGameStatus,
        changeStatus,
        appData,
        appDataTemp,
        update,
        readOnly,
        wallet,
        eventData,
        g_Model,
        g_GameStatus,
        videoLoading,
        setVideoLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
