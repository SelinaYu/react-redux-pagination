import {combineReducers} from 'redux'

/**
 * 分页器reducer，需要传入action types
 * CHANGE_SIZE： 修改单页代销
 * SELECT_PAGE: 选择页号
 * UPDATE_SIZE: 更新单页大小
 * UPDATE_PAGE: 更新页号
 */
const buildConstant = (PREFIX, CONST) => PREFIX + '/' + CONST;
const PaginationReducer = prefix => {
    const size = (state = 10, action) => {
        if (action.type === buildConstant(prefix,'CHANGE_SIZE')) {
            state = action.size
        }
        if(action.type === buildConstant(prefix,'UPDATE_SIZE')){
            state = action.size
        }
        return state
    }   // 修改页面大小
    const current = (state = 1, action) => {
        if (action.type === buildConstant(prefix,'SELECT_PAGE')) {
            return state = action.pageNo
        }
        if(action.type === buildConstant(prefix,'UPDATE_PAGE')){
           return state = action.pageNo
        }
        return state
    }   // 修改当前页号（上一页、下一页、选择指定页）

    return combineReducers({
        size,
        current
    })
}

export default  PaginationReducer;