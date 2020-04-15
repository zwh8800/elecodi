import { kodiServer } from './jsonrpc';
import { GetMovieLibraryResp, GetTvShowLibraryResp } from './model';

export enum SortOrder {
    Ascending = 'ascending',
    Descending = 'descending'
}

export interface Sort {
    ignorearticle?: boolean
    method?: string
    order?: SortOrder
}

const movieProperties = [
    "title",
    "genre",
    "year",
    "rating",
    "director",
    "trailer",
    "tagline",
    "plot",
    "plotoutline",
    "originaltitle",
    "lastplayed",
    "playcount",
    "writer",
    "studio",
    "mpaa",
    "cast",
    "country",
    "imdbnumber",
    "runtime",
    "set",
    "streamdetails",
    "top250",
    "votes",
    "fanart",
    "thumbnail",
    "file",
    "sorttitle",
    "resume",
    "setid",
    "dateadded",
    "art",
    "userrating"
];

const tvShowProperties = [
    "title",
    "genre",
    "year",
    "rating",
    "plot",
    "studio",
    "mpaa",
    "cast",
    "playcount",
    "episode",
    "imdbnumber",
    "premiered",
    "votes",
    "lastplayed",
    "fanart",
    "thumbnail",
    "file",
    "originaltitle",
    "sorttitle",
    "episodeguide",
    "season",
    "watchedepisodes",
    "dateadded",
    "tag",
    "art",
    "userrating"
]

export function getMovieLibrary(sort: Sort, page?: number, pageSize?: number): PromiseLike<GetMovieLibraryResp> {
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

export function getTvShowLibrary(sort: Sort, page?: number, pageSize?: number): PromiseLike<GetTvShowLibraryResp> {
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

export function getSeasonsLibrary() {

}

export function getEpisodesLibrary() {

}
