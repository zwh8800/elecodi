import * as React from 'react';
import { Movie } from '@/api';
import './summary.scss';

interface Props {
    movie: Movie
}

function Summary(props: Props) {
    const { } = props;
    return (
        <div className="summary">
            <div className="header">
                <div className="item item-first">
                    <p className="name">Navajo Joe</p>
                </div>
                <div className="item item-second">
                    <p className="year">1966</p>
                    <p className="right">right</p>
                </div>
                <div className="item item-third">
                    <p className="duration">78分钟</p>
                    <p className="right">document</p>
                </div>
            </div>
            <div className="divider" />
            <div className="content">
                <section className="section">
                    <div className="item">
                        <span className="label">导演</span>
                        <span className="value">22</span>
                    </div>
                    <div className="item">
                        <span className="label">写作</span>
                        <span className="value">222</span>
                    </div>
                    <div className="item">
                        <span className="label">演播室</span>
                        <span className="value">222</span>
                    </div>
                </section>
                <section className="section">
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
                </section>
                <section className="section introduction">
                    <p>The sole survivor of a bloody massacre vows revenge on his attackers and on the men who killed his wife.</p>
                </section>
            </div>
        </div>
    )
}

export default Summary;