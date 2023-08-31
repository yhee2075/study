// import = HTML link

import React, {Component} from 'react';
import './App.css';

/**
 *
 * TODO: 변수와 따옴표 사용법
 *
 *  const = 상수 = 변하지 않는 값
 *  const birth = 960308;
 *
 *  백틱 = 문자열과 데이터 함께 사용 가능
 *  let name = `내 이름은 ${name} 입니다.`
 *
 *  쌍따옴표 안의 홑따옴표는 오류 가능성이 있기 때문에
 *  웬만하면 홑따옴표 안에 쌍따옴표를 쓸 것
 *  console.log('내 이름은 "노연희" 입니다.');
 *
 */

export default class App extends Component {
  /**
   *
   * state = 랜더링 결과물에 영향을 주는 데이터를 갖고 있는 객체
   * state가 변경될 경우 컴포넌트 리랜더링 필요
   * 변경 시 리랜더링 되도록 변경 내용에 setState 사용
   *
   */
  state = {
    todoData: [],
    value: '',
  };

  btnStyle = {
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right',
  };

  getStyle = completed => {
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: completed ? 'line-through' : 'none',
    };
  };

  handleChange = e => {
    //입력창에 입력 시 입력된 값 = e.target.value
    // console.log('e', e.target.value);

    //23번 state에 설정한 value값을 e.target.value로 재지정
    this.setState({value: e.target.value});
  };

  handleClick = id => {
    //data.id = 클릭한 버튼의 아이디
    // '===' > 동일 '!==' > 아닌 경우
    let newTodoData = this.state.todoData.filter(data => data.id !== id);
    this.setState({todoData: newTodoData});
  };

  /**
   *
   * newTodoData(재생성된 리스트)
   * = this.todoData.filter(기존 todoData에 필터 걸기)
   * (data.id(내가 클릭한 버튼의 아이디) !==(와 다른) id);
   *
   */

  handleSubmit = e => {
    e.preventDefault();
    //form안에 input을 전송될 때 페이지 리로드 되는 걸 막아줌

    // 1. 새로운 할 일 데이터 생성 > newTodo 선언
    // id는 고유한 1개의 값을 줘야 하므로, 현재 시각으로 임의 지정
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };

    // 2. 기존 목록에 새로운 할 일 데이터를 추가
    // [...this.state.todoData(기존 목록), newTodo(새로운 할 일)]
    // value:'' > submit 후 입력창 입력 내용 삭제
    this.setState({todoData: [...this.state.todoData, newTodo], value: ''});
  };

  handlecompleChange = id => {
    let newTodoData = this.state.todoData.map(data => {
      // 만약 클릭한 버튼의 id라면
      if (data.id === id) {
        //해당 id의 completed를 반대로 변경
        data.completed = !data.completed;
      }
      //해당 completed의 data 반환
      return data;
    });
    // 변경된 completed값으로 리랜더링
    this.setState({todoData: newTodoData});
  };

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
          {this.state.todoData.map(data => (
            <div style={this.getStyle(data.completed)} key={data.id}>
              <input type="checkbox" defaultChecked={false} onChange={() => this.handlecompleChange(data.id)} />
              {data.title}
              {/* 
                  1. 버튼을 누른다 > onClick 이벤트 발생
                  2. 내가 누른 버튼에 해당하는 id는 삭제되고
                  3. 누르지 않은 버튼의 id는 그대로 리스트에 있어야 함 
                     > filter로 누르지 않은 id만 골라내서 리스트 재생성
                      ( 재생성된 리스트 이름=newTodoData => let으로 선언 )
              */}
              <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>
                X
              </button>
            </div>
          ))}

          <form style={{display: 'flex'}} onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="value"
              style={{flex: '10', padding: '5px'}}
              placeholder="해야 할 일을 입력하세요."
              onChange={this.handleChange}
              value={this.state.value}
            />
            <input type="submit" value="입력" className="btn" style={{flex: '1'}} />
          </form>
        </div>
      </div>
    );
  }
}
