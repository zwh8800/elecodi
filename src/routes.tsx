import Home from '@/page/home';
import TV from '@/page/tv';
import Movie from '@/page/movie/movie';
import TvDetail from '@/page/tv/detail';
import MovieDetail from '@/page/movie/detail';

type ReactElement = any;

export class RouteItem {
    path: string;
    component: ReactElement;
    exact?: boolean;
    breadcrumbName: string;
}

const routes: RouteItem[] = [
    {
        path: '/',
        component: Home,
        exact: true,
        breadcrumbName: 'Home'
    },
    {
        path: '/tv',
        component: TV,
        exact: true,
        breadcrumbName: '剧集'
    },
    {
        path: '/tv/:id',
        component: TvDetail,
        breadcrumbName: '剧集/详情'
    },
    {
        path: '/movie',
        component: Movie,
        exact: true,
        breadcrumbName: '电影'
    },
    {
        path: '/movie/:id',
        component: MovieDetail,
        breadcrumbName: '电影/详情'
    },
];

export default routes;