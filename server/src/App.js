import logo from './logo.svg';
import './App.css';
import {Navbar} from "./Navbar";
import {List} from "./List";

export const API = `http://localhost:5000/`
function App() {
  return (
    <div className="App">
      <Navbar />
      <List />
    </div>
  );
}

export default App;
