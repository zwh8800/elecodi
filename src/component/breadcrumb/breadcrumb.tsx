import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, RouteChildrenProps, useLocation, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import routes, { RouteItem } from '@/routes';

function BreadCrumb(props: RouteChildrenProps) {
    const [breadcrumb, setBreadcrumb] = useState(null);

    function genBreadcrumbMap<T extends string>(o: RouteItem[]): { [K in T]: K } {
        return o.reduce((res, current) => {
            res[current.path] = current.breadcrumbName;
            return res;
        }, Object.create(null));
    }

    function genBreadcrumbItems() {
        const breadcrumbNameMap = genBreadcrumbMap(routes);
        // console.log('breadcrumbNameMap: ', breadcrumbNameMap);
        const { location } = props;
        console.log('props: ', props);
        // console.log('location: ', location);
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>{breadcrumbNameMap[url]}</Link>
                </Breadcrumb.Item>
            );
        });
        return [
            <Breadcrumb.Item key="home">
              <Link to="/">首页</Link>
            </Breadcrumb.Item>,
          ].concat(extraBreadcrumbItems);
    }

    const _location = useLocation();
    useEffect(() => {
        let breadcrumbItems = genBreadcrumbItems();
        console.log('breadcrumbItems: ', breadcrumbItems);
        setBreadcrumb(breadcrumbItems);
    }, [_location]);


    return <Breadcrumb>{breadcrumb}</Breadcrumb>
}

export default withRouter(BreadCrumb)