import * as React from 'react';
import { RouteItem } from '@/routes';
import { message, Dropdown, Menu, Switch } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { DownOutlined } from '@ant-design/icons';
import Loader from 'react-loaders';
import classnames from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';
import pinyin from 'tiny-pinyin';
import moment from 'moment';

import Poster from '@/component/poster/poster';
import * as conf from '@/conf/elecodiConf';
import {
    SortMethod,
    SortOrder,
    Movie,
    getMovieLibrary
} from '@/api';
import * as player from '@/player/player';

import '@/assets/style/media-list';

const PAGE_SIZE = 20;

class GroupInfo {
    name: string
}

class GroupMedia<M> {
    group: GroupInfo;
    media: M[];
}

type GroupMovie = GroupMedia<Movie>

interface Props {
    routes: RouteItem[]
}

class State {
    loading: boolean = false;
    isScollEnd: boolean = false;
    movieGroups: GroupMovie[] = [];
    sortMethod: SortMethod = SortMethod.sorttitle;
    sortOrder: SortOrder = SortOrder.Ascending;
}

export default class Movies extends React.Component<Props, State> {
    curPage: number = 0;
    movieBuffer: Movie[] = [];
    lastBufferLength: number = 0;
    shouldGrouping: boolean = true;

    constructor(props: Props) {
        super(props);
        this.state = new State();
        conf.onConfigChange(this.onConfChange.bind(this));
    }

    componentDidMount() {
        document.title = '电影 - ELECODI';
    }

    getGroup(by: SortMethod, movie: Movie): GroupInfo {
        switch (by) {
            case SortMethod.dateadded: {
                let date = new Date(movie.dateadded);
                return {
                    name: moment(date).format('YYYY-MM')
                }
            }

            case SortMethod.sorttitle: {
                if (!pinyin.isSupported()) {
                    return null;
                }
                let tokens = pinyin.parse(movie.title.substr(0, 1));
                if (tokens.length <= 0 || tokens[0].target.length <= 0) {
                    return null;
                }
                if (tokens[0].type != 2) {
                    return {
                        name: '#'
                    }
                }
                return {
                    name: tokens[0].target.substr(0, 1).toUpperCase()
                }
            }

            case SortMethod.lastplayed: {
                let date = new Date(movie.lastplayed);
                if (isNaN(date.getTime())) {
                    return {
                        name: '未播放'
                    }
                }
                return {
                    name: moment(date).format('YYYY-MM')
                }
            }

            default:
                return null;
        }
    }

    grouping(by: SortMethod, groupMovie: GroupMovie[], movies: Movie[]): GroupMovie[] {
        let lastGroup: GroupMovie;
        if (groupMovie.length == 0) {
            lastGroup = {
                group: null,
                media: []
            };
            groupMovie.push(lastGroup)
        } else {
            lastGroup = groupMovie[groupMovie.length - 1]
        }
        for (let movie of movies) {
            if (!movie) {
                continue
            }
            let group = this.getGroup(by, movie);
            if (group == null) {
                lastGroup.media.push(movie);
                continue;
            }
            if (lastGroup.group == null) {
                lastGroup.group = group;
            }
            if (group.name == lastGroup.group.name) {
                lastGroup.media.push(movie);
                continue;
            }
            lastGroup = {
                group: group,
                media: [movie]
            }
            groupMovie.push(lastGroup)
        }

        return groupMovie;
    }

    async loadMovies() {
        this.setState({
            loading: true
        })
        try {
            let movieResp = await getMovieLibrary({
                method: this.state.sortMethod,
                order: this.state.sortOrder
            }, this.curPage, PAGE_SIZE);
            if (movieResp.limits.end >= movieResp.limits.total) {
                this.setState({
                    isScollEnd: true
                })
            }
            for (let i = movieResp.limits.start; i < movieResp.limits.end; i++) {
                this.movieBuffer[i] = movieResp.movies[i - movieResp.limits.start];
            }
            if ((this.movieBuffer.length - this.lastBufferLength) == Object.keys(this.movieBuffer).length) {
                this.lastBufferLength = this.movieBuffer.length;
                let newMovies = this.grouping(this.shouldGrouping ? this.state.sortMethod : null, Array.of(...this.state.movieGroups), this.movieBuffer);
                this.movieBuffer = [];
                this.setState({
                    movieGroups: newMovies,
                })
            }

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
        this.lastBufferLength = 0;

        this.setState(new State());
        this.nextPage();
    }

    onConfChange() {
        this.reset();
    }

    onSorterMenuSelected(param: ClickParam) {
        this.curPage = 0;
        this.lastBufferLength = 0;

        if (Object.values(SortMethod).includes(param.key as SortMethod)) {
            this.setState({
                isScollEnd: false,
                movieGroups: [],
                sortMethod: param.key as SortMethod
            }, this.nextPage.bind(this));
        } else if (Object.values(SortOrder).includes(param.key as SortOrder)) {
            this.setState({
                isScollEnd: false,
                movieGroups: [],
                sortOrder: param.key as SortOrder
            }, this.nextPage.bind(this));
        }
    }

    onGroupSwitchChange(checked: boolean) {
        this.curPage = 0;
        this.lastBufferLength = 0;
        this.shouldGrouping = checked;
        this.setState({
            isScollEnd: false,
            movieGroups: [],
        }, this.nextPage.bind(this))
    }

    findMovieById(movieid: number) {
        for (let g of this.state.movieGroups) {
            for (let m of g.media) {
                if (m.movieid == movieid) {
                    return m;
                }
            }
        }
        return null;
    }

    onPlayClick(movieid: number) {
        let movie = this.findMovieById(movieid);
        if (movie == null) {
            message.warn('未找到电影id：' + movieid);
            return
        }
        player.openPlayer(movie.file);
    }

    render() {
        let { loading, isScollEnd, movieGroups, sortMethod, sortOrder } = this.state;

        const sorterMenu = (<Menu multiple={true} selectedKeys={[sortMethod, sortOrder]} onClick={this.onSorterMenuSelected.bind(this)}>
            <Menu.Item disabled={true} className="switch-item">
                <div>
                    分组
                </div>
                <Switch defaultChecked onChange={this.onGroupSwitchChange.bind(this)} />
            </Menu.Item>
            <Menu.ItemGroup key="method" title="方式">
                <Menu.Item key={SortMethod.dateadded}>
                    按添加顺序
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
            <div className="movie-con">
                <div className="top-bar">
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
                    {movieGroups.map((groupItem) => (
                        <div className="movie-list" key={groupItem.group ? groupItem.group.name : "default-group"}>
                            {groupItem.group ?
                                <div className="group-title">
                                    <span>{groupItem.group.name}</span>
                                </div> : null}

                            {groupItem.media.map((movie) => (
                                <Poster
                                    key={movie.movieid}
                                    identifier={movie.movieid}
                                    title={movie.title}
                                    plot={movie.plot}
                                    url={movie.art.poster}

                                    onPlayClick={this.onPlayClick.bind(this)}
                                />
                            ))}

                            {[...Array(20).keys()].map((i) => <i key={i}></i>)}
                        </div>

                    ))}
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
