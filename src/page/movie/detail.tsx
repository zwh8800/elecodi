import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Poster from '@/component/poster/poster';
import Cast from '@/component/cast/cast';
import Summary from '@/component/summary/summary';
import {
    Movie,
    getMovieDetail
} from '@/api';

interface Props extends RouteComponentProps { }
interface RouteParam {
    id: string
}
function Detail(props: Props) {
    const [movie, setMovie] = useState(null as Movie);

    useEffect(() => { getDetail() }, []);

    async function getDetail() {
        let movieid = (props.match.params as RouteParam).id;
        let movie = await getMovieDetail(Number.parseInt(movieid));
        console.log(movie)
        setMovie(movie.moviedetails);
    }

    function onMediaClick() {

    }

    function onPlayClick() {

    }

    return <div className="detail-con">
        {
            movie ? (
                <React.Fragment>
                    <div className="row-first">
                        <Poster
                            key={movie.movieid}
                            identifier={movie.movieid}
                            title={movie.title}
                            plot={movie.plot}
                            width={200}
                            height={300}
                            url={movie.art.poster}
                            onClick={onMediaClick}
                            onPlayClick={onPlayClick} />
                        <Summary movie={movie} />
                    </div>
                    <div className="row-second">
                        <Cast cast={movie.cast} />
                    </div>
                </React.Fragment>
            ) : null
        }
    </div>
}

export default Detail;