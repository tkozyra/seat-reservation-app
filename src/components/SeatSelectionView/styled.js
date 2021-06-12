import styled from "styled-components";

export const Floor = styled.div`
  width: 60px;
  height: 60px;
  background: #fff;

  @media (max-width: 1070px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 620px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 468px) {
    width: 10px;
    height: 10px;
  }
`;

export const Seat = styled(Floor)`
  border: 1px solid #000;
  cursor: ${(props) => (props.active ? "pointer" : "")};
  background: ${(props) => (props.selected ? "orange" : "#fff")};

  :hover {
    border-width: ${(props) => (props.active ? "2px" : "1px")};
  }
`;

export const SeatTaken = styled(Floor)`
  border: 1px solid #000;
  background: grey;
`;

export const Container = styled.div`
  width: 100vw;

  display: flex;
  justify-content: center;
  @media (max-width: 1024px) {
    width: 100vw;
  }
`;

export const ViewContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LegendLabel = styled.p`
  margin: 0;
  padding-left: 10px;
`;
