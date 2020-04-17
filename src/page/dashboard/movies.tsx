import * as React from 'react';

import { message, Dropdown, Menu } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { DownOutlined } from '@ant-design/icons';
import Loader from 'react-loaders';
import classnames from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';

import Poster from '@/component/poster/poster';
import * as conf from '@/conf/elecodiConf';
import {
    SortMethod,
    SortOrder,
    Movie,
    getMovieLibrary
} from '@/api';

import '@/assets/style/media-list';

const PAGE_SIZE = 20;

interface Props { }

class State {
    loading: boolean = false;
    isScollEnd: boolean = false;
    scrollDown: boolean = true;
    movies: Movie[] = [];
    sortMethod: SortMethod = SortMethod.dateadded;
    sortOrder: SortOrder = SortOrder.Descending;
}

export default class Movies extends React.Component<Props, State> {
    curPage: number = 0;
    ref: React.RefObject<HTMLDivElement>;
    lastScrollTop: number = 0;

    constructor(props: Props) {
        super(props);
        this.state = new State();
        conf.onConfigChange(this.onConfChange.bind(this));
        this.ref = React.createRef();
    }

    componentDidMount() {
        document.title = '电影 - ELECODI';
        this.ref.current.addEventListener('scroll', this.onMovConScroll.bind(this));
    }

    onMovConScroll() {
        let scrollTop = this.ref.current.scrollTop;
        this.setState({
            scrollDown: scrollTop - this.lastScrollTop > 0
        })
        this.lastScrollTop = scrollTop;
    }

    async loadMovies() {
        this.setState({
            loading: true
        })
        try {
            let movies = await getMovieLibrary({
                method: this.state.sortMethod,
                order: this.state.sortOrder
            }, this.curPage, PAGE_SIZE);
            if (movies.limits.end >= movies.limits.total) {
                this.setState({
                    isScollEnd: true
                })
            }
            for (let i = movies.limits.start; i < movies.limits.end; i++) {
                this.state.movies[i] = movies.movies[i - movies.limits.start];
            }
            this.setState({
                movies: this.state.movies
            })

        } catch (err) {
            console.error(err);
            message.error('网络异常：' + err);
        }
        this.setState({
            loading: false
        })
    }

    nextPage() {
        if (this.state.isScollEnd) {
            message.info('已经到底了');
            return;
        }
        this.curPage++;
        this.loadMovies();
    }

    reset() {
        this.curPage = 0;

        this.setState(new State());
        this.nextPage();
    }

    onConfChange() {
        this.reset();
    }

    onSorterMenuSelected(param: ClickParam) {
        console.log(param);

        this.curPage = 0;
        if (Object.values(SortMethod).includes(param.key as SortMethod)) {
            this.setState({
                isScollEnd: false,
                movies: [],
                sortMethod: param.key as SortMethod
            }, this.nextPage.bind(this));
        } else if (Object.values(SortOrder).includes(param.key as SortOrder)) {
            this.setState({
                isScollEnd: false,
                movies: [],
                sortOrder: param.key as SortOrder
            }, this.nextPage.bind(this));
        }
    }

    render() {
        let { loading, isScollEnd, movies, sortMethod, sortOrder } = this.state;
        const sorterMenu = (<Menu multiple={true} selectedKeys={[sortMethod, sortOrder]} onClick={this.onSorterMenuSelected.bind(this)}>
            <Menu.ItemGroup key="method" title="方式">
                <Menu.Item key={SortMethod.dateadded}>
                    按加入顺序
                </Menu.Item>
                <Menu.Item key={SortMethod.sorttitle}>
                    按名称
                </Menu.Item>
                <Menu.Item key={SortMethod.lastplayed}>
                    按最后观看时间
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="order" title="顺序">
                <Menu.Item key={SortOrder.Ascending}>
                    正序
                </Menu.Item>
                <Menu.Item key={SortOrder.Descending}>
                    倒序
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>);

        return (
            <div ref={this.ref} className="movie-con">
                <div style={{ 'position': this.state.scrollDown ? 'relative' : 'sticky' }} className="top-bar">
                    <div></div>
                    <div>
                        <Dropdown overlay={sorterMenu} trigger={['click']}>
                            <a className="sorter-dropdown" onClick={e => e.preventDefault()}>
                                排序 <DownOutlined />
                            </a>
                        </Dropdown>
                    </div>

                </div>
                <InfiniteScroll
                    initialLoad={true}
                    pageStart={1}
                    loadMore={this.nextPage.bind(this)}
                    hasMore={!isScollEnd && !loading}
                    loader={null}
                    useWindow={false}
                >
                    <div className="movie-list">
                        {movies.map((movie) => (
                            <Poster
                                key={movie.movieid}
                                identifier={movie.movieid}
                                title={movie.title}
                                plot={movie.plot}
                                url={movie.art.poster}
                            />
                        ))}
                        {[...Array(20).keys()].map((i) => <i key={i}></i>)}
                    </div>
                </InfiniteScroll>
                <div className="loading">
                    <Loader type="ball-pulse-sync" active={loading} innerClassName="elecodi-loader" />
                    <p className={classnames('scroll-to-end', { 'show': isScollEnd })}>
                        已经到底了
                    </p>
                </div>
            </div>
        )
    }
}
