import React from 'react';
import { Pagination, PaginationItem, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => (
		pages > 1 && (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
				<Pagination
					count={pages}
					page={page}
					variant="outlined"
					color="primary"
					renderItem={(item) => (
						<PaginationItem
							component={RouterLink}
							to={
								!isAdmin
									? keyword
										? `/search/${keyword}/page/${item.page}`
										: `/page/${item.page}`
									: `/admin/products/${item.page}`
							}
							{...item}
						/>
					)}
				/>
			</Box>
		)
	)

export default Paginate;
