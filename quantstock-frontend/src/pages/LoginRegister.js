import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    content: {
        marginBottom: 10,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    forgot: {
        color: "grey",
        textDecoration: 'none',
        "&:hover": {
            color: "#000000",
            textDecoration: "underline #000000"
        }
    },
    register: {
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#0E8AE2",
        textDecoration: 'none',
        "&:hover": {
            color: "blue",
            textDecoration: "underline #000000"
        }
    },
}));


function LoginRegisterPage() {
    const classes = useStyles();
    const location = useLocation()
    const page = location.pathname.substring(1)
    console.log(page)
    return (
        <div className={classes.root}>
            <Box sx={{ minWidth: 275, width: 500 }}>
                <Card variant="outlined">
                    <CardContent>
                        <div className={classes.content}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                variant="outlined"
                            />
                        </div>
                        <div className={classes.content}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                variant="outlined"
                            />
                        </div>
                        {page === "register" ?
                            <div className={classes.content}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="email"
                                    variant="outlined"
                                />
                            </div>
                            :
                            <a className={classes.forgot} href="/forgot" > Forgot password?</a>
                        }
                        <div className={classes.button}>
                            <Button style={{ textTransform: 'none', minWidth: '300px', minHeight: '60px', fontSize: '40px' }} variant="contained" size="large">
                                {page === "register" ? "Register" : "Log In"}
                            </Button>
                        </div>
                        <Divider />
                        {page === "register" ?
                            <a className={classes.register} href="/login" > Already have a user? </a> :
                            <a className={classes.register} href="/register" > New? Create user </a>
                        }
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}

export default LoginRegisterPage;