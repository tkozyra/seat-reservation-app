import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReservationSummaryView from "./components/ReservationSummaryView/ReservationSummaryView";
import { ReservationView } from "./components/ReservationView";
import { SeatSelectionView } from "./components/SeatSelectionView";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/wybor-miejsc">
          <SeatSelectionView />
        </Route>
        <Route path="/podsumowanie-rezerwacji">
          <ReservationSummaryView />
        </Route>
        <Route path="/">
          <ReservationView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
