import * as React from 'react';
import { useState, useEffect } from 'react';
import * as conf from '@/conf/elecodiConf';
import './cast.scss';

export class CastItem {
    name: string;
    order: number;
    role: string;
    thumbnail?: string;
}

interface Props {
    cast: CastItem[]
}

const DEFAULT_CAST_WIDTH = 150;

function Cast(props: Props) {
    let listRef: React.RefObject<HTMLDivElement> = React.createRef();
    let init = false;
    const [position, setPosition] = useState(0);
    const [currentCast, setCurrentCast] = useState([]);
    const [itemInLine, setItemInLine] = useState(0);
    const [preDisabled, setPreDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(true);
    const { cast } = props;

    function transKodiImage(url: string) {
        url = encodeURIComponent(url);
        return conf.getConfig().kodiHttpUrl + '/image/' + url;
    }

    function transPicName(name: string) {
        let words = name.split(' ');
        return words.map(v => v.charAt(0));
    }

    function calCurrentCaset() {
        const conWidth = Math.floor(listRef.current.getBoundingClientRect().width);
        const number = Math.floor(conWidth / DEFAULT_CAST_WIDTH);
        const _currentCast = props.cast.slice(0, number);

        console.log(init)
        if (!init) {
            init = true;
            setItemInLine(number);
            setCurrentCast(_currentCast);
            setPosition(number);
        }

        // if (number < cast.length && nextDisabled) {
        //     setNextDisabled(false);
        // }
        // if (number >= cast.length) {
        //     preDisabled && setPreDisabled(false);
        //     nextDisabled && setNextDisabled(false);
        // }
    }

    function preview() {
        if (preDisabled) {
            return;
        }
        if (position - itemInLine > -itemInLine) {
            const _currentCast = props.cast.slice(position - 2 * itemInLine, position - itemInLine);
            setPosition(position - itemInLine);
            setCurrentCast(_currentCast);
            nextDisabled && setNextDisabled(false);
            if (position - 2 * itemInLine <= 0) {
                setPreDisabled(true);
            }
        }
    }

    function next() {
        if (nextDisabled) {
            return;
        }
        if (position <= cast.length) {
            const _currentCast = props.cast.slice(position, position + itemInLine);
            setPosition(position + itemInLine);
            setCurrentCast(_currentCast);
            preDisabled && setPreDisabled(false);
            if (position + itemInLine >= cast.length) {
                setNextDisabled(true);
            }
        }
    }

    useEffect(() => {
        calCurrentCaset();

        let resizeListener = () => {
            return window.requestAnimationFrame(() => {
                init = false;
                calCurrentCaset();
            })
        };

        window.addEventListener('resize', resizeListener);
        return (
            window.removeEventListener('resize', resizeListener)
        )
    }, []);

    if (!cast || cast.length == 0) {
        return null
    }
    console.log('render')
    return (
        <div className="cast-con">
            <h3>演员表</h3>
            {
                (!preDisabled || !nextDisabled) && (
                    <div className="switch">
                        <span onClick={() => preview()} className={preDisabled ? 'disabled' : ''}><i className="iconfont icon-left"></i></span>
                        <span onClick={() => next()} className={nextDisabled ? 'disabled' : ''}><i className="iconfont icon-right"></i></span>
                    </div>
                )
            }
            <div className="list" ref={listRef}>
                {
                    currentCast.map((item, i) => {
                        return (
                            <div key={i} className="item">
                                <div className="avatar" style={{ backgroundImage: `url('${transKodiImage(item.thumbnail)}')` }} >
                                    {
                                        item.thumbnail ? '' : transPicName(item.name)
                                    }
                                </div>
                                <p className="name">{item.name}</p>
                                <p className="role">{item.role}</p>
                            </div>
                        )
                    })
                }
                {[...Array(20).keys()].map((i) => <i key={i}></i>)}
            </div>
        </div>
    )
}

export default Cast;