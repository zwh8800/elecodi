import Home from '@/page/home';
import TVIndex from '@/page/tv';
import TV from '@/page/tv/tv';
import Movie from '@/page/movie/movie';
import Seasons from '@/page/tv/season';
import Episodes from '@/page/tv/episode';
import MovieDetail from '@/page/movie/detail';

type ReactElement = any;

export class RouteItem {
    path: string;
    component: ReactElement;
    exact?: boolean;
    breadcrumbName: string;
    children?: any
}

export class BreadcrumbMap {
    path: string;
    breadcrumbName: string;
}

const routes: RouteItem[] = [
    {
        path: '/',
        component: Home,
        exact: true,
        breadcrumbName: '首页'
    },
    {
        path: '/tv',
        component: TVIndex,
        exact: false,
        breadcrumbName: '剧集',
        children: [
            {
                path: '/tv/',
                component: TV,
                exact: true,
                breadcrumbName: '剧集'
            },
            {
                path: '/tv/:id',
                component: Seasons,
                exact: true,
                breadcrumbName: '分季',
            },
            {
                path: '/tv/:id/season/:season',
                component: Episodes,
                exact: true,
                breadcrumbName: '详情'
            }
        ]
    },
    {
        path: '/movie',
        component: TVIndex,
        exact: false,
        breadcrumbName: '电影',
        children: [
            {
                path: '/movie/',
                component: Movie,
                exact: true,
                breadcrumbName: '电影'
            },
            {
                path: '/movie/:id',
                component: MovieDetail,
                breadcrumbName: '详情'
            }
        ]
    }
];

export default routes;