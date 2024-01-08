import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Field } from './types/Field';
import Dropdown from './components/Dropdown';
import GameField from './components/GameField';
import HoveredCell from './components/HoveredCell';
import Loader from './components/Loader';

function App() {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [hoveredCells, setHoveredCells] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetch('https://60816d9073292b0017cdd833.mockapi.io/modes')
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Data missing');
        }
        return resp.json();
      })
      .then(resp => {
        setFields(resp);
        setSelectedField(resp[0]);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const handleStart = () => {
    setIsStarted(!isStarted);
    setHoveredCells([]);
  }

  const handleReset = () => {
    setIsStarted(false);
    setHoveredCells([]);
  }

  const handleDelete = (cell: string) => {
    setHoveredCells(current => current.filter(el => el !== cell));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className="error">Error: 'Data missing'</div>;
  }

  if (!selectedField) {
    return;
  }

  return (
    <div className="game">
      <div>
        <div className="game__header">
          <Dropdown
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            fields={fields}
            handleReset={handleReset}
          />
          <button
            className={classNames("game__button", { "game__button--started": isStarted })}
            type="button"
            onClick={handleStart}
          >
            {isStarted ? "FINISH" : "START"}
          </button>
        </div>
        <GameField
          selectedField={selectedField}
          isStart={isStarted}
          hoveredCells={hoveredCells}
          setHoveredCells={setHoveredCells}
        />
      </div>
      <div>
        <h1 className="game__title">Hover squares</h1>
        <ul className="game__hovered-cells">
          {hoveredCells.map(cell => (
            <HoveredCell
              key={cell}
              cell={cell}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
