import React from 'react'
import PropTypes from 'prop-types'
/*
react-redux库的主模块
1)react-redux向外暴露了2个API
    a. Provider组件类
    b. connect函数
2)Provider组件
    接收store属性
    让所有容器组件都可以看到store, 从而通过store读取/更新状态
3)connect函数
    接收2个参数: mapStateToProps和mapDispatchToProps
    mapStateToProps: 为一个函数, 用来指定向UI组件传递哪些一般属性
    mapDispatchToProps: 为一个函数或对象, 用来指定向UI组件传递哪些函数属性
    connect()执行的返回值为一个高阶组件: 包装UI组件, 返回一个新的容器组件
    容器组件会向UI传入前面指定的一般/函数类型属性
 */
//用来向所有的容器组件提供store的组件类

export class Provider extends React.Component {
    static propTypes = {
        store: PropTypes.object
    }
    static childContextTypes  = {
        store:PropTypes.object
    }

    getChildContext () {
        return {
            store:this.props.store
        }
    }
    render(){
        return this.props.children
    }
}

/*
connect高阶函数：接收mapStateToProps和mapDispatchToProps两个参数，返回一个高阶组件函数
高阶组件接收一个UI组件，返回一个容器组件
*/
export function connect (mapStateToProps,mapDispatchToProps) {
    return (UIComponent) => {
        //返回容器组件
        return class ContainerComponent extends React.Component{
            static contextTypes = {
                store:PropTypes.object
            }
            constructor(props,context){
                super(props)
                // 得到store
                const {store}  = context
                // 得到包含所以一般属性的对象
                const stateProps = mapStateToProps(store.getState())
                this.state = stateProps
                let dispatchProps
                if(typeof mapDispatchToProps==='function'){
                    dispatchProps = mapDispatchToProps(store.dispatch)
                }else {
                    dispatchProps = Object.keys(mapDispatchToProps).reduce((pre,key)=>{
                        const actionCreator = mapDispatchToProps[key]
                        pre[key]= (...args) => store.dispatch(actionCreator(...args))  //参数透传
                        return pre
                    },{})
                }
                this.dispatch = dispatchProps
                //绑定store的state变化的监听
                store.subscribe(()=>{
                    this.setState({...mapStateToProps(store.getState())})
                })
            }
            
            render (){
                //返回UI组件的标签
                return <UIComponent {...this.state} {...this.dispatch}/>
            }
        }
    }
}