import React from 'react'
import { Box, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const Rating = ({ value, text }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffb400' }}>
                    {value >= index + 1 ? <StarIcon /> : <StarBorderIcon />}
                </Box>
            ))}
            {text && (
                <Typography variant='body2' component='span' sx={{ ml: 1 }}>
                    {text}
                </Typography>
            )}
        </Box>
    )
}

export default Rating
