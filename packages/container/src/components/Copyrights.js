import React from "react";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";

const Copyrights = () => {
    return (
        <Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright ©'}
                <Link color="inherit" to="/">
                    Aleksandra Rataj Master Thesis
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}

export default Copyrights;