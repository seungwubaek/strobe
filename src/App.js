import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo192.png" className="App-logo" alt="logo" />
        <p className="navi-link"><Link to="/description">착시현상 설명</Link></p>
        <p className="navi-link"><Link to="/strobe">착시현상 실험</Link></p>
        <p className="navi-link">
          <a href="https://github.com/seungwubaek/strobe" target="_blank" rel="noreferrer">Go to Github&nbsp;
            <img className="logo" src="/assets/images/GitHub-Mark-Light-32px.png" alt="Github logo"/>
          </a>
        </p>
      </header>
      <footer className="footer">
        © 2022 <a href="https://github.com/seungwubaek">SammyBaek.</a> All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;
