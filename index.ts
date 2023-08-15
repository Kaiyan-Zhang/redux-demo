interface IState {
  value: number;
}

interface IAction {
  type: string;
  payload: number;
}

type IReducer = (state: IState, action: IAction) => IState

type IDispatch = (action: IAction) => void

interface Store {
  state: IState;
  reducer: IReducer;
  dispatch: IDispatch;
}

const someStore: Store = {
  state: {
    value: 0
  },
  reducer: (oldState, action) => {
    switch (action.type) {
      case 'add':
        return { value: oldState.value + action.payload }
      case 'dec':
        return { value: oldState.value - action.payload }
      case 'set':
        return { value: action.payload }
      default:
        return { ...oldState }
    }
  },
  dispatch: function (action) {
    this.state = this.reducer(this.state, action);
  }
}

type IActionCreator = (num: number) => IAction

const someActionCreator: IActionCreator = (num) => {
  return {
    type: 'set',
    payload: num
  }
}

const someAction = someActionCreator(1000);

someStore.dispatch(someAction);

console.log(someStore.state)

type IActionCreatorCreator = (type: string) => IActionCreator

declare createAction: IActionCreatorCreator

const addTodo = createAction('ADD_TODO') //toolkit
addTodo({ text: 'Buy milk' })
// {type : "ADD_TODO", payload : {text : "Buy milk"}})
