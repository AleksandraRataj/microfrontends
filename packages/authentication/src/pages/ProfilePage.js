import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Alert,
    CircularProgress
} from '@mui/material'
import { Link } from 'react-router-dom'

const USER_UPDATE_PROFILE_RESET = 'USER_UPDATE_PROFILE_RESET';

const ProfilePage = ({
                         history,
                         userLogin,
                         userDetails,
                         getUserDetails,
                         userUpdateProfile,
                         updateUserProfile,
                         orderListMy,
                         listMyOrders,
}) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const { loading, error, user } = userDetails;

    const { userInfo } = userLogin;

    const { success } = userUpdateProfile;

    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            history.push('/authentication/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item md={3}>
                    <Typography variant="h4">User Profile</Typography>
                    {message && <Alert severity="error">{message}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">Profile Updated</Alert>}
                    {loading && <CircularProgress />}
                    <form onSubmit={submitHandler} style={{ marginTop: '1em' }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '1em' }}
                        >
                            Update
                        </Button>
                    </form>
                </Grid>
                <Grid item md={9}>
                    <Typography variant="h4">My Orders</Typography>
                    {loadingOrders ? (
                        <CircularProgress />
                    ) : errorOrders ? (
                        <Alert severity="error">{errorOrders}</Alert>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Paid</TableCell>
                                        <TableCell>Delivered</TableCell>
                                        <TableCell>Info</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order._id}>
                                            <TableCell>{order._id}</TableCell>
                                            <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                                            <TableCell>R{order.totalPrice}</TableCell>
                                            <TableCell>
                                                {order.isPaid ? (
                                                    order.paidAt.substring(0, 10)
                                                ) : (
                                                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {order.isDelivered ? (
                                                    order.deliveredAt.substring(0, 10)
                                                ) : (
                                                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Button component={Link} to={`/order/${order._id}`} variant="contained" size="small">
                                                    Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProfilePage;
