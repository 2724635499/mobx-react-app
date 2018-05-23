import Loadable from 'react-loadable';
import Loading from './Loading';

let config = [
  {
    name: 'home',
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('./home'),
      loading: Loading
    })
  },
  {
    name: 'test1',
    path: '/test1',
    exact: true,
    component: Loadable({
      loader: () => import('./test1'),
      loading: Loading
    })
  },
  {
    name: 'test2',
    path: '/test2',
    exact: true,
    component: Loadable({
      loader: () => import('./test2'),
      loading: Loading
    })
  },
  {
    name: 'test3',
    path: '/test3',
    exact: true,
    component: Loadable({
      loader: () => import('./test3'),
      loading: Loading
    })
  },
  {
    name: 'notFound',
    path: null,
    exact: true,
    component: Loadable({
      loader: () => import('./notFound'),
      loading: Loading
    })
  }
];

export default config;
