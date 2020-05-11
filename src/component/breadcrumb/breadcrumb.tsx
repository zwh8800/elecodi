import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, RouteChildrenProps, useLocation, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import routes, { RouteItem } from '@/routes';

class Node {
    value: any;
    next: Node;
}

class MyArray {
    arr: any[];
    node: Node;

    add(item: any) {
        this.arr.push(item);
    }

    aaa: {}
    [Symbol.iterator](): any {
        var current = this.node;
        var iterator = {
            next: function () {
                var iteratorResult = {
                    done: current.next == null,
                    value: current.value
                };
                current = current.next
                return iteratorResult;
            }
        };
        return iterator;
    }

    // *[Symbol.iterator]() {
    //     let cur = this.node;
    //     while (cur != null) {
    //         yield cur.value;
    //         cur = cur.next;
    //     }
    // }
}

let bt = new MyArray();
bt.add(1);

let arr = [1, 2, 3];
for (let i of arr) {

}

for (let i of bt) {

}

let iii = function* () {

}

let iter = bt[Symbol.iterator]();
let thisData = iter.next();
while (!thisData.done) {
    console.log(thisData.value);

    thisData = iter.next();
}



function BreadCrumb(props: RouteChildrenProps) {
    const [breadcrumb, setBreadcrumb] = useState(null);

    function genBreadcrumbMap(o: RouteItem[]) {
        return o.reduce((res, current) => {
            res.set(current.path, current.breadcrumbName);
            return res;
        }, new Map<string, string>());
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
                    <Link to={url}>{breadcrumbNameMap.get(url)}</Link>
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