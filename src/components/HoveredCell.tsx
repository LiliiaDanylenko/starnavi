import close from "../images/close.svg";

type Props = {
  cell: string;
  handleDelete: (v: string) => void;
}

const HoveredCell: React.FC<Props> = ({ cell, handleDelete }) => {
  return (
    <li key={cell} className="game__hovered-cell">
      {cell}
      <span onClick={() => handleDelete(cell)}>
        <img src={close} alt="close" />
      </span>
    </li>
  );
};

export default HoveredCell;