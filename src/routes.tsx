import Home from '@/page/home';
import TV from '@/page/tv';
import Movie from '@/page/movie';
import TvDetail from '@/page/tv/detail';
import MovieDetail from '@/page/movie/detail';

type ReactElement = any;

export class RouteChild {
    path: string;
    component: ReactElement;
    breadcrumbName: string;
}

export class RouteItem {
    path: string;
    component: ReactElement;
    exact?: boolean;
    breadcrumbName: string;
    children?: RouteChild[];
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
        breadcrumbName: 'TV',
        children: [
            {
                path: '/tv/detail',
                component: TvDetail,
                breadcrumbName: '详情'
            }
        ]
    },
    {
        path: '/movie',
        component: Movie,
        breadcrumbName: 'Movie',
        children: [
            {
                path: '/movie/detail',
                component: MovieDetail,
                breadcrumbName: '详情'
            }
        ]
    }
];

export default routes;