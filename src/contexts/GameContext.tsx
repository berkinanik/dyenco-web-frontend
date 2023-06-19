import { createContext, useContext, useState } from 'react';

import { filter, isEmpty, isEqual, omit, reduce, slice } from 'lodash';
import useLocalStorage from 'use-local-storage';
import { v4 as uuidv4 } from 'uuid';

import { getSuccessfulHits } from '@/services/queries/success/getSuccessfulHits';
import { GameMode } from '@/types/game';
import { BallFeedRate, Spin } from '@/types/settings';

type GameStatus = {
  startedAt: number;
  mode: GameMode;
};

type GameContentBase = {
  targetArea: number;
  spin: Spin;
  ballFeedRate: BallFeedRate;
};

type GameContent = {
  id: number;
  startedAt: number;
  endedAt: number;
} & GameContentBase;

type GameContentHistory = {
  id: number;
  length: number;
} & GameContentBase;

type GameHistory = {
  id: string;
  date: number;
  length: number;
  mode: GameMode;
  successfulHits?: number;
  contents: GameContentHistory[];
};

type GameContextType = {
  gameStatus: GameStatus | null;
  startOrUpdateGame: (mode: GameMode, content: GameContentBase) => void;
  endGame: () => void;
  resetGame: () => void;
  gameHistory: GameHistory[] | undefined;
  removeGameHistory: (id: string) => void;
};

const GameContext = createContext<GameContextType>({
  gameStatus: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  startOrUpdateGame: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  endGame: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetGame: () => {},
  gameHistory: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeGameHistory: () => {},
});

export const useGameContext = () => useContext(GameContext);

export const GameContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus | null>(null);
  const [gameContentArray, setGameContentArray] = useState<GameContent[]>([]);

  const [gameHistory, setGameHistory] = useLocalStorage<
    GameHistory[] | undefined
  >('gameHistory', []);

  const handleGameStartOrUpdate = (
    mode: GameMode,
    content: GameContentBase,
  ) => {
    const currentDateTime = Date.now();

    setGameStatus((prevStatus) => {
      if (prevStatus) {
        return { ...prevStatus, mode };
      }

      return { startedAt: currentDateTime, mode };
    });

    setGameContentArray((prevArray) => {
      if (isEmpty(prevArray)) {
        return [{ ...content, startedAt: currentDateTime, endedAt: 0, id: 1 }];
      }

      const lastContent = prevArray[prevArray.length - 1];

      if (
        isEqual(
          omit(lastContent, ['id', 'endedAt', 'startedAt']),
          omit(content, ['id', 'endedAt', 'startedAt']),
        )
      ) {
        return prevArray;
      }

      return [
        ...slice(prevArray, 0, -1),
        { ...lastContent, endedAt: currentDateTime },
        {
          ...content,
          startedAt: currentDateTime,
          endedAt: 0,
          id: lastContent.id + 1,
        },
      ];
    });
  };

  const handleGameEnd = () => {
    if (!gameStatus) {
      return;
    }

    const currentDateTime = Date.now();

    const gameContent = [
      ...slice(gameContentArray, 0, -1),
      {
        ...gameContentArray[gameContentArray.length - 1],
        endedAt: currentDateTime,
      },
    ];

    // calculate game content length from startedAt and endedAt
    const gameContentReduced = reduce(
      gameContent,
      (result, content) => {
        const { startedAt, endedAt } = content;

        return [
          ...result,
          {
            ...content,
            length: endedAt - startedAt,
          },
        ];
      },
      [] as GameContentHistory[],
    );

    const gameLength = currentDateTime - gameStatus.startedAt;

    getSuccessfulHits().then((data) => {
      setGameHistory((prevHistory) => [
        ...(prevHistory || []),
        {
          id: uuidv4(),
          date: currentDateTime,
          length: gameLength,
          mode: gameStatus.mode,
          successfulHits: data?.successfulHits,
          contents: gameContentReduced,
        },
      ]);

      setGameStatus(null);
      setGameContentArray([]);
    });
  };

  const handleGameReset = () => {
    setGameStatus(null);
    setGameContentArray([]);
  };

  const handleRemoveGameHistory = (id: string) => {
    setGameHistory((prevHistory) => {
      if (isEmpty(prevHistory)) {
        return prevHistory;
      }

      return filter(prevHistory, (history) => history.id !== id);
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameStatus,
        startOrUpdateGame: handleGameStartOrUpdate,
        endGame: handleGameEnd,
        resetGame: handleGameReset,
        gameHistory,
        removeGameHistory: handleRemoveGameHistory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
