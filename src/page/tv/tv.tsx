import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { message, Dropdown, Menu, Switch, Slider, Row, Col } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { DownOutlined } from '@ant-design/icons';
import Loader from 'react-loaders';
import classnames from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';
import pinyin from 'tiny-pinyin';
import moment from 'moment';

import Poster from '@/component/poster/poster';
import * as conf from '@/conf/elecodiConf';
import {
    SortMethod,
    SortOrder,
    Tvshow,
    getTvShowLibrary
} from '@/api';
import * as player from '@/player/player';

import '@/assets/style/media-list';

const PAGE_SIZE = 20;

const SIZE_MAP = [
    { width: 100, height: 150 },
    { width: 150, height: 225 },
    { width: 200, height: 300 },
];

class GroupInfo {
    name: string;
    sortKey: any;
}

class GroupMedia<M> {
    group: GroupInfo;
    media: M[];
}

type GroupTv = GroupMedia<Tvshow>

interface Props extends RouteComponentProps { }

class State {
    loading: boolean = false;
    isScollEnd: boolean = false;
    tvGroups: GroupTv[] = [];
    sortMethod: SortMethod = SortMethod.sorttitle;
    sortOrder: SortOrder = SortOrder.Asc;
    posterSize: number = 1; // 0,1,2 = 小中大
}

export default class TV extends React.Component<Props, State> {
    curPage: number = 0;
    tvBuffer: Tvshow[] = [];
    lastBufferLength: number = 0;
    shouldGrouping: boolean = true;

    constructor(props: Props) {
        super(props);
        this.state = new State();
        conf.onConfigChange(this.onConfChange.bind(this));
    }

    componentDidMount() {
        document.title = '剧集 - ELECODI';
    }

    getGroup(by: SortMethod, tv: Tvshow): GroupInfo {
        switch (by) {
            case SortMethod.dateadded: {
                let date = new Date(tv.dateadded);
                return {
                    name: moment(date).format('YYYY-MM'),
                    sortKey: date
                }
            }

            case SortMethod.sorttitle: {
                if (!pinyin.isSupported()) {
                    return null;
                }
                let tokens = pinyin.parse(tv.title.substr(0, 1));
                if (tokens.length <= 0 || tokens[0].target.length <= 0) {
                    return null;
                }
                if (tokens[0].type != 2) {
                    return {
                        name: '#',
                        sortKey: '#'
                    }
                }
                return {
                    name: tokens[0].target.substr(0, 1).toUpperCase(),
                    sortKey: tokens[0].target.substr(0, 1).toUpperCase()
                }
            }

            case SortMethod.lastplayed: {
                let date = new Date(tv.lastplayed);
                if (isNaN(date.getTime())) {
                    return {
                        name: '未播放',
                        sortKey: new Date(0)
                    }
                }
                return {
                    name: moment(date).format('YYYY-MM'),
                    sortKey: date
                }
            }

            default:
                return null;
        }
    }

    sortInsert(order: SortOrder, groupTv: GroupTv[], group: GroupTv) {
        for (let [i, g] of groupTv.entries()) {
            if (g.group.name == group.group.name) {
                g.media.push(...group.media);
                return g;
            } else if (order == SortOrder.Asc && group.group.sortKey < g.group.sortKey ||
                order == SortOrder.Desc && group.group.sortKey > g.group.sortKey) {
                groupTv.splice(i, 0, group);
                return group;
            }
        }
        groupTv.push(group)
        return group;
    }

    grouping(by: SortMethod, order: SortOrder, groupTv: GroupTv[], tvs: Tvshow[]): GroupTv[] {
        let lastGroup: GroupTv;
        if (groupTv.length == 0) {
            lastGroup = {
                group: null,
                media: []
            };
            groupTv.push(lastGroup)
        } else {
            lastGroup = groupTv[groupTv.length - 1]
        }
        for (let tv of tvs) {
            if (!tv) {
                continue
            }
            let group = this.getGroup(by, tv);
            if (group == null) {
                lastGroup.media.push(tv);
                continue;
            }
            if (lastGroup.group == null) {
                lastGroup.group = group;
            }
            if (group.name == lastGroup.group.name) {
                lastGroup.media.push(tv);
                continue;
            }
            lastGroup = this.sortInsert(order, groupTv, {
                group: group,
                media: [tv]
            })
        }

        return groupTv;
    }

    async loadTV() {
        this.setState({
            loading: true
        })
        try {
            let tvResp = await getTvShowLibrary({
                method: this.state.sortMethod,
                order: this.state.sortOrder
            }, this.curPage, PAGE_SIZE);
            if (tvResp.limits.end >= tvResp.limits.total) {
                this.setState({
                    isScollEnd: true
                })
            }
            for (let i = tvResp.limits.start; i < tvResp.limits.end; i++) {
                this.tvBuffer[i] = tvResp.tvshows[i - tvResp.limits.start];
            }
            if ((this.tvBuffer.length - this.lastBufferLength) == Object.keys(this.tvBuffer).length) {
                this.lastBufferLength = this.tvBuffer.length;
                let newTvs = this.grouping(
                    this.shouldGrouping ? this.state.sortMethod : null,
                    this.state.sortOrder,
                    Array.of(...this.state.tvGroups),
                    this.tvBuffer);
                this.tvBuffer = [];
                this.setState({
                    tvGroups: newTvs,
                })
            }

        } catch (err) {
            console.error(err);
            message.error('网络异常：' + err);
        }
        this.setState({
            loading: false
        })
    }

