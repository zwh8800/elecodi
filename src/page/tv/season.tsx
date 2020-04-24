import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as conf from '@/conf/elecodiConf';
import Poster from '@/component/poster/poster';
import Cast from '@/component/cast/cast';
import Summary from '@/component/summary/summary';
import {
    Tvshow,
    Season,
    getTvShowDetail,
    getSeasonsLibrary
} from '@/api';
import * as player from '@/player/player';

interface Props extends RouteComponentProps { }
interface RouteParam {
    id: string
}
function Detail(props: Props) {
    const [tvshow, setTvshow] = useState(null as Tvshow);
    const [seasons, setSeacons] = useState(null as Season[]);

    useEffect(() => {
        getDetail()
    }, []);

    async function getDetail() {
        let id = (props.match.params as RouteParam).id;
        let tvData = await getTvShowDetail(Number.parseInt(id));
        let seasonData = await getSeasonsLibrary(Number.parseInt(id));
        if (seasonData.limits.total == 1) {
            props.history.replace(`/tv/${id}/season/1`);
        }
        setTvshow(tvData.tvshowdetails);
        setSeacons(seasonData.seasons);
    }

    function onPlayClick() {
        player.openPlayer(tvshow.file);
    }

    function transKodiImage(url: string) {
        url = encodeURIComponent(url);
        return conf.getConfig().kodiHttpUrl + '/image/' + url;
    }

    function onSeaconClick(season: Season) {
        props.history.push(`/tv/${tvshow.tvshowid}/season/${season.season}`);
    }

    function onSeaconPlayClick(season: Season) {
        props.history.push(`/tv/${tvshow.tvshowid}/season/${season.season}`);
    }

    return tvshow ? (
        <div
            className="detail-con"
            style={{ backgroundImage: tvshow.art.fanart ? `url('${transKodiImage(tvshow.art.fanart)}')` : undefined }}>
            <div className="detail-scroll-con">
                <div className="row-first">
                    <Poster
                        key={tvshow.tvshowid}
                        identifier={tvshow.tvshowid}
                        title={tvshow.title}
                        width={200}
                        height={300}
                        url={tvshow.art.poster}
                        onClick={onPlayClick}
                        onPlayClick={onPlayClick} />
                    <Summary media={tvshow} />
                </div>
                {seasons && seasons.length > 0 && (<div className="seacons-con">
                    <h3>分季</h3>
                    <div className="seacons">
                        {
                            seasons.map(season => {
                                return <Poster
                                    key={season.seasonid}
                                    identifier={season}
                                    title={season.label}
                                    width={150}
                                    height={225}
                                    url={season.art.poster || tvshow.art.poster}
                                    onClick={onSeaconClick}
                                    onPlayClick={onSeaconPlayClick}
                                ></Poster>
                            })
                        }
                        {[...Array(20).keys()].map((i) => <i style={{ width: 150 }} key={i}></i>)}

                    </div>
                </div>)}
                <div className="row-second">
                    <Cast cast={tvshow.cast} />
                </div>
            </div>
        </div>
    ) : null

}

export default Detail;