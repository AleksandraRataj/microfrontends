import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TextField, Button, Box } from '@mui/material'

const SearchBox = () => {
	const [keyword, setKeyword] = useState('')
	const history = useHistory()

	const submitHandler = (e) => {
		e.preventDefault()
		if (keyword.trim()) {
			history.push(`/search/${keyword}`)
		} else {
			history.push('/')
		}
	}

	return (
		<Box component="form" onSubmit={submitHandler} sx={{ display: 'flex', alignItems: 'center' }}>
			<TextField
				type='text'
				name='q'
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Search Products...'
				variant='outlined'
				size='small'
				sx={{ mr: 2 }}
			/>
			<Button type='submit' variant='contained' color='primary'>
				Search
			</Button>
		</Box>
	)
}

export default SearchBox
