export interface GetMovieLibraryResp {
    limits: Limits;
    movies: Movie[];
}

export interface Limits {
    end: number;
    start: number;
    total: number;
}

export interface Movie {
    art: Art;
    cast: Cast[];
    country: string[];
    dateadded: string;
    director: string[];
    fanart: string;
    file: string;
    genre: string[];
    imdbnumber: string;
    label: string;
    lastplayed: string;
    movieid: number;
    mpaa: string;
    originaltitle: string;
    playcount: number;
    plot: string;
    plotoutline: string;
    rating: number;
    resume: Resume;
    runtime: number;
    set: string;
    setid: number;
    showlink: any[];
    sorttitle: string;
    streamdetails: Streamdetails;
    studio: string[];
    tag: string[];
    tagline: string;
    thumbnail: string;
    title: string;
    top250: number;
    trailer: string;
    userrating: number;
    votes: string;
    writer: string[];
    year: number;
}

export interface Cast {
    name: string;
    order: number;
    role: string;
    thumbnail?: string;
}

export interface Resume {
    position: number;
    total: number;
}

export interface Streamdetails {
    audio: Audio[];
    subtitle: Subtitle[];
    video: Video[];
}

export interface Audio {
    channels: number;
    codec: string;
    language: string;
}

export interface Subtitle {
    language: string;
}

export interface Video {
    aspect: number;
    codec: string;
    duration: number;
    height: number;
    stereomode: string;
    width: number;
}

export interface GetTvShowLibraryResp {
    limits: Limits;
    tvshows: Tvshow[];
}

export interface Tvshow {
    art: Art;
    cast: Cast[];
    dateadded: string;
    episode: number;
    episodeguide: string;
    fanart: string;
    file: string;
    genre: string[];
    imdbnumber: string;
    label: string;
    lastplayed: string;
    mpaa: string;
    originaltitle: string;
    playcount: number;
    plot: string;
    premiered: string;
    rating: number;
    season: number;
    sorttitle: string;
    studio: string[];
    tag: any[];
    thumbnail: string;
    title: string;
    tvshowid: number;
    userrating: number;
    votes: string;
    watchedepisodes: number;
    year: number;
}

export interface Art {
    poster: string;
    fanart?: string;
    banner?: string;
    thumb?: string;
    "season.poster"?: string;   // in seasons
    "season.banner"?: string;   // in seasons
    "season.thumb"?: string;    // in seasons
    "tvshow.banner"?: string;   // in seasons
    "tvshow.fanart"?: string;   // in seasons
    "tvshow.poster"?: string;   // in seasons
    "tvshow.thumb"?: string;    // in seasons
}

export interface GetSeasonsLibraryResp {
    limits: Limits;
    seasons: Season[];
}

export interface Season {
    art: Art;
    episode: number;
    fanart: string;
    label: string;
    playcount: number;
    season: number;
    seasonid: number;
    showtitle: string;
    thumbnail: string;
    tvshowid: number;
    watchedepisodes: number;
}

export interface GetEpisodesLibraryResp {
    episodes: Episode[];
    limits: Limits;
}

export interface Episode {
    art: Art;
    cast: Cast[];
    dateadded: string;
    director: string[];
    episode: number;
    episodeid: number;
    fanart: string;
    file: string;
    firstaired: string;
    label: string;
    lastplayed: string;
    originaltitle: string;
    playcount: number;
    plot: string;
    productioncode: string;
    rating: number;
    resume: Resume;
    runtime: number;
    season: number;
    seasonid: number;
    showtitle: string;
    specialsortepisode: number;
    specialsortseason: number;
    streamdetails: Streamdetails;
    thumbnail: string;
    title: string;
    tvshowid: number;
    userrating: number;
    votes: string;
    writer: string[];
}