    nextPage() {
        if (this.state.isScollEnd) {
            message.info('已经到底了');
            return;
        }
        this.curPage++;
        this.loadTV();
    }

    reset() {
        this.curPage = 0;
        this.lastBufferLength = 0;

        this.setState(new State());
        this.nextPage();
    }

    onConfChange() {
        this.reset();
    }

    onSorterMenuSelected(param: ClickParam) {
        this.curPage = 0;
        this.lastBufferLength = 0;

        if (Object.values(SortMethod).includes(param.key as SortMethod)) {
            this.setState({
                isScollEnd: false,
                tvGroups: [],
                sortMethod: param.key as SortMethod
            }, this.nextPage.bind(this));
        } else if (Object.values(SortOrder).includes(param.key as SortOrder)) {
            this.setState({
                isScollEnd: false,
                tvGroups: [],
                sortOrder: param.key as SortOrder
            }, this.nextPage.bind(this));
        }
    }

    onGroupSwitchChange(checked: boolean) {
        this.curPage = 0;
        this.lastBufferLength = 0;
        this.shouldGrouping = checked;
        this.setState({
            isScollEnd: false,
            tvGroups: [],
        }, this.nextPage.bind(this))
    }

    findTvById(tvshowid: number) {
        for (let g of this.state.tvGroups) {
            for (let m of g.media) {
                if (m.tvshowid == tvshowid) {
                    return m;
                }
            }
        }
        return null;
    }

    onPlayClick(tvid: number) {
        let tv = this.findTvById(tvid);
        if (tv == null) {
            message.warn('未找到剧集id：' + tvid);
            return
        }
        player.openPlayer(tv.file);
    }

    onMediaClick(tvid: number) {
        this.props.history.push(`/tv/${tvid}`)
    }

    onSizerChange(n: number) {
        this.setState({
            posterSize: n
        })
    }

    render() {
        let { loading, isScollEnd, tvGroups: tvGroups, sortMethod, sortOrder, posterSize } = this.state;

        const sorterMenu = (<Menu multiple={true} selectedKeys={[sortMethod, sortOrder]} onClick={this.onSorterMenuSelected.bind(this)}>
            <Menu.Item disabled={true} className="switch-item">
                <div>
                    分组
                </div>
                <Switch defaultChecked onChange={this.onGroupSwitchChange.bind(this)} />
            </Menu.Item>
            <Menu.ItemGroup key="method" title="方式">
                <Menu.Item key={SortMethod.dateadded}>
                    按添加顺序
                </Menu.Item>
                <Menu.Item key={SortMethod.sorttitle}>
                    按名称
                </Menu.Item>
                <Menu.Item key={SortMethod.lastplayed}>
                    按最后观看时间
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="order" title="顺序">
                <Menu.Item key={SortOrder.Asc}>
                    正序
                </Menu.Item>
                <Menu.Item key={SortOrder.Desc}>
                    倒序
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>);

        return (
            <div className="movie-con">
                <div className="top-bar">
                    <Row gutter={24}>
                        <Col span={20}>
                        </Col>
                        <Col span={2}>
                            <div className="item">
                                <div className="sizer">
                                    <Row>
                                        <Col span={20}>
                                            <Slider
                                                min={0}
                                                max={2}
                                                value={posterSize}
                                                tipFormatter={v => ['小', '中', '大'][v]}
                                                onChange={this.onSizerChange.bind(this)}
                                            />
                                        </Col>
                                        <Col span={4}>
                                            <i className="iconfont icon-grid"></i>
                                        </Col>
                                    </Row>

                                </div>
                            </div>
                        </Col>
                        <Col span={2}>
                            <div className="item">
                                <Dropdown overlay={sorterMenu} trigger={['click']}>
                                    <a className="sorter-dropdown" onClick={e => e.preventDefault()}>
                                        排序 <DownOutlined />
                                    </a>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </div>
                <InfiniteScroll
                    initialLoad={true}
                    pageStart={1}
                    loadMore={this.nextPage.bind(this)}
                    hasMore={!isScollEnd && !loading}
                    loader={null}
                    useWindow={false}
                >
                    {tvGroups.map((groupItem) => (
                        <div className="movie-list" key={groupItem.group ? groupItem.group.name : "default-group"}>
                            {groupItem.group ?
                                <div className="group-title">
                                    <span>{groupItem.group.name}</span>
                                </div> : null}

                            {groupItem.media.map((tv) => (
                                <Poster
                                    key={tv.tvshowid}
                                    identifier={tv.tvshowid}
                                    title={tv.title}
                                    plot={tv.plot}
                                    url={tv.art.poster}
                                    {...SIZE_MAP[posterSize]}
                                    onClick={this.onMediaClick.bind(this)}
                                    onPlayClick={this.onPlayClick.bind(this)}
                                />
                            ))}

                            {[...Array(20).keys()].map((i) => <i style={{ width: SIZE_MAP[posterSize].width }} key={i}></i>)}
                        </div>

                    ))}
                </InfiniteScroll>
                <div className="loading">
                    <Loader type="ball-pulse-sync" active={loading} innerClassName="elecodi-loader" />
                    <p className={classnames('scroll-to-end', { 'show': isScollEnd })}>
                        已经到底了
                    </p>
                </div>
            </div>
        )
    }
}