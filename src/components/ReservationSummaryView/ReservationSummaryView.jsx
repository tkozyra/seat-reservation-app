import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import { selectSelectedSeats } from "../../app/selectedSeatsSlice";

export default function ReservationSummaryView() {
  const selectedSeats = useSelector(selectSelectedSeats);
  return (
    <Row>
      <Col span={12} offset={6}>
        <h1>Twoja rezerwacja przebiegła pomyślnie!</h1>
        <h3>Wybrałeś miejsca:</h3>
        <ul>
          {selectedSeats.map((seat) => (
            <li>
              rząd {seat.cords.x}, miejsce {seat.cords.y}, ({seat.id})
            </li>
          ))}
        </ul>
        <h4>
          Dziękujemy! W razie problemów prosimy o kontakt z działem
          administracji.
        </h4>
      </Col>
    </Row>
  );
}
