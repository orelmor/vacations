import "./Pagination.css";

interface PaginationProps {
    page: number;
    totalPages: number;
    handlePagination: (page: number) => void;
}

function Pagination(props: PaginationProps): JSX.Element {

    return (
        <div className="Pagination">
            <div className="paginationWrapper">

                {props.page !== 1 &&
                    <button onClick={() => props.handlePagination(props.page - 1)}
                        type="button" className="pageItem sides" disabled={props.page === 1}>&lt;</button>
                }

                {props.page > 3 &&
                    <button onClick={() => props.handlePagination(1)}
                        type="button" className="pageItem">{1}</button>
                }

                {props.page > 4 && <div className="separator">...</div>}

                {props.page > 2 &&
                    <button onClick={() =>
                        props.handlePagination(props.page - 2)}
                        type="button" className="pageItem" disabled={props.page <= 2}>{props.page - 2}</button>
                }

                {props.page > 1 &&
                    <button onClick={() =>
                        props.handlePagination(props.page - 1)}
                        type="button" className="pageItem" disabled={props.page <= 1}>{props.page - 1}</button>
                }

                <button onClick={() =>
                    props.handlePagination(props.page)}
                    type="button" className="pageItem active">{props.page}</button>

                {props.page < props.totalPages &&
                    <button onClick={() =>
                        props.handlePagination(props.page + 1)} disabled={props.page === props.totalPages}
                        type="button" className="pageItem">{props.page + 1}
                    </button>
                }

                {props.page < props.totalPages - 1 &&
                    <button onClick={() =>
                        props.handlePagination(props.page + 2)}
                        type="button" className="pageItem" >{props.page + 2}</button>
                }

                {props.page < props.totalPages - 3 && <div className="separator">...</div>}

                {props.page < props.totalPages - 2 &&
                    <button onClick={() =>
                        props.handlePagination(props.totalPages)}
                        type="button" className={props.page === props.totalPages ? "pageItem active" : "pageItem"}>{props.totalPages}</button>
                }

                {props.page !== props.totalPages &&
                    <button
                        onClick={() => props.handlePagination(props.page + 1)}
                        type="button" className="pageItem sides" disabled={props.page === props.totalPages}>&gt;</button>
                }
            </div>


        </div>
    );
}

export default Pagination;
