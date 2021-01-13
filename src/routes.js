import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Word = React.lazy(() => import('./views/Word'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/word', name: 'Word', component: Word },
];

export default routes;
