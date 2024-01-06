import { useState, useEffect, useRef } from "react";
import classNames from 'classnames';
import { Field } from "../types/Field";
import arrowUp from "../images/arrow-up.svg";
import arrowDown from "../images/arrow-down.svg";

type Props = {
  selectedField: Field;
  setSelectedField: (v: Field) => void;
  fields: Field[];
  handleReset: () => void;
};

const Dropdown: React.FC<Props> = ({
  selectedField,
  setSelectedField,
  fields,
  handleReset,
}) => {
  const [isActiveDropdown, setIsActiveDropdown] = useState<boolean>(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleBlur = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setIsActiveDropdown(false);
      }
    }

    document.addEventListener('click', handleBlur);

    return () => document.removeEventListener('click', handleBlur);
  }, []);

  const toggleDropdown = () => {
    setIsActiveDropdown(!isActiveDropdown);
  }

  return (
    <div className="game__dropdown dropdown" ref={dropdownRef} >
      <button
        type="button"
        className="dropdown__button"
        onClick={toggleDropdown}
      >
        <span>
          {selectedField.name}
        </span>
        <span className="dropdown__icon">
          {isActiveDropdown ? (
            <img src={arrowUp} alt="arrow-up" />
          ) : (
            <img src={arrowDown} alt="arrow-down" />
          )}
        </span>
      </button>
      <div className={classNames("dropdown__content", { "dropdown__content--open": isActiveDropdown })}>
        {isActiveDropdown && fields.map((field) => (
          <div
            className={classNames("dropdown__item", { "dropdown__item--selected": field.id === selectedField.id })}
            key={field.id}
            onClick={() => {
              if (selectedField.id === field.id) {
                setIsActiveDropdown(!isActiveDropdown);
                return;
              }
              setSelectedField(field);
              setIsActiveDropdown(!isActiveDropdown);
              handleReset();
            }}
          >
            {field.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;