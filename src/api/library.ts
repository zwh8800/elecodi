import { kodiServer } from './jsonrpc';
import {
    GetMovieLibraryResp,
    GetTvShowLibraryResp,
    GetSeasonsLibraryResp,
    GetEpisodesLibraryResp
} from './model';

export enum SortOrder {
    Ascending = 'ascending',
    Descending = 'descending'
}

export enum SortMethod {
    none = "none", label = "label", date = "date", size = "size", file = "file",
    path = "path", drivetype = "drivetype", title = "title", track = "track",
    time = "time", artist = "artist", album = "album", albumtype = "albumtype",
    genre = "genre", country = "country", year = "year", rating = "rating", votes = "votes",
    top250 = "top250", programcount = "programcount", playlist = "playlist", episode = "episode",
    season = "season", totalepisodes = "totalepisodes", watchedepisodes = "watchedepisodes",
    tvshowstatus = "tvshowstatus", tvshowtitle = "tvshowtitle", sorttitle = "sorttitle",
    productioncode = "productioncode", mpaa = "mpaa", studio = "studio", dateadded = "dateadded",
    lastplayed = "lastplayed", playcount = "playcount", listeners = "listeners", bitrate = "bitrate",
    random = "random"
}

export interface Sort {
    ignorearticle?: boolean
    method?: SortMethod
    order?: SortOrder
}

const movieListProperties = ["title", "plot", "lastplayed", "file", "sorttitle", "dateadded", "art"];

const movieProperties = ["title", "genre", "year", "rating", "director", "trailer",
    "tagline", "plot", "plotoutline", "originaltitle", "lastplayed", "playcount", "writer",
    "studio", "mpaa", "cast", "country", "imdbnumber", "runtime", "set", "streamdetails",
    "top250", "votes", "fanart", "thumbnail", "file", "sorttitle", "resume", "setid", "dateadded",
    "art", "userrating"];

const tvShowProperties = ["title", "genre", "year", "rating", "plot", "studio",
    "mpaa", "cast", "playcount", "episode", "imdbnumber", "premiered", "votes",
    "lastplayed", "fanart", "thumbnail", "file", "originaltitle", "sorttitle",
    "episodeguide", "season", "watchedepisodes", "dateadded", "art", "userrating"];

const searchProperties = ["title", "originaltitle", "plot"];

const seasonsProperties = ["season", "showtitle", "playcount", "episode", "fanart",
    "thumbnail", "tvshowid", "watchedepisodes", "art"];

const episodesProperties = ["title", "plot", "votes", "rating", "writer", "firstaired",
    "playcount", "runtime", "director", "productioncode", "season", "episode", "originaltitle",
    "showtitle", "cast", "streamdetails", "lastplayed", "fanart", "thumbnail", "file", "resume", "tvshowid",
    "dateadded", "art", "specialsortseason", "specialsortepisode", "userrating", "seasonid"]

function pager(page?: number, pageSize?: number) {
    let start: number, end: number;
    if (!page || !pageSize) {
        start = 0;
        end = undefined;
    } else {
        start = (page - 1) * pageSize;
        end = page * pageSize;
    }
    return [start, end]
}

export function getAllMovieForSearch(): PromiseLike<GetMovieLibraryResp> {
    return kodiServer.request('VideoLibrary.GetMovies', {
        properties: searchProperties,
        limits: {
            start: 0
        }
    })
}

export function getAllTvShowForSearch(): PromiseLike<GetTvShowLibraryResp> {
    return kodiServer.request('VideoLibrary.GetTvShows', {
        properties: searchProperties,
        limits: {
            start: 0
        }
    })
}

export function getMovieLibrary(sort?: Sort, page?: number, pageSize?: number): PromiseLike<GetMovieLibraryResp> {
    let [start, end] = pager(page, pageSize);

    return kodiServer.request('VideoLibrary.GetMovies', {
        properties: movieListProperties,
        limits: {
            start: start,
            end: end
        },
        sort: sort,
    })
}

export function getMovieDetail(movieid: number): PromiseLike<GetMovieLibraryResp> {
    return kodiServer.request('VideoLibrary.GetMovieDetails', {
        movieid: movieid,
        properties: movieProperties,
    })
}

export function getTvShowLibrary(sort?: Sort, page?: number, pageSize?: number): PromiseLike<GetTvShowLibraryResp> {
    let [start, end] = pager(page, pageSize);

    return kodiServer.request('VideoLibrary.GetTvShows', {
        properties: tvShowProperties,
        sort: sort,
        limits: {
            start: start,
            end: end
        },
    })
}

export function getSeasonsLibrary(tvShowId: number, sort?: Sort): PromiseLike<GetSeasonsLibraryResp> {
    return kodiServer.request('VideoLibrary.GetSeasons', {
        tvshowid: tvShowId,
        properties: seasonsProperties,
        sort: sort
    })
}

export function getEpisodesLibrary(tvShowId: number, season: number, sort?: Sort, page?: number, pageSize?: number): PromiseLike<GetEpisodesLibraryResp> {
    let [start, end] = pager(page, pageSize);

    return kodiServer.request('VideoLibrary.GetEpisodes', {
        tvshowid: tvShowId,
        season: season,
        sort: sort,
        properties: episodesProperties,
        limits: {
            start: start,
            end: end
        },
    })
}
