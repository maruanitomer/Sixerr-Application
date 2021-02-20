import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './assets/styles/basics/styles.scss';
import { AppHeader } from './cmps/AppHeader';
import { routes } from './routes';
import { socketService } from './services/socketService';

export function App() {
  socketService.setup()
  return (
    <>
      <div className="App">
        <header>
          <AppHeader />
        </header>
        <main>
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
        </main>
      </div>
    </>
  );
}

