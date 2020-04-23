import * as React from 'react';
import moment from 'moment';
import { iso6393Name } from '@/util/lang';
import { Movie, Tvshow } from '@/api';
import Truncate from '@/component/truncate/truncate';
import './summary.scss';

interface Props {
    media: Movie & Tvshow
}

function Summary(props: Props) {

    function durationForamt(runtime: number) {
        let duration = moment.duration(runtime, 'seconds');
        if (duration.hours()) {
            return duration.hours() + '小时' + duration.minutes() + '分钟';
        }
        return duration.minutes() + '分钟';
    }

    const aspectList = [4 / 3, 16 / 9, 20 / 9, 21.5 / 9];
    const aspectStrList = ["4:3", "16:9", "20:9", "21.5:9"];

    function aspectFormat(aspect: number) {
        let minIndex = 0;
        let minDiff = 999999;
        for (let [i, a] of aspectList.entries()) {
            let diff = Math.abs(a - aspect);
            if (diff < minDiff) {
                minIndex = i;
                minDiff = diff;
            }
        }
        return aspectStrList[minIndex];
    }

    const dimensionList = [640, 1280, 1920, 3840];
    const dimensionStrList = ["SD", "720p", "1080p", "4k"];

    function dimensionFormat(width: number, height: number) {
        let minIndex = 0;
        let minDiff = 999999;
        for (let [i, d] of dimensionList.entries()) {
            let diff = Math.abs(d - width);
            if (diff < minDiff) {
                minIndex = i;
                minDiff = diff;
            }
        }
        return dimensionStrList[minIndex];
    }

    function audioFormat(channel: number) {
        switch (channel) {
            case 8:
                return "7.1";
            case 6:
                return "5.1";
            case 3:
                return "2.1";
            case 2:
            default:
                return "2.0";
            case 1:
                return "mono";
        }
    }

    const { title, originaltitle, year, runtime, lastplayed, rating, genre, director, country, imdbnumber, plot, streamdetails, studio } = props.media;

    return (
        <div className="summary">
            <div className="header">
                <div className="item item-first">
                    <p className="title">{title}</p>
                </div>
                <div className="item item-second">
                    <p className="originaltitle">{originaltitle}</p>
                    <p className="year">{year}</p>
                </div>
                <div className="item item-third">
                    <div>
                        <span className="duration">{durationForamt(runtime)}</span>
                        <span className="dot">·</span>
                        <span>{lastplayed ? '已播放' : '未播放'}</span>
                        <span className="tag-label">{rating ? `${rating.toFixed(1)} / 10` : '未评分'}</span>
                    </div>
                    <p className="right">{(genre || []).join(', ')}</p>

                </div>
            </div>
            <div className="divider" />
            <div className="content">
                <section className="section">
                    {
                        director && <div className="item">
                            <span className="label">导演</span>
                            <span className="value">{(director || []).join(', ')}</span>
                        </div>
                    }
                    {
                        country && <div className="item">
                            <span className="label">国家</span>
                            <span className="value">{(country || []).join(', ')}</span>
                        </div>
                    }
                    {
                        studio && <div className="item">
                            <span className="label">工作室</span>
                            <span className="value">{(studio || []).join(', ')}</span>
                        </div>
                    }
                    <div className="item">
                        <span className="label">IMDB</span>
                        <span className="value">{imdbnumber}</span>
                    </div>
                </section>
                {streamdetails ? (
                    <section className="section">
                        <div className="item">
                            <span className="label">视频</span>
                            <span className="value">
                                {
                                    streamdetails.video.length > 0 ?
                                        <React.Fragment>
                                            <span className="tag-label">
                                                {streamdetails.video[0].codec}
                                            </span>
                                            <span className="tag-label">
                                                {dimensionFormat(streamdetails.video[0].width, streamdetails.video[0].height)}
                                            </span>
                                            <span className="tag-label">
                                                {aspectFormat(streamdetails.video[0].aspect)}
                                            </span>
                                        </React.Fragment>
                                        : ""
                                }
                            </span>
                        </div>
                        <div className="item">
                            <span className="label">音频</span>
                            <span className="value">
                                {
                                    streamdetails.audio.map((audio, i) => <React.Fragment key={i}>
                                        <span className="tag-label">
                                            {audio.codec}
                                        </span>
                                        <span className="tag-label">
                                            {audioFormat(audio.channels)}
                                        </span>
                                        {
                                            iso6393Name(audio.language) ?
                                                <span className="tag-label">
                                                    {iso6393Name(audio.language)}
                                                </span>
                                                : ""
                                        }
                                        {
                                            i != streamdetails.audio.length - 1 ?
                                                <span className="tag-label-splitter"> | </span>
                                                : ""
                                        }
                                    </React.Fragment>
                                    )
                                }
                            </span>
                        </div>
                        <div className="item">
                            <span className="label">字幕</span>
                            <span className="value">
                                {
                                    streamdetails.subtitle.map((sub, i) => iso6393Name(sub.language) ? <span key={i} className="tag-label">
                                        {iso6393Name(sub.language)}
                                    </span> : ""
                                    )
                                }
                            </span>
                        </div>
                    </section>
                ) : ""}
                <section className="section introduction">
                    <Truncate lines={3} lineHeight={24} ellipsis="...">{plot}</Truncate>
                </section>
            </div>
        </div>
    )
}

export default Summary;