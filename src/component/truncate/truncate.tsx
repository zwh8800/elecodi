import * as React from 'react';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

class Props {
    children: React.ReactNode;
    ellipsis?: string = '...';
    lines: number;
    lineHeight: number;
    // onTruncate?: (truncate: boolean) => void
}


function Truncate(props: Props) {
    const [height, setHeight] = useState('initial');
    let textRef: React.RefObject<HTMLDivElement> = React.createRef();

    function calTargetHeight() {
        const { lines, lineHeight } = props;
        if (!textRef.current) {
            return;
        }
        let currentHeight = Math.floor(textRef.current.getBoundingClientRect().height);
        const collapseHeight = Math.floor(lineHeight * lines);
        if (currentHeight > collapseHeight) {
            setHeight(Math.floor(lineHeight * lines) + 'px');
        }
    }

    useEffect(() => {
        calTargetHeight();

        let resizeListener = debounce(calTargetHeight, 100)
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    }, [])

    return (
        <React.Fragment>
            <div ref={textRef} style={{ height: height, overflow: 'hidden' }}>
                {props.children}
            </div>
            <span>{props.ellipsis}</span>
        </React.Fragment>
    )
}

export default Truncate;