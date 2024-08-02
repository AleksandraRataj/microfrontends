import React from 'react'
import { Pagination } from '@mui/lab'
import { Link, useHistory } from 'react-router-dom'
import { Box } from '@mui/material'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
	const history = useHistory();

	const handlePageChange = (event, value) => {
		if (!isAdmin) {
			if (keyword) {
				history.push(`/search/${keyword}/page/${value}`);
			} else {
				history.push(`/page/${value}`);
			}
		} else {
			history.push(`/admin/productlist/${value}`);
		}
	}

	return (
		pages > 1 && (
			<Box display="flex" justifyContent="center" mt={2}>
				<Pagination
					count={pages}
					page={page}
					onChange={handlePageChange}
				/>
			</Box>
		)
	)
}

export default Paginate;
