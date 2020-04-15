import { kodiServer } from './jsonrpc';
import {
    GetMovieLibraryResp,
    GetTvShowLibraryResp,
    GetSeasonsLibraryResp
} from './model';

export enum SortOrder {
    Ascending = 'ascending',
    Descending = 'descending'
}

export enum SortMethod {
    "none", "label", "date", "size", "file", "path", "drivetype", "title", "track", "time", "artist",
    "album", "albumtype", "genre", "country", "year", "rating", "votes", "top250", "programcount",
    "playlist", "episode", "season", "totalepisodes", "watchedepisodes", "tvshowstatus", "tvshowtitle",
    "sorttitle", "productioncode", "mpaa", "studio", "dateadded", "lastplayed", "playcount", "listeners",
    "bitrate", "random"
}

export interface Sort {
    ignorearticle?: boolean
    method?: SortMethod
    order?: SortOrder
}

const movieProperties = ["title", "genre", "year", "rating", "director", "trailer",
    "tagline", "plot", "plotoutline", "originaltitle", "lastplayed", "playcount", "writer",
    "studio", "mpaa", "cast", "country", "imdbnumber", "runtime", "set", "streamdetails",
    "top250", "votes", "fanart", "thumbnail", "file", "sorttitle", "resume", "setid", "dateadded",
    "art", "userrating"];

const tvShowProperties = ["title", "genre", "year", "rating", "plot", "studio",
    "mpaa", "cast", "playcount", "episode", "imdbnumber", "premiered", "votes",
    "lastplayed", "fanart", "thumbnail", "file", "originaltitle", "sorttitle",
    "episodeguide", "season", "watchedepisodes", "dateadded", "tag", "art", "userrating"];

const searchProperties = ["title", "originaltitle", "plot"];

const seasonsProperties = ["season", "showtitle", "playcount", "episode", "fanart",
    "thumbnail", "tvshowid", "watchedepisodes", "art"];

const episodesProperties = ["title", "plot", "votes", "rating", "writer", "firstaired",
    "playcount", "runtime", "director", "productioncode", "season", "episode", "originaltitle",
    "showtitle", "cast", "streamdetails", "lastplayed", "fanart", "thumbnail", "file", "resume", "tvshowid",
    "dateadded", "uniqueid", "art", "specialsortseason", "specialsortepisode", "userrating", "seasonid"]

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
        properties: movieProperties,
        limits: {
            start: start,
            end: end
        },
        sort: sort,
    })
}

export function getTvShowLibrary(sort?: Sort, page?: number, pageSize?: number): PromiseLike<GetTvShowLibraryResp> {
    let [start, end] = pager(page, pageSize);

    return kodiServer.request('VideoLibrary.GetTvShows', {
        properties: tvShowProperties,
        limits: {
            start: start,
            end: end
        },
        sort: sort,
    })
}

export function getSeasonsLibrary(tvShowId: number, sort?: Sort): PromiseLike<GetSeasonsLibraryResp> {
    return kodiServer.request('VideoLibrary.GetSeasons', {
        tvshowid: tvShowId,
        properties: seasonsProperties,
        sort: sort
    })
}

export function getEpisodesLibrary(tvShowId: number, season: number, sort?: Sort) {
    return kodiServer.request('VideoLibrary.GetEpisodes', {
        tvshowid: tvShowId,
        season: season,
        sort: sort,
        properties: episodesProperties,
    })
}
