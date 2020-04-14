import * as React from 'react';
import {
    getElecodiConfig,
    setElecodiConfig,
    ElecodiConfig
} from '@/conf/elecodiConf'

class Time extends React.Component {
    state = {
        time: ''
    }
    getTime() {
        let date = new Date();
        let Year = date.getFullYear();
        let Month = date.getMonth();
        let Day = date.getDate();
        let Hour = date.getHours();
        let Minute = date.getMinutes();
        let Seconds = date.getSeconds();
        let time = Year + '年' + Month + '月' + Day + '日' + Hour + ':' + Minute + ':' + Seconds + getElecodiConfig();
        return time;
    }
    componentDidMount() {
        debugger
        let config = new ElecodiConfig();
        config.playerCmd = 'hhhhhh';
        setElecodiConfig(config);

        setInterval(() => {
            this.setState(() => {
                return {
                    time: this.getTime()
                }
            });
        }, 1000);
    }
    render() {
        let timetext = this.state.time;
        return (
            <div>
                <h1>{timetext}</h1>
            </div>
        );
    }
}
export default Time;
