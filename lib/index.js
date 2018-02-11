import React, { Component } from 'react';
import PaginationAction from './PaginationAction';
import './pagination.css';

/**
 * 分页器
 * 
 * 使用：
 * 
 * 1. 在应用reducer中引入UDataPaginationReducer，
 *    执行PaginationReducer('prefix')获取该组件所有reducer，combine到应用的reducer中
 * 
 * 
 * 3. 渲染组件
 *    <Pagination total="总行数" size: "每页大小，默认为10" current="当前选中页号，默认为1" 
 *          prefix = "demo" // 组件action的type前缀，用于区分不同的组件
 *          dispatch={this.props.dispatchAction} // redux dispatch函数
 *          pageChangeCallback ="分页器触发的回调函数，参数为(pageSize, pageNo)"
 *          pageSizes="页面大小可选数组"/>
 * 
 */
class Pagination extends Component {
    render() {
        let {
            total, // 总行数
            size,  // 每页大小
            current, //当前页号
            pageSizes,  // 每页大小数组
            prefix, //区分不同分页器的prefix
            dispatch // redux dispatch函数
        } = this.props
        let that = this;

        if (current === null || typeof current === 'undefined') current = 1
        if (size === null || typeof size === 'undefined') size = 10
        let pages = size === '' ? 1 : Math.ceil(total / size)   // 总页数
        total = parseInt(total)
        size = parseInt(size)
        current = parseInt(current)

        // 页面大小选项
        let aPageSizes = [10, 25, 50, 100]
        if (pageSizes && pageSizes.length > 0) aPageSizes = pageSizes

        const domPageSizeOptions = aPageSizes.map((n, index) => { return (<div key={index}><input type="radio" id={"size" + n} name="sizenum" value={n} onChange={() => { }} checked={size == n} /> <label className="sizenum" htmlFor={"size" + n} > {n + '行'}</label></div>) })
        //去掉全部选项 domPageSizeOptions.push((<div key="all"><input type="radio" id="size" value={total} name="sizenum" /> <label className="sizenum" htmlFor="size" >全部 </label></div>))
        // 页号选项 
        let domPageNoItems
        // <=5，直接列出所有页号
        if (pages <= 5) {
            domPageNoItems = Array.from(new Array(pages), (val, index) => index + 1).map((n, index) =>
                (<li key={index} className={n === current ? 'current' : ''} data-value={n} onClick={() => { that.changeCurrentPage(n) }}>{n}</li>)
            )
        } else {
            // current<=3，显示12345...pages
            if (current <= 3) {
                domPageNoItems = Array.from(new Array(5), (val, index) => index + 1).map((n, index) =>
                    (<li key={index} className={n === current ? 'current' : ''} data-value={n} onClick={() => { that.changeCurrentPage(n) }}>{n}</li>)
                )
                domPageNoItems.push((<li key="ellipsis1">...</li>))
                domPageNoItems.push((<li key={pages} data-value={pages} onClick={() => { that.changeCurrentPage(pages) }}>{pages}</li>))
            }
            // current > pages-3，显示1...pages-4至pages
            else if (current > pages - 3) {
                domPageNoItems = []
                domPageNoItems.push((<li data-value='1' key='1' onClick={() => { that.changeCurrentPage(1) }}>1</li>))
                domPageNoItems.push((<li key="ellipsis2">...</li>))
                for (let i = pages - 4; i <= pages; i++) {
                    domPageNoItems.push((<li key={i} className={i === current ? 'current' : ''} data-value={i} onClick={() => { that.changeCurrentPage(i) }}>{i}</li>))
                }
            }
            // 显示current前2个和后2个，前后用...链接到第一页和最后一页
            else {
                domPageNoItems = []
                if (current - 2 > 1) {
                    domPageNoItems.push((<li data-value='1' key='1' onClick={() => { that.changeCurrentPage(1) }}>1</li>))
                    domPageNoItems.push((<li key="ellipsis3">...</li>))
                }
                for (let i = current - 2; i <= current + 2; i++) {
                    domPageNoItems.push((<li key={i} className={i === current ? 'current' : ''} data-value={i} onClick={() => { that.changeCurrentPage(i) }}>{i}</li>))
                }
                if (current + 2 < pages) {
                    domPageNoItems.push((<li key="ellipsis4">...</li>))
                    domPageNoItems.push((<li key={pages} data-value={pages} onClick={() => { that.changeCurrentPage(pages) }}>{pages}</li>))
                }
            }
        }

        return (
            <div className="pagination_container">
                <div className="page_length">
                    <span className="page_label">每页显示</span>
                    <div className="page_select">
                        <input type="checkbox" id="page_tt" className="page_tt_checkbox" />
                        <label htmlFor="page_tt" className="page_tt">{size + '行'}</label>
                        <div className="page_option" onChange={(e) => { that.changePageSize(e) }}>
                            {domPageSizeOptions}
                        </div>
                    </div>

                </div>
                <div className='nav-box'>
                    <i className='prev' onClick={() => { that.prev() }}></i>
                    <ul className='page-no-box'>
                        {domPageNoItems}
                    </ul>
                    <i className='next' onClick={() => { that.next() }}></i>
                </div>
            </div>
        )
    }
    /**
     * 修改页面大小
     */
    changePageSize(e) {
        const { prefix, pageChangeCallback, dispatch } = this.props;
        dispatch(PaginationAction(prefix).changeSize(e.target.value));
        document.getElementById("page_tt").checked = false;
        this.updateCurrent(1)
        
        pageChangeCallback.call(this, e.target.value, 1)
    }
    /**
     * 上一页
     */
    prev() {
        const { current, prefix, pageChangeCallback, size, dispatch } = this.props;
        if (current > 1) {
            dispatch(PaginationAction(prefix).selectPage(current - 1))
            pageChangeCallback.call(this, size, current - 1)
        }
    }
    /**
     * 下一页
     */
    next() {
        const { current, total, size, prefix, pageChangeCallback } = this.props
        let pages = size === '' ? 1 : Math.ceil(total / size)
        if (current < pages) {
            PaginationAction(prefix).selectPage(current + 1)
            pageChangeCallback.call(this, size, current + 1)
        }
    }
    /**
     * onchange事件触发
     * @param {*} page 
     */
    changeCurrentPage(page) {
        const { prefix, pageChangeCallback, size, dispatch } = this.props;
        dispatch(PaginationAction(prefix).selectPage(page));
        pageChangeCallback.call(this, size, page)
    }
/**
 *  手动触发
 */
  updateCurrent(page){
     const { prefix ,dispatch } = this.props;// 获取分页组件action
      dispatch(PaginationAction(prefix).updatePage(page))
  }
    

}

export default Pagination;