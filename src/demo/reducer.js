import { combineReducers } from 'redux';
import PaginationReducer from '../../lib/PaginationReducer';

export default combineReducers({
    pagination: PaginationReducer('DEMO')    // 分页组件reducer
})