import classNames from "classnames";
import { Field } from "../types/Field";

type Props = {
  selectedField: Field;
  isStart: boolean;
  hoveredCells: string[];
  setHoveredCells: React.Dispatch<React.SetStateAction<string[]>>;
}

const GameField: React.FC<Props> = ({ selectedField, isStart, hoveredCells, setHoveredCells }) => {
  const handleHover = (currentCell: string) => {
    if (isStart) {
      if (hoveredCells.includes(currentCell)) {
        setHoveredCells(current => current.filter(el => el !== currentCell));
      } else {
        setHoveredCells(current => [...current, currentCell]);
      }
    }
  }

  return (
    <div className="game__field field">
      {Array.from({ length: selectedField.field }, (_, index) => index + 1).map((row) => (
        <div className="field__row" key={row}>
          {Array.from({ length: selectedField.field }, (_, index) => index + 1).map((col) => {
            const currentCell = `row ${row} col ${col}`;
            return (
              <div
                className={classNames(
                  "field__col",
                  { 'field__col--hover': hoveredCells.includes(currentCell) },
                )}
                key={col}
                onMouseEnter={() => handleHover(currentCell)}
              />
            )
          })}
        </div>
      ))}
    </div>
  );
}

export default GameField;