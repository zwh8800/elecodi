import * as React from 'react';

type ElectronFile = File & { path: string };

interface Props {
    onChange: (path: string) => void;
}

const FileSelect = (props: Props) => {
    function onChange(e: React.SyntheticEvent<HTMLInputElement>) {
        if (e.currentTarget.files.length > 0) {
            let f = e.currentTarget.files[0] as ElectronFile;
            props.onChange(f.path);
        }
    }

    return (
        <input type="file" onChange={onChange} />
    )
}

export default FileSelect;
