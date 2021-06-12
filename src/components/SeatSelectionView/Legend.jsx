import { Button, Col, Row } from "antd";
import { Seat, SeatTaken, LegendLabel, Container } from "./styled";

export default function Legend({ onSubmit }) {
  return (
    <Container style={{ marginTop: "50px" }}>
      <Col span={6}>
        <Row type="flex" align="middle">
          <Seat selected={false} />
          <LegendLabel>Miejsca dostępne</LegendLabel>
        </Row>
      </Col>
      <Col span={6}>
        <Row type="flex" align="middle">
          <SeatTaken />
          <LegendLabel>Miejsca zarezerwowane</LegendLabel>
        </Row>
      </Col>
      <Col span={6}>
        <Row type="flex" align="middle">
          <Seat selected={true} />
          <LegendLabel>Twój wybór</LegendLabel>
        </Row>
      </Col>
      <Col span={6}>
        <Button style={{ width: "100%", height: "100%" }} onClick={onSubmit}>
          Rezerwuj
        </Button>
      </Col>
    </Container>
  );
}
