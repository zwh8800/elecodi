import * as React from 'react';
import { SyntheticEvent, useEffect, useState } from 'react';

const WIDTH = 150;
const HEIGHT = 200;

interface Props {
    title: string;
    url: string;
    identifier: any;
    onClick?: (identifier: any) => void;
    onPlayClick?: (identifier: any) => void;
}

const Poster = (props: Props) => {
    let [imgStyle, setImgStyle] = useState({
        height: 0,
        width: 0
    });

    const onMaskClick = () => {
        if (props.onClick)
            props.onClick(props.identifier);
    }

    const onPlayClick = () => {
        if (props.onPlayClick)
            props.onPlayClick(props.identifier);
    }

    const onImgLoad = (e: SyntheticEvent<HTMLImageElement>) => {
        let imgHeight = e.currentTarget.height;
        let imgWidth = e.currentTarget.height;
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

    return (
        <div className="poster">
            <div className="poster-img">
                <div onClick={onMaskClick} className="mask">
                    <i onClick={onPlayClick} className="play-button iconfont icon-play" style={{ fontSize: '25px' }}></i>
                </div>
                <img style={imgStyle} onLoad={onImgLoad} className="img" src={props.url}></img>
            </div>
            <p className="poster-title">
                {props.title}
            </p>
        </div>
    )
}

export default Poster;
