import * as React from 'react';
import { SyntheticEvent, useState } from 'react';
import * as conf from '@/conf/elecodiConf';
import './poster.scss';
import classnames from 'classnames';

const WIDTH = 150;
const HEIGHT = 225;

interface Props {
    title: string;
    url: string;
    identifier: any;
    onClick?: (identifier: any) => void;
    onPlayClick?: (identifier: any) => void;
}

function Poster(props: Props) {
    let [imgStyle, setImgStyle] = useState({
        height: WIDTH,
        width: HEIGHT
    });
    let [maskWithBg, setMaskWithBg] = useState(false)

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
        if (imgWidth / imgHeight > WIDTH / HEIGHT) {
            setImgStyle({
                height: HEIGHT,
                width: undefined,
            })
        } else {
            setImgStyle({
                height: undefined,
                width: WIDTH,
            })
        }
    }

    function transKodiImage(url: string) {
        url = encodeURIComponent(url);
        return conf.getConfig().kodiHttpUrl + '/image/' + url;
    }

    return (
        <div className="poster">
            <div className="poster-img">
                <div onClick={onMaskClick} className={classnames('mask', { 'with-bg': maskWithBg })}>
                    <i onClick={onPlayClick} className="play-button iconfont icon-play"></i>
                </div>
                <img style={imgStyle} onLoad={onImgLoad} className="img" src={transKodiImage(props.url)}></img>
            </div>
            <p className="poster-title">
                {props.title}
            </p>
        </div >
    )
}

export default Poster;
