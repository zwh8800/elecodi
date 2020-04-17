import * as React from 'react';
import { SyntheticEvent, useState } from 'react';
import * as conf from '@/conf/elecodiConf';
import './poster.scss';
import classnames from 'classnames';
import { Tooltip } from 'antd';

const IMG_WIDTH = 150;
const IMG_HEIGHT = 225;

interface Props {
    title: string;
    plot?: string;
    url: string;
    identifier: any;
    onClick?: (identifier: any) => void;
    onPlayClick?: (identifier: any) => void;
}

function Poster(props: Props) {
    let [imgStyle, setImgStyle] = useState({
        height: 0,
        width: 0
    });
    let [maskWithBg, setMaskWithBg] = useState(false);

    function onMaskClick() {
        if (props.onClick)
            props.onClick(props.identifier);
    }

    function onPlayClick() {
        if (props.onPlayClick)
            props.onPlayClick(props.identifier);
    }

    function onImgLoad(e: SyntheticEvent<HTMLImageElement>) {
        setMaskWithBg(true);
        let imgHeight = e.currentTarget.naturalHeight;
        let imgWidth = e.currentTarget.naturalWidth;
        if (imgWidth / imgHeight > IMG_WIDTH / IMG_HEIGHT) {
            setImgStyle({
                height: IMG_HEIGHT,
                width: undefined,
            })
        } else {
            setImgStyle({
                height: undefined,
                width: IMG_WIDTH,
            })
        }
    }

    function transKodiImage(url: string) {
        url = encodeURIComponent(url);
        return conf.getConfig().kodiHttpUrl + '/image/' + url;
    }

    function transPlot(plot?: string) {
        if (!plot) {
            return plot;
        }
        if (plot.length > 140) {
            return plot.substr(0, 140) + '…';
        }
        return plot;
    }

    let plot = transPlot(props.plot);

    let jsxTitle = <p className="poster-title">
        {props.title}
    </p>;

    let jsxImg = <div className="poster-img">
        <div onClick={onMaskClick} className={classnames('mask', { 'with-bg': maskWithBg })}>
            <i onClick={onPlayClick} className="play-button iconfont icon-play"></i>
        </div>
        <img style={imgStyle} onLoad={onImgLoad} className="img" src={transKodiImage(props.url)}></img>
    </div>;

    return (
        <div className="poster">
            {
                plot ?
                    <Tooltip placement="right" title={plot} mouseEnterDelay={2}>
                        {jsxImg}
                    </Tooltip> : jsxImg
            }
            {
                props.title.length > 10 ?
                    <Tooltip placement="bottom" title={props.title}>
                        {jsxTitle}
                    </Tooltip> : jsxTitle
            }

        </div >
    )
}

export default Poster;
