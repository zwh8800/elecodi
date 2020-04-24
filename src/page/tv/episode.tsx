import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as conf from '@/conf/elecodiConf';
import Poster from '@/component/poster/poster';
import Cast from '@/component/cast/cast';
import Summary from '@/component/summary/summary';
import {
    Tvshow,
    Episode,
    getTvShowDetail,
    getEpisodesLibrary
} from '@/api';
import * as player from '@/player/player';

interface Props extends RouteComponentProps { }
interface RouteParam {
    id: string
    season: string
}
function Episodes(props: Props) {
    const [tvshow, setTvshow] = useState(null as Tvshow);
    const [episodes, setEpisodes] = useState([] as Episode[]);

    useEffect(() => {
        getDetail()
    }, []);

    async function getDetail() {
        let id = (props.match.params as RouteParam).id;
        let season = (props.match.params as RouteParam).season;
        let tvData = await getTvShowDetail(Number.parseInt(id));
        let episodeData = await getEpisodesLibrary(Number.parseInt(id), Number.parseInt(season));
        setTvshow(tvData.tvshowdetails);
        setEpisodes(episodeData.episodes);
    }

    function onPlayClick() {
        player.openPlayer(tvshow.file);
    }

    function transKodiImage(url: string) {
        url = encodeURIComponent(url);
        return conf.getConfig().kodiHttpUrl + '/image/' + url;
    }

    function onEpisodeClick(episode: Episode) {
        player.openPlayer(episode.file);
    }

    function onEpisodePlayClick(episode: Episode) {
        player.openPlayer(episode.file);
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
                {episodes && episodes.length > 0 && (<div className="seacons-con">
                    <h3>分集</h3>
                    <div className="seacons">
                        {
                            episodes.map(episode => {
                                return <Poster
                                    key={episode.episodeid}
                                    identifier={episode}
                                    title={episode.title}
                                    width={200}
                                    height={112}
                                    plot={episode.plot}
                                    url={episode.art.thumb || tvshow.art.poster}
                                    onClick={onEpisodeClick}
                                    onPlayClick={onEpisodePlayClick}
                                ></Poster>
                            })
                        }
                        {[...Array(20).keys()].map((i) => <i style={{ width: 200 }} key={i}></i>)}

                    </div>
                </div>)}
                <div className="row-second">
                    <Cast cast={tvshow.cast} />
                </div>
            </div>
        </div>
    ) : null

}

export default Episodes;
