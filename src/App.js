import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReservationView } from "./components/ReservationView";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <ReservationView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
