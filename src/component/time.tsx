import * as React from 'react';
import * as conf from '@/conf/elecodiConf';
import * as api from '@/api'

class TimeState {
    time: string;
    movies: api.Movie[];
}

export default class Time extends React.Component {
    state: TimeState = {
        time: '',
        movies: [],
    }

    getTime() {
        let date = new Date();
        let Year = date.getFullYear();
        let Month = date.getMonth();
        let Day = date.getDate();
        let Hour = date.getHours();
        let Minute = date.getMinutes();
        let Seconds = date.getSeconds();
        let time = Year + '年' + Month + '月' + Day + '日' + Hour + ':' + Minute + ':' + Seconds + conf.getConfig();
        return time;
    }

    componentDidMount() {
        let config = new conf.Config();
        config.playerCmd = 'hhhhhh';
        config.kodiHttpUrl = 'http://10.0.0.228:8081/jsonrpc';
        config.kodiWsUrl = 'ws://10.0.0.228:9090/jsonrpc'
        conf.setConfig(config);

        setInterval(() => {
            this.setState(() => {
                return {
                    time: this.getTime()
                }
            });
        }, 1000);
    }

    async onClick() {
        let moives = await api.getAllMovieForSearch();
        console.log('moives: ', moives);
        this.setState(() => {
            return {
                movies: moives.movies
            }
        });
    }

    render() {
        let timetext = this.state.time;
        return (
            <div>
                <h1>{timetext}</h1>
                <div>
                    {this.state.movies.map((movie) => (
                        <div key={movie.movieid}>
                            {movie.title}
                        </div>
                    ))}
                </div>

                <button onClick={this.onClick.bind(this)}>载入</button>
            </div >
        );
    }
}
