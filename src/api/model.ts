export class GetMovieDetailsResp {
    moviedetails: Movie
}

export class GetMovieLibraryResp {
    limits: Limits;
    movies: Movie[];
}

export class Limits {
    end: number;
    start: number;
    total: number;
}

export class Movie {
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

export class Cast {
    name: string;
    order: number;
    role: string;
    thumbnail?: string;
}

export class Resume {
    position: number;
    total: number;
}

export class Streamdetails {
    audio: Audio[];
    subtitle: Subtitle[];
    video: Video[];
}

export class Audio {
    channels: number;
    codec: string;
    language: string;
}

export class Subtitle {
    language: string;
}

export class Video {
    aspect: number;
    codec: string;
    duration: number;
    height: number;
    stereomode: string;
    width: number;
}

export class GetTvShowLibraryResp {
    limits: Limits;
    tvshows: Tvshow[];
}

export class GetTvShowDetailResp {
    tvshowdetails: Tvshow;
}

export class Tvshow {
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

export class Art {
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

export class GetSeasonsLibraryResp {
    limits: Limits;
    seasons: Season[];
}

export class Season {
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

export class GetEpisodesLibraryResp {
    episodes: Episode[];
    limits: Limits;
}

export class Episode {
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
