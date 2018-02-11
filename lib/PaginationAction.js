/**
 * 分页器action创建函数，需要传入prefix
 * CHANGE_SIZE： 修改单页
 * SELECT_PAGE: 选择页号
 * UPDATE_PAGE: 手动更新页号，不触发change
 */
const buildConstant = (PREFIX, CONST) => PREFIX + '/' + CONST
const PaginationAction = prefix => ({
    changeSize: (size) => ({ type: buildConstant(prefix,'CHANGE_SIZE'), size }),
    selectPage: (pageNo) => ({ type: buildConstant(prefix,'SELECT_PAGE'), pageNo }),
    updateSize: (size) => ({type:buildConstant(prefix,'UPDATE_SIZE'),size}),
    updatePage: (pageNo) => ({type: buildConstant(prefix,'UPDATE_PAGE') ,pageNo})
})

export default PaginationAction