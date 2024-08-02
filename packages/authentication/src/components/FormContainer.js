import React from 'react';
import { Container, Box, Grid } from '@mui/material';

const FormContainer = ({ children }) => {
	return (
		<Container maxWidth="sm">
			<Box mt={4}>
				<Grid container justifyContent="center">
					<Grid item xs={12} md={6}>
						{children}
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default FormContainer;
