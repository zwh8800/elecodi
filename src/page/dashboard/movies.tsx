import * as React from 'react';
import {
    SortMethod,
    SortOrder,
    Movie,
    getMovieLibrary
} from '@/api';
import { Button, message } from 'antd';
import Loader from 'react-loaders';
import classnames from 'classnames';

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
    curPage: number = 1;
    sortMethod: SortMethod = SortMethod.dateadded;
    sortOrder: SortOrder = SortOrder.Descending;

    constructor(props: Props) {
        super(props);
        this.state = new State();
        conf.onConfigChange(this.onConfChange.bind(this));
    }

    componentDidMount() {
        this.loadMovies();
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
        this.curPage = 1;
        this.sortMethod = SortMethod.dateadded;
        this.sortOrder = SortOrder.Descending;

        this.setState(new State());
        this.loadMovies();
    }

    onConfChange() {
        this.reset();
    }

    render() {
        return (
            <React.Fragment>
                <div className="movies-con">
                    {this.state.movies.map((movie) => (
                        <Poster
                            key={movie.movieid}
                            identifier={movie.movieid}
                            title={movie.title}
                            url={movie.art.poster}
                        />
                    ))}
                    {[...Array(20).keys()].map((i) => <i key={i}></i>)}
                </div>
                <div className="loading">
                    <Loader type="ball-pulse-sync" active={this.state.loading} innerClassName="movie-loader" />
                    <p className={classnames('scroll-to-end', { 'show': this.state.isScollEnd })}>
                        已经到底了
                    </p>
                </div>
                <Button onClick={this.nextPage.bind(this)}>
                    下一页
                </Button>
            </React.Fragment>
        )
    }
}
