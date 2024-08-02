import React from 'react'
import { CircularProgress, Box } from '@mui/material'

const Loader = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
				margin: 'auto',
			}}
		>
			<CircularProgress
				size={100}
				thickness={4}
				role='status'
			/>
			<span className='sr-only'>Loading...</span>
		</Box>
	)
}

export default Loader;
