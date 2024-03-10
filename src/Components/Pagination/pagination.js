import "./pagination.css";

export const Pagination = ({ items, currentPage, setCurrentPage, handldeClick }) => {
  return (
    <div className="buttons">
      {items.length ? (
        <div>
          {currentPage !== 1 ? (
            <button
              className="btn"
              onClick={(e) => {
                handldeClick(e);
                setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </button>
          ) : (
            ""
          )}
          <button
            className="btn"
            onClick={(e) => {
              handldeClick(e);
              setCurrentPage(currentPage + 1);
            }}
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};