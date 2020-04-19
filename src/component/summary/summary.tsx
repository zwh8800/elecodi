import * as React from 'react';
import { Movie } from '@/api';
import moment from 'moment';
import './summary.scss';

interface Props {
    movie: Movie
}


function Summary(props: Props) {

    function durationForamt(runtime: number) {
        let duration = moment.duration(runtime, 'seconds');
        if (duration.hours()) {
            return duration.hours() + '小时' + duration.minutes() + '分钟';
        }
        return duration.minutes() + '分钟';
    }

    const { title, originaltitle, year, runtime, lastplayed, rating, genre, director, country, imdbnumber, plot } = props.movie;


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
                        <span className="rate">{rating ? `${rating}/10` : '未评分'}</span>
                    </div>
                    <p className="right">{(genre || []).join(',')}</p>

                </div>
            </div>
            <div className="divider" />
            <div className="content">
                <section className="section">
                    <div className="item">
                        <span className="label">导演</span>
                        <span className="value">{(director || []).join(',')}</span>
                    </div>
                    <div className="item">
                        <span className="label">国家</span>
                        <span className="value">{(country || []).join(',')}</span>
                    </div>
                    <div className="item">
                        <span className="label">IMDB</span>
                        <span className="value">{imdbnumber}</span>
                    </div>
                </section>
                {/* <section className="section">
                    <div className="item">
                        <span className="label">视频</span>
                        <span className="value">222</span>
                    </div>
                    <div className="item">
                        <span className="label">音频</span>
                        <span className="value">22</span>
                    </div>
                    <div className="item">
                        <span className="label">字幕</span>
                        <span className="value">22</span>
                    </div>
                </section> */}
                <section className="section introduction">
                    <p>{plot}</p>
                </section>
            </div>
        </div>
    )
}

export default Summary;