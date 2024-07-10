import React from "react";
import { LuArrowRightSquare ,LuArrowLeftSquare } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  const handlePreviousPage=()=>{
    if(currentPage>1)
    setCurrentPage(currentPage-1)
  }
  const handleNextPage=()=>{
    if(currentPage<pages.length)
    setCurrentPage(currentPage+1)
  }
  return (
    <div className="flex justify-center  m-9 items-center mt-4">
      <button
        onClick={handlePreviousPage}
        className=" px-3 py-1  rounded-full transition-colors duration-300 bg-gray-200 text-gray-700 hover:bg-gray-300"
        disabled={currentPage === 1}
      >
       <FaArrowLeft  className="bg-gray-200 "/>
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={`mx-1 px-3 py-1 rounded-full transition-colors duration-300 ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        className="mx-1 px-3 py-1 rounded-full transition-colors duration-300 bg-gray-200 text-gray-700 hover:bg-gray-300"
        disabled={currentPage === totalPosts}
      >
        <FaArrowRight  className="bg-gray-200"/>
      </button>
    </div>
  );
};



export default Pagination;
