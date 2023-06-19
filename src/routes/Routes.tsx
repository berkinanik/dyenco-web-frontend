import { Route, Switch } from 'react-router-dom';

import { AdvancedControlPage } from '@/pages/advanced-control/AdvancedControlPage';
import { BasicControlPage } from '@/pages/basic-control/BasicControlPage';
import { GameHistoryPage } from '@/pages/game-history/GameHistoryPage';
import { NotFoundPage } from '@/pages/not-found/NotFoundPage';
import { RandomGamePage } from '@/pages/random-game/RandomGamePage';

import { withLayout } from './withLayout';
import { withStatusLayout } from './withStatusLayout';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        {withStatusLayout(BasicControlPage)}
      </Route>

      <Route path="/random-game">{withStatusLayout(RandomGamePage)}</Route>

      <Route path="/advanced-control">
        {withStatusLayout(AdvancedControlPage)}
      </Route>

      <Route path="/game-history">{withLayout(GameHistoryPage)}</Route>

      <Route path="*">{withLayout(NotFoundPage)}</Route>
    </Switch>
  );
};
