//redux的主模块
/*
redux库的主模块
1)redux库向外暴露下面几个函数
    createStore(): 接收的参数为reducer函数, 返回为store对象
    combineReducers(): 接收包含n个reducer方法的对象, 返回一个新的reducer函数
    applyMiddleware() // 暂不实现

2)store对象的内部结构
    getState(): 返回值为内部保存的state数据
    dispatch(): 参数为action对象
    subscribe(): 参数为监听内部state更新的回调函数
 */
export function createStore(reducer){
    //用来存储内部状态 数据的变量，初始值为调用reducer函数返回的结果（外部指定的默认值）
    let state = reducer(undefined,{type:'@@redux/init'})
    //用来存储监听state更新回调函数的数组容器
    let listeners = []
    function getState(){
        return state
    }
    //分发action，触发reducer调用，产生新state
    function dispatch(action){
        //触发reducer调用，产生新state
        const newState = reducer(state,action)
        //保存新的state
        state = newState
        //调用所有已存在的监视回调函数
        listeners.forEach(listener => listener())

    }
    //绑定内部state改变的监听回调
    function subscribe(listener){
        listeners.push(listener)
    }
    //返回store对象
    return {
        getState,
        dispatch,
        subscribe
    }
}
//整合传入参数对象中的多个reducer函数，返回一个新的reducer
//新的reducer管理的总状态：{r1:state1,r2:state2}
export function combineReducers(reducers){
    //返回一个新的总reducer函数
    //state：总状态
    return (state= {},action)=>{
        //执行reducers中每个reducer函数得到一个新的子状态并封装到一个对象容器中
            return Object.keys(reducers).reduce((totalState, key) => {
                totalState[key] = reducers[key](state[key], action)
                return totalState
        },{})
    }
}