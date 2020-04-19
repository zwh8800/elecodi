import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Poster from '@/component/poster/poster';
import Summary from '@/component/summary/summary';
import {
    Movie
} from '@/api';

interface Props extends RouteComponentProps { }

function Detail(props: Props) {

    function onMediaClick() {

    }

    function onPlayClick() {

    }

    const [movie, setMovie] = useState(new Movie());


    return <div className="detail-con">
        {/* <Poster
            key={movie.movieid}
            identifier={movie.movieid}
            title={movie.title}
            plot={movie.plot}
            url={movie.art.poster}
            onClick={onMediaClick}
            onPlayClick={onPlayClick} /> */}
        <div style={{ width: '150px', height: '225px' }}></div>
        <Summary movie={movie} />
    </div>
}

export default Detail;