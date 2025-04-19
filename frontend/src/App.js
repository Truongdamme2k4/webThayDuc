import "./styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import AppLayOut from "./AppLayOut";

function App() {
  return (
    <Router>
      <AppLayOut />
    </Router>
  );
}
export default App;
