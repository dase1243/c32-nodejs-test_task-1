import React from "react";
import './Pagination.css'

const Pagination = ({urlsPerPage, totalUrls, paginate}) => {
    const urlsNumbers = [];
    for (let i = 1; i <= Math.ceil(totalUrls / urlsPerPage); i++) {
        urlsNumbers.push(i);
    }

    return (
        <div className="pagination__inner">
            <div className="pagination">
                {urlsNumbers.map(number => (
                    <a onClick={(e) => {
                        e.preventDefault();
                        paginate(number);
                    }} key={number} href='#'>{number}</a>
                ))}
            </div>
        </div>
    )
}

export default Pagination;