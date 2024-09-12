import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { RESULTS_PER_PAGE } from "../lib/constants";

type PaginationControlsProps = {
  onClick: (direction: "next" | "previous") => void;
  currentPage: number;
  totalNumberOfResults: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
  totalNumberOfResults,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onClick={() => onClick("previous")}
          direction="previous"
          currentPage={currentPage}
        />
      )}
      {totalNumberOfResults > currentPage * RESULTS_PER_PAGE && (
        <PaginationButton
          onClick={() => onClick("next")}
          direction="next"
          currentPage={currentPage}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: "next" | "previous";
  currentPage: number;
  onClick: () => void;
};

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.target.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
