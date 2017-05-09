import React from 'react';
import ReactDOM from 'react-dom';

let MyWorker1 = require("worker-loader!./worker1.js");
let MyWorker2 = require("worker-loader!./worker2.js");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sampleValue: 1, showMenu: false, showModal: false }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.state.sampleValue = this.state.sampleValue + 1;
    this.state.showMenu = !this.state.showMenu;
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <Header handleClick={this.handleClick} />
        <Menu showMenu={this.state.showMenu} handleClick={this.handleClick} />
        <Paper />
      </div>
    )
  }
}

export default App;

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <i className="material-icons" onClick={this.props.handleClick}>person</i>
        <div className="logo">S A M P L E</div>
      </div >);
  }
}

class Menu extends React.Component {
  render() {
    let nameClass = null;
    if (this.props.showMenu) {
      nameClass = "menu show";
    } else {
      nameClass = "menu";
    }
    return (
      <div className={nameClass}>
        <i className="material-icons" onClick={this.props.handleClick}>clear</i>
        <div className="control">Logged in user details</div>
        <div className="control">control 2</div>
        <div className="control">control 3</div>
        <div className="control">control 4</div>
      </div>
    )
  }
}

class Paper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false, data1: -1, data2: [],
      items: [{ "id": 1, "body": "welcome message, lorem ipsum dolom, welcome message ending !" }, { "id": 2, "body": "body 2" }]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.worker1 = new MyWorker1();
    this.worker2 = new MyWorker2();
  }

  handleClick(e) {
    if (e.target.className == "message3") {
      this.state.showModal = !this.state.showModal;
    }
    if (e.target.className == "close") {
      this.state.showModal = !this.state.showModal;
    }
    this.forceUpdate();
  }
  render() {
    var styles = { modal: { display: 'none' }, };
    if (this.state.showModal) {
      styles = { modal: { display: 'block' }, }
    }
    var modalContent = this.state.items.map(function (item) { return (<li key={item.id}>{item.body}</li>); });
    var data2Content = this.state.data2.map(function (item) { return (<li key={item.id}>{item.body}</li>); });

    this.worker1.onmessage = (m) => this.setState({ data1: m.data })

    this.worker2.onmessage = (m) => this.setState({ data2: m.data })

    return (
      <div className="paper">
        <div className="dim" style={styles.modal}></div>
        <div className="paperMenu">
          <div className="comp">Flights</div>
          <div className="comp">My Bookings</div>
          <div className="comp">Group</div>
          <div className="comp">Beat the price</div>
          <div className="comp">Reward points</div>
          <div className="comp">My Commission</div>
        </div>
        <button className="message3" onClick={this.handleClick}>open</button>
        <button onClick={() => this.worker1.postMessage(null)} className="lTask"> lTask </button><span>{this.state.data1}</span>
        <button onClick={() => this.worker2.postMessage(null)} className="lTask"> lTask2 </button>
        <ul>{data2Content}</ul>
        <div className={this.state.showModal?"modal showModal":"modal"}>
          <ul> {modalContent}</ul>
          <button className="close" onClick={this.handleClick}>close</button>
        </div>
        <div className="footer">operared by Voyzant Inc. - 2017</div>
      </div >);
  }
}