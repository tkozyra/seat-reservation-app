import { Col, Row, Alert, Spin } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import GridElement from "./GridElement";
import Legend from "./Legend";
import { Container, ViewContainer } from "./styled";
import { setSelectedSeats as setSelectedSeatsRedux } from "../../app/selectedSeatsSlice";
import {
  selectNumberOfSeats,
  selectAdjacent,
} from "../../app/numberOfSeatsSlice";

export default function SeatSelectionView() {
  const dispatch = useDispatch();
  const history = useHistory();
  const API_URL = "http://localhost:3001/seats";

  const [gridElements, setGridElements] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const numberOfSeats = useSelector(selectNumberOfSeats);
  const adjacent = useSelector(selectAdjacent);

  const [error, setError] = useState(null);

  const findSeats = (
    gridElements,
    numberOfSeatsToFind,
    numberOfFreeSeats,
    adjacent
  ) => {
    if (numberOfSeatsToFind > numberOfFreeSeats) {
      setError(`Znaleziono jedynie ${numberOfFreeSeats} wolnych miejsc.`);
      numberOfSeatsToFind = numberOfFreeSeats;
    }
    if (adjacent) {
      const { found, seats } = findConsecutiveSeats(
        gridElements,
        numberOfSeatsToFind,
        numberOfFreeSeats
      );
      if (found) {
        return seats;
      } else {
        setError(`Nie udało się znaleźć ${numberOfSeats} miejsc obok siebie.`);
        return findSeats(
          gridElements,
          numberOfSeatsToFind,
          numberOfFreeSeats,
          false
        );
      }
    } else {
      const numberOfRows = gridElements.length;
      const foundSeats = [];
      let numberOfFoundSeats = 0;
      for (let row = 0; row < numberOfRows; row++) {
        const numberOfColumns = gridElements[row].length;

        for (let col = 0; col < numberOfColumns; col++) {
          if (numberOfFoundSeats === numberOfSeatsToFind) {
            console.log(foundSeats);
            return foundSeats;
          }
          const seat = gridElements[row][col];
          if (!seat.reserved && seat.isSeat) {
            gridElements[row][col] = {
              chosen: true,
              ...gridElements[row][col],
            };
            foundSeats.push(gridElements[row][col]);
            numberOfFoundSeats++;
          }
        }
      }
      console.log("SEATS FOUND:", foundSeats);
      return foundSeats;
    }
  };

  const findConsecutiveSeats = (gridElements, numberOfSeatsToFind) => {
    const numberOfRows = gridElements.length;

    let foundConsecutiveSeats = 0;
    let foundConsecutiveSeatsEndCords = { x: 0, y: 0 };

    for (let row = 0; row < numberOfRows; row++) {
      let currentIndex = 0;
      let previousIndex = -1;
      let currentConsecutiveSeats = 0;

      const numberOfColumns = gridElements[row].length;

      for (let col = 0; col < numberOfColumns; col++) {
        const gridElement = gridElements[row][col];
        if (!gridElement.isSeat || gridElement.reserved) {
          currentConsecutiveSeats = 0;
          previousIndex = -1;
        } else {
          if (previousIndex === currentIndex - 1) {
            currentConsecutiveSeats++;
          } else {
            currentConsecutiveSeats = 1;
          }
          previousIndex = currentIndex;
          if (currentConsecutiveSeats > foundConsecutiveSeats) {
            foundConsecutiveSeats = currentConsecutiveSeats;
            foundConsecutiveSeatsEndCords = { x: row, y: currentIndex };
            if (foundConsecutiveSeats === numberOfSeatsToFind) {
              break;
            }
          }
        }
        currentIndex++;
      }
      if (foundConsecutiveSeats === numberOfSeatsToFind) {
        break;
      }
    }

    let foundSeats = [];
    if (foundConsecutiveSeats === numberOfSeatsToFind) {
      for (
        let y = foundConsecutiveSeatsEndCords.y;
        y >= 0 && foundConsecutiveSeats > 0;
        y--
      ) {
        foundConsecutiveSeats--;
        gridElements[foundConsecutiveSeatsEndCords.x][y] = {
          chosen: true,
          ...gridElements[foundConsecutiveSeatsEndCords.x][y],
        };
        foundSeats.push(gridElements[foundConsecutiveSeatsEndCords.x][y]);
      }
      return { found: true, seats: foundSeats };
    }

    return { found: false, seats: foundSeats };
  };

  //Method counting grid boundaries.
  const countNumberOfRowsAndColumns = (seats) => {
    let maxCol = -1;
    let maxRow = -1;
    for (const seat of seats) {
      if (seat.cords.x > maxRow) {
        maxRow = seat.cords.x;
      }
      if (seat.cords.y > maxCol) {
        maxCol = seat.cords.y;
      }
    }
    return { maxRow, maxCol };
  };

  //Method mapping list of seats obtained from API to grid elements,
  //and counting free seats in the grid.
  //We simply insert elements with 'isSeat' flag set to false
  //when there is no seat on {x,y} cords.
  const generateGrid = (seats, maxRow, maxCol) => {
    let gridElements = [];
    let numberOfFreeSeats = 0;
    for (let x = 0; x <= maxRow; x++) {
      let row = [];
      for (let y = 0; y <= maxCol; y++) {
        const cords = { x: x, y: y };
        const seat = seats.find(
          (seat) => seat.cords.x === cords.x && seat.cords.y === cords.y
        );
        if (seat) {
          row.push({ isSeat: true, ...seat });
          numberOfFreeSeats++;
        } else {
          row.push({ isSeat: false, cords: cords });
        }
      }
      gridElements.push(row);
    }
    setGridElements(gridElements);
    return { gridElements, numberOfFreeSeats };
  };

  const onUnselect = (seat) => {
    setSelectedSeats(
      selectedSeats.filter((selectedSeat) => selectedSeat.cords !== seat.cords)
    );
  };

  const onSelect = (seat) => {
    setSelectedSeats([seat, ...selectedSeats]);
  };

  const onSubmit = () => {
    dispatch(setSelectedSeatsRedux({ selectedSeats: selectedSeats }));
    history.push("/podsumowanie-rezerwacji");
  };

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        //find grid width and length
        let { maxRow, maxCol } = countNumberOfRowsAndColumns(res.data);
        //initialize grid, get number of free seats on the grid
        const { gridElements, numberOfFreeSeats } = generateGrid(
          res.data,
          maxRow,
          maxCol
        );
        //initialize seats based on chosen number of seats
        setSelectedSeats(
          findSeats(gridElements, numberOfSeats, numberOfFreeSeats, adjacent)
        );
      })
      .catch((error) => console.error(error));
  }, []);

  if (!gridElements) {
    return <Spin />;
  }

  return (
    <ViewContainer>
      <>
        {error && (
          <Alert message={error} type="error" style={{ marginBottom: "2em" }} />
        )}
      </>
      <>
        <Row gutter={[0, 10]}>
          {gridElements.map((row) => (
            <Container>
              <Row
                type="flex"
                justify="center"
                style={{ width: "100%" }}
                gutter={[10, 10]}
              >
                {row.map((gridElement) => (
                  <Col>
                    <GridElement
                      element={gridElement}
                      onSelect={onSelect}
                      onUnselect={onUnselect}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          ))}
          <Container>
            <Row
              type="flex"
              justify="center"
              style={{ width: "1050px" }}
              gutter={[10, 10]}
            >
              <Legend onSubmit={onSubmit} />
            </Row>
          </Container>
        </Row>
      </>
    </ViewContainer>
  );
}
