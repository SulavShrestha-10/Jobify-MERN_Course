import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
	const {
		data: { numOfPages, currentPage },
	} = useAllJobsContext();
	const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
	const { search, pathname } = useLocation();
	const navigate = useNavigate();
	const handlePageChange = (page) => {
		const searchParams = new URLSearchParams(search);
		searchParams.set("page", page);
		navigate(`${pathname}?${searchParams.toString()}`);
	};
	const addPageButton = ({ page, activeClass }) => {
		return (
			<button onClick={() => handlePageChange(page)} key={page} className={`btn page-btn ${activeClass && "active"}`}>
				{page}
			</button>
		);
	};
	const renderPageButtons = () => {
		const pageButtons = [];
		// * First Page
		pageButtons.push(addPageButton({ page: 1, activeClass: currentPage === 1 }));
		// * Adding dots
		if (currentPage > 3) {
			pageButtons.push(
				<span className="page-btn dots" key="dots-1">
					....
				</span>,
			);
		}
		// * one before current page
		if (currentPage !== 1 && currentPage !== 2) {
			pageButtons.push(addPageButton({ page: currentPage - 1, activeClass: false }));
		}

		if (currentPage !== 1 && currentPage !== numOfPages) {
			pageButtons.push(addPageButton({ page: currentPage, activeClass: true }));
		}
		// * one after current page
		if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
			pageButtons.push(addPageButton({ page: currentPage + 1, activeClass: false }));
		}
		// * Adding dots
		if (currentPage < numOfPages - 2) {
			pageButtons.push(
				<span className=" page-btn dots" key="dots+1">
					....
				</span>,
			);
		}
		// * Last Page
		pageButtons.push(addPageButton({ page: numOfPages, activeClass: currentPage === numOfPages }));
		return pageButtons;
	};
	return (
		<Wrapper>
			<button
				onClick={() => {
					let prevPage = currentPage - 1;
					if (prevPage < 1) prevPage = numOfPages;
					handlePageChange(prevPage);
				}}
				className="btn prev-btn">
				<HiChevronDoubleLeft />
				prev
			</button>
			<div className="btn-container">{renderPageButtons()}</div>
			<button
				onClick={() => {
					let nextPage = currentPage + 1;
					if (nextPage > numOfPages) nextPage = 1;
					handlePageChange(nextPage);
				}}
				className="btn next-btn">
				next
				<HiChevronDoubleRight />
			</button>
		</Wrapper>
	);
};

export default PageBtnContainer;
