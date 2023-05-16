// GAME STATUS
const DISCONNECTED = "DISCONNECTED";
const CONNECTING = "CONNECTING";
const CUTSCENE_1 = "CUTSCENE_1";
const NEW_GAME = "NEW_GAME";
const CUTSCENE_2 = "CUTSCENE_2";
const STAKING = "STAKING";
const DEADLINE_1 = "DEADLINE_1";
const DEADLINE_2 = "DEADLINE_2";
const GAMEOVER = "GAMEOVER";
// ACTION STATUS
const DISPLAY = "DISPLAY";
const BLINK = "BLINK";
const START = "START";
const UNSTAKE = "UNSTAKE";
const LEVEL_UP = "LEVEL_UP";
const REMOVE = "REMOVE";
// TX STATUS
const PENDING = "PENDING";
const SUCCESS = "SUCCESS";
const FAILED = "FAILED";
const LOADING = "LOADING";

// APP DATA
const balance = "balance";
const wallet = "wallet";
const deposit = "deposit";
const earningOfLevel = "earningOfLevel";
const earningOfGame = "earningOfGame";
const earningOfCompleted = "earningOfCompleted";
const difficultyOfToday = "difficultyOfToday";
const difficultyOfGame = "difficultyOfGame";
const advantage = "advantage";
const estimatedEarning = "estimatedEarning";
const level = "level";
const remainingDays = "remainingDays";
const startDay = "startDay";
const currentDay = "currentDay";
const txHash = "txHash";

// ACTION
const connect = "connect";
const disconnect = "disconnect";
const start = "start";
const okay = "okay";
const unstake = "unstake";
const level_up = "level_up";
const remove = "remove";
const set_day = "set_day";
// PAYLOAD
const success = "success";
const failed = "failed";
const LATENCY = 8000;

export default {
  DISCONNECTED,
  CONNECTING,
  CUTSCENE_1,
  NEW_GAME,
  CUTSCENE_2,
  STAKING,
  DEADLINE_1,
  DEADLINE_2,
  GAMEOVER,
  DISPLAY,
  BLINK,
  START,
  UNSTAKE,
  LEVEL_UP,
  REMOVE,
  PENDING,
  SUCCESS,
  LOADING,
  FAILED,
  balance,
  wallet,
  deposit,
  earningOfLevel,
  earningOfGame,
  earningOfCompleted,
  difficultyOfToday,
  difficultyOfGame,
  advantage,
  estimatedEarning,
  level,
  remainingDays,
  startDay,
  currentDay,
  txHash,
  connect,
  disconnect,
  start,
  okay,
  unstake,
  level_up,
  remove,
  success,
  failed,
  set_day,
  LATENCY,
};
