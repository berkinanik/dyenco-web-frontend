import { Route, Switch } from 'react-router-dom';

import { AdvancedControlPage } from '@/pages/advanced-control/AdvancedControlPage';
import { BasicControlPage } from '@/pages/basic-control/BasicControlPage';
import { GameHistoryPage } from '@/pages/game-history/GameHistoryPage';
import { NotFoundPage } from '@/pages/not-found/NotFoundPage';

import { withLayout } from './withLayout';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        {withLayout(BasicControlPage)}
      </Route>

      <Route path="/advanced-control">{withLayout(AdvancedControlPage)}</Route>

      <Route path="/game-history">
        <GameHistoryPage />
      </Route>

      <Route path="*">{NotFoundPage}</Route>
    </Switch>
  );
};
