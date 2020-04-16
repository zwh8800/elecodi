import * as React from 'react';
import {
    SortMethod,
    SortOrder,
    Movie,
    getMovieLibrary
} from '@/api';
import { Button, message } from 'antd';

import Poster from '@/component/poster';

const PAGE_SIZE = 20;

interface Props {

}

class State {
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
    }

    componentDidMount() {
        this.loadMovies();
    }

    async loadMovies() {
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
            // POPUP ERROR
        }
    }

    nextPage() {
        if (this.state.isScollEnd) {
            message.info('已经到底了');
            return;
        }
        this.curPage++;
        this.loadMovies();
    }

    render() {
        return (
            <div>
                <h1>movies</h1>
                <div>
                    {this.state.movies.map((movie) => (
                        <Poster
                            key={movie.movieid}
                            identifier={movie.movieid}
                            title={movie.title}
                            url={movie.art.poster}
                        />
                    ))}
                </div>
                <Button onClick={this.nextPage.bind(this)}>
                    下一页
                </Button>
            </div>
        )
    }
}
