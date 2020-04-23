import * as React from 'react';
import { useState, useEffect } from 'react';
import './truncate.scss';

interface Props {
    children: React.ReactNode;
    ellipsis?: string;
    lines: number;
    lineHeight: number;
}

class Style {
    height: string = 'initial';
    overflow?: string
}
function Truncate(props: Props) {
    let collapseHeight = Math.floor(props.lineHeight * props.lines);
    const [style, setStyle] = useState(new Style());
    const [truncated, setTruncated] = useState(false);
    const [expanded, setExpanded] = useState(false);

    let textRef: React.RefObject<HTMLSpanElement> = React.createRef();

    function calTargetHeight() {
        if (expanded) {
            return;
        }

        let currentHeight = Math.floor(textRef.current.getBoundingClientRect().height);
        if (currentHeight > collapseHeight) {
            if (style.height !== collapseHeight + 'px') {
                setStyle({
                    height: collapseHeight + 'px',
                    overflow: 'hidden'
                })
            }
            setTruncated(true);
            setExpanded(false);
        } else {
            setTruncated(false);
        }
    }

    function truncate(expandState: boolean) {
        setExpanded(expandState);
        if (expandState) {
            setStyle({
                height: 'initial'
            })
        } else {
            setStyle({
                height: collapseHeight + 'px',
                overflow: 'hidden'
            })
        }
    }

    useEffect(() => {
        calTargetHeight();

        let resizeListener = () => window.requestAnimationFrame(() => calTargetHeight());
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    }, [textRef])
    return (
        <div className="truncate-con">
            <div style={style}>
                <span onClick={() => truncate(true)} ref={textRef} style={{ 'cursor': !expanded ? 'pointer' : 'initial' }} >{props.children}</span>
            </div>
            {
                truncated && expanded && (
                    <span onClick={() => truncate(false)} className="ellipsis" style={{ lineHeight: props.lineHeight + 'px' }}>收起</span>
                )
            }
            {
                truncated && !expanded && (
                    <span onClick={() => truncate(true)} className="ellipsis">{props.ellipsis}</span>
                )
            }
        </div>
    )
}

export default Truncate;