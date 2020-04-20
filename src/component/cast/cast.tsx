import * as React from 'react';
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
function Cast(props: Props) {
    function transKodiImage(url: string) {
        url = encodeURIComponent(url);
        return conf.getConfig().kodiHttpUrl + '/image/' + url;
    }

    function transPicName(name: string) {
        let words = name.split(' ');
        return words.map(v => v.charAt(0));
    }

    const { cast } = props;

    if (!cast || cast.length == 0) {
        return null
    }
    return (
        <div className="cast-con">
            <h3>演员表</h3>
            <div className="list">
                {
                    cast.map((item, i) => {
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