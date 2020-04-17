import * as React from 'react';
import {
    SortMethod,
    SortOrder,
    Movie,
    getMovieLibrary
} from '@/api';
import { message } from 'antd';
import Loader from 'react-loaders';
import classnames from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';

import Poster from '@/component/poster/poster';
import * as conf from '@/conf/elecodiConf';

const PAGE_SIZE = 20;

interface Props { }

class State {
    loading: boolean = false;
    isScollEnd: boolean = false;
    movies: Movie[] = [];
}

export default class Movies extends React.Component<Props, State> {
    curPage: number = 0;
    sortMethod: SortMethod = SortMethod.dateadded;
    sortOrder: SortOrder = SortOrder.Descending;

    constructor(props: Props) {
        super(props);
        this.state = new State();
        conf.onConfigChange(this.onConfChange.bind(this));
    }

    async loadMovies() {
        this.setState({
            loading: true
        })
        try {
            let movies = await getMovieLibrary({
                method: this.sortMethod,
                order: this.sortOrder
            }, this.curPage, PAGE_SIZE);
            if (movies.limits.end >= movies.limits.total) {
                this.setState({
                    isScollEnd: true
                })
            }
            this.state.movies.push(...movies.movies);
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
        this.sortMethod = SortMethod.dateadded;
        this.sortOrder = SortOrder.Descending;

        this.setState(new State());
        this.nextPage();
    }

    onConfChange() {
        this.reset();
    }

    render() {
        let { loading, isScollEnd, movies } = this.state;
        return (
            <React.Fragment>
                <InfiniteScroll
                    initialLoad={true}
                    pageStart={1}
                    loadMore={this.nextPage.bind(this)}
                    hasMore={!isScollEnd && !loading}
                    loader={null}
                    useWindow={false}
                >
                    <div className="movies-con">
                        {movies.map((movie) => (
                            <Poster
                                key={movie.movieid}
                                identifier={movie.movieid}
                                title={movie.title}
                                url={movie.art.poster}
                            />
                        ))}
                        {[...Array(20).keys()].map((i) => <i key={i}></i>)}
                    </div>
                </InfiniteScroll>
                <div className="loading">
                    <Loader type="ball-pulse-sync" active={loading} innerClassName="movie-loader" />
                    <p className={classnames('scroll-to-end', { 'show': isScollEnd })}>
                        已经到底了
                    </p>
                </div>
            </React.Fragment>
        )
    }
}
