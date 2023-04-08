import React from 'react'
import ReactPaginate from 'react-paginate'
const handlePageClick = (e:any) => {
    console.log(e)
}

export default function Panigation2() {
  return (
    <div>
       <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={8}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}

        // containerClassName="pagination justify-content-center"
        // pageClassName="page-item"
        // pageLinkClassName="page-link"
        // previousClassName="page-item"
        // previousLinkClassName="page-link"
        // nextClassName="page-item"
        // nextLinkClassName="page-link"
        // activeClassName="active"
      />
    </div>
  )
}
