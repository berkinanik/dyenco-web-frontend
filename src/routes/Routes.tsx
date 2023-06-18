import { Route, Switch } from 'react-router-dom';

import { AdvancedControlPage } from '@/pages/advanced-control/AdvancedControlPage';
import { BasicControlPage } from '@/pages/basic-control/BasicControlPage';
import { NotFoundPage } from '@/pages/not-found/NotFoundPage';

import { withLayout } from './withLayout';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        {withLayout(BasicControlPage)}
      </Route>

      <Route path="/test">
        <div>Test</div>
      </Route>

      <Route path="/advanced-control">{withLayout(AdvancedControlPage)}</Route>

      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
