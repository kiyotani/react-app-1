import React, { Component } from 'react';

const CountApp = () => {
  return <Counter />
}

// ボタン形式でのカウントアップ
function CountByButton (props) {

  const changeCount = (value) => {
    return props.setDefaultCount(value);
  }
  //インクリメントする関数
  const onIncrement = () => {
    //setCountでcountの値を更新します
    changeCount(Number(props.displayCount) + 1);
  }

  //デクリメントする関数
  const onDecrement = () => {
    //setCountでcountの値を更新します
    changeCount(Number(props.displayCount) - 1);
  }

  return (
    <div>
      <div>
        カウント値：{props.displayCount}
      </div>
      <div>
        <button type="button" onClick={onIncrement}>+</button>
        <button type="button" onClick={onDecrement}>-</button>
      </div>
    </div>
  );
}

// 直接入力形式でのカウント変更
function CountByInput (props) {
  const changeCount = (value) => {
    return props.setDefaultCount(value);
  }

  return (
    <div>
      <div>
        カウント値：<input type="number" value={props.displayCount} onChange={(elem) => changeCount(elem.target.value) } />
      </div>
    </div>
  );
}

class Counter extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      updateType : 'button',
      defaultCount : 100,
      bindControl : () => {},
    }
  }
  componentDidMount() {
    this.setBindControl();
  }

  changeUpdateType = async (type) => {
    await this.setState({ updateType : type });
    this.setBindControl();
  }

  setBindControl = () => {
    // 選択した入力方法で表示する。
    switch (this.state.updateType) {
      case 'button':
        this.setState({ bindControl : () => (<CountByButton displayCount={this.state.defaultCount} setDefaultCount={(value) => this.setState({defaultCount : value})}/>) });
        break;
      case 'text':
        this.setState({ bindControl : () => (<CountByInput displayCount={this.state.defaultCount} setDefaultCount={(value) => this.setState({defaultCount : value})}/>) });
        break;
      default:
        break;
    }
  }

  render()
  {
    return (
      <div>
        <input name="countUpdateType" type="radio" id="typeButton" value="button" onChange={() => this.changeUpdateType('button')} checked={this.state.updateType == 'button'}/>
        <label for="typeButton">ボタン</label>
        <input name="countUpdateType" type="radio" id="typeInput" value="text" onChange={() => this.changeUpdateType('text')} checked={this.state.updateType == 'text'}/>
        <label for="typeInput">直接入力</label>
        {this.state.bindControl()}
      </div>
    );
  }
}
export default CountApp;
