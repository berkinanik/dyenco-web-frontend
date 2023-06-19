import { createContext, useContext, useState } from 'react';

import { filter, isEmpty, isEqual, reduce, slice, uniqueId } from 'lodash';
import useLocalStorage from 'use-local-storage';

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
  startedAt: number;
  endedAt: number;
} & GameContentBase;

type GameContentHistory = {
  length: number;
} & GameContentBase;

type GameHistory = {
  id: string;
  date: number;
  length: number;
  mode: GameMode;
  contents: GameContentHistory[];
};

type GameContextType = {
  gameStatus: GameStatus | null;
  startOrUpdateGame: (mode: GameMode, content: GameContent) => void;
  endGame: () => void;
  gameHistory: GameHistory[];
  removeGameHistory: (id: string) => void;
};

const GameContext = createContext<GameContextType>({
  gameStatus: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  startOrUpdateGame: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  endGame: () => {},
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

  const [gameHistory, setGameHistory] = useLocalStorage<GameHistory[]>(
    'gameHistory',
    [],
  );

  const handleGameStartOrUpdate = (mode: GameMode, content: GameContent) => {
    const currentDateTime = Date.now();

    setGameStatus((prevStatus) => {
      if (prevStatus) {
        return { ...prevStatus, mode };
      }

      return { startedAt: currentDateTime, mode };
    });

    setGameContentArray((prevArray) => {
      if (isEmpty(prevArray)) {
        return [{ ...content, startedAt: currentDateTime, endedAt: 0 }];
      }

      const lastContent = prevArray[prevArray.length - 1];

      if (isEqual(lastContent, content)) {
        return prevArray;
      }

      return [
        ...slice(prevArray, 0, -1),
        { ...lastContent, endedAt: currentDateTime },
        { ...content, startedAt: currentDateTime, endedAt: 0 },
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

    const gameLength = gameStatus.startedAt - currentDateTime;

    setGameHistory((prevHistory) => [
      ...(prevHistory || []),
      {
        id: uniqueId('game_'),
        date: currentDateTime,
        length: gameLength,
        mode: gameStatus.mode,
        contents: gameContentReduced,
      },
    ]);

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
        gameHistory,
        removeGameHistory: handleRemoveGameHistory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
