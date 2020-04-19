import * as React from 'react';
import { SyntheticEvent, useState } from 'react';
import * as conf from '@/conf/elecodiConf';
import './poster.scss';
import classnames from 'classnames';
import { Tooltip } from 'antd';

const DEFAULT_IMG_WIDTH = 150;
const DEFAULT_IMG_HEIGHT = 225;
const DEFAULT_TITLE_HEIGHT = 20;

interface Props {
    title: string;
    plot?: string;
    url: string;
    identifier: any;
    width?: number;
    height?: number

    onClick?: (identifier: any) => void;
    onPlayClick?: (identifier: any) => void;
}

function Poster(props: Props) {
    let width = props.width, height = props.height;
    if (!width) {
        width = DEFAULT_IMG_WIDTH;
    }
    if (!height) {
        height = DEFAULT_IMG_HEIGHT;
    }

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
        if (imgWidth / imgHeight > width / height) {
            setImgStyle({
                width: undefined,
                height: height,
            })
        } else {
            setImgStyle({
                width: width,
                height: undefined,
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

    let jsxImg = <div className="poster-img">
        <div className={classnames('mask', { 'with-bg': maskWithBg })} style={{ width: width, height: height }}>
            <i onClick={onPlayClick} className="play-button iconfont icon-play"></i>
        </div>
        <img onClick={onMaskClick} style={imgStyle} onLoad={onImgLoad} className="img" src={transKodiImage(props.url)}></img>
    </div>;

    let jsxTitle = <p onClick={onMaskClick} className="poster-title" style={{ width: width, height: DEFAULT_TITLE_HEIGHT }}>
        {props.title}
    </p>;

    return (
        <div className="poster">
            {
                <Tooltip placement="right" title={plot} mouseEnterDelay={2}>
                    {jsxImg}
                </Tooltip>
            }
            {
                <Tooltip placement="bottom" title={props.title.length > 10 ? props.title : ''}>
                    {jsxTitle}
                </Tooltip>
            }

        </div >
    )
}

export default Poster;
