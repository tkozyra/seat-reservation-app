import { useEffect, useState } from "react";
import { Seat, SeatTaken, Floor } from "./styled";

export default function GridElement({ element, onSelect, onUnselect }) {
  const [isSelected, setIsSelected] = useState(element.chosen);

  const handleClick = () => {
    isSelected ? onUnselect(element) : onSelect(element);
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    if (element.chosen) {
      setIsSelected(element.chosen);
    }
  }, [element]);

  return (
    <>
      {element.isSeat ? (
        element.reserved ? (
          <SeatTaken selected={isSelected} onClick={handleClick} active />
        ) : (
          <Seat selected={isSelected} onClick={handleClick} active />
        )
      ) : (
        <Floor />
      )}
    </>
  );
}
