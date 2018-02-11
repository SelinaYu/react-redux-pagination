/**
 * @overview: 
 * @author: licyd 
 * @created: 2018-02-11 14:37:28 
 */ 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../lib';
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            total : 1000
        }
    }
    render(){
        const { size, current } = this.props;
        return (
            <Pagination 
              total={this.state.total}
              size={size}
              current={current}
              prefix="DEMO"
              dispatch={this.props.dispatch}
              pageChangeCallback={(pageSize, pageNo) => { console.log(pageSize, pageNo) }}
            />
        )
    }
}
export default connect(state => ({...state.pagination}))(App);