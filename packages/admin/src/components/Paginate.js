import React from 'react'
import { Pagination } from '@mui/lab'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
	const handlePageChange = (event, value) => {
		// Logic to handle page change
	}

	return (
		pages > 1 && (
			<Box display="flex" justifyContent="center" mt={2}>
				<Pagination
					count={pages}
					page={page}
					onChange={handlePageChange}
					renderItem={(item) => (
						<Link
							key={item.page}
							to={
								!isAdmin
									? keyword
										? `/search/${keyword}/page/${item.page}`
										: `/page/${item.page}`
									: `/admin/productlist/${item.page}`
							}
							style={{ textDecoration: 'none' }}
						>
							<Pagination.Item {...item} />
						</Link>
					)}
				/>
			</Box>
		)
	)
}

export default Paginate;
