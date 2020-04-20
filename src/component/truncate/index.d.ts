import * as React from 'react';

export interface TruncateProps extends React.HTMLProps<Truncate> {
    lines?: number | false;
    ellipsis?: React.ReactNode;
    trimWhitespace?: boolean;
    onTruncate?(isTruncated: boolean): void;
}

declare class Truncate extends React.Component<TruncateProps> { }
export default Truncate;