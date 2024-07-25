import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Container } from '@mui/material'
import { AccountCircle, ShoppingCart } from '@mui/icons-material'
import SearchBox from './SearchBox'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  header: {
    maxHeight: '64px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menu: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: "center",
    gap: '10px',
  }
}));

const Header = ({auth, logout}) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const { userInfo } = auth;

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [adminAnchorEl, setAdminAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleAdminMenu = (event) => {
    setAdminAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setAdminAnchorEl(null)
  }

  const logoutHandler = () => {
    dispatch(logout())
    handleClose()
  }

  return (
        <AppBar position="fixed" sx={{ backgroundColor: '#228B22' }} >
          <Container>
            <Toolbar className={styles.toolbar}>
              <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                E-Commerce Microfrontends
              </Typography>

              {/*<Route render={({ history }) => <SearchBox history={history} />} />*/}

              <div className={styles.menu}>
                <IconButton sx={{ width: '36px', height: '36px' }} color="inherit" component={Link} to="/cart">
                  <ShoppingCart/>
                </IconButton>

                {userInfo ? (
                    <div>
                      <Button
                          color="inherit"
                          onClick={handleMenu}
                          startIcon={<AccountCircle />}
                      >
                        {userInfo.name}
                      </Button>
                      <Menu
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                      >
                        <MenuItem component={Link} to="/authentication/profile">Profile</MenuItem>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                      </Menu>
                    </div>
                ) : (
                    <Button color="inherit" component={Link} to="/authentication/login">
                      <AccountCircle sx={{ marginRight: '5px' }}  /> Sign In
                    </Button>
                )}
                {userInfo && userInfo.isAdmin && (
                    <div>
                      <Button
                          color="inherit"
                          onClick={handleAdminMenu}
                          startIcon={<AccountCircle />}
                      >
                        Admin
                      </Button>
                      <Menu
                          anchorEl={adminAnchorEl}
                          keepMounted
                          open={Boolean(adminAnchorEl)}
                          onClose={handleClose}
                      >
                        <MenuItem component={Link} to="/admin/userlist">Users</MenuItem>
                        <MenuItem component={Link} to='/admin/products'>Products</MenuItem>
                        <MenuItem component={Link} to="/admin/orderlist">Orders</MenuItem>
                      </Menu>
                    </div>
                )}
              </div>
            </Toolbar>
          </Container>
        </AppBar>
  )
}

export default Header
