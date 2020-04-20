import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as conf from '@/conf/elecodiConf';
import Poster from '@/component/poster/poster';
import Cast from '@/component/cast/cast';
import Summary from '@/component/summary/summary';
import {
    Movie,
    getMovieDetail
} from '@/api';
import * as player from '@/player/player';

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
        setMovie(movie.moviedetails);
    }

    function onPlayClick(movieid: number) {
        player.openPlayer(movie.file);
    }

    function transKodiImage(url: string) {
        url = encodeURIComponent(url);
        return conf.getConfig().kodiHttpUrl + '/image/' + url;
    }


    return movie ? (<div
        className="detail-con"
        style={{ backgroundImage: movie.art.fanart ? `url('${transKodiImage(movie.art.fanart)}')` : undefined }}>
        <div className="detail-scroll-con">
            <div className="row-first">
                <Poster
                    key={movie.movieid}
                    identifier={movie.movieid}
                    title={movie.title}
                    width={200}
                    height={300}
                    url={movie.art.poster}
                    onClick={onPlayClick}
                    onPlayClick={onPlayClick} />
                <Summary movie={movie} />
            </div>
            <div className="row-second">
                <Cast cast={movie.cast} />
            </div>
        </div>
    </div>
    ) : null

}

export default Detail;