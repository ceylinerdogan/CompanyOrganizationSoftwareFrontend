import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';

function Homepage() {
    const { t } = useTranslation();
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [id, setId] = useState('');
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);

    const ID = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const navigate1 = useNavigate();
    const navigate2 = useNavigate();

    const handleClickUserTable = () => {
        navigate2('/usertable');
    };

    const Logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        navigate1('/');
        setLoggedIn(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');  // Retrieve the token from localStorage
        if (!token) {
            console.error("No token found, redirecting to login page.");
            navigate2('/');  // If no token, redirect to login
            return;
        }
        const link = "https://delta1.eu-west-1.elasticbeanstalk.com/api/user/profile";
        axios.get(link, {
            headers: {
                Authorization: `Bearer ${token}`  // Include Bearer token in the Authorization header
            }
        })
            .then((Response) => {
                console.log("user found", Response.data);
                setUserData(Response.data);  // Set user data directly from the response
            })
            .catch((Error) => {
                console.error('user not found', Error);
            });
    }, [navigate2]);

    if (token == null) {
        navigate1('/');
    } else {
        return (
            <div>
                <Button style={{ color: 'rgb(50, 68, 14)', position: 'absolute', top: 0, left: 0 }}
                    onClick={() => setIsMenuOpen(true)}>
                    <MenuIcon sx={{ fontSize: 30 }} />
                </Button>
                <Drawer anchor="left" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                    <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', padding: '10px' }}>{t('homepage.menu')}</h2>
                    <div>
                        <Button style={{ marginRight: '50px', marginLeft: '10px', color: 'black' }}>
                            {t('homepage.homepage')}
                        </Button>
                        <div>
                            <Button onClick={handleClickUserTable} style={{ marginRight: '50px', marginLeft: '10px', color: 'black' }} color="primary">
                                {t('homepage.users')}
                            </Button>
                        </div>
                        <div>
                            {loggedIn ? (
                                <>
                                    <Button onClick={Logout} style={{ marginRight: '50px', marginLeft: '10px', color: 'black' }} color="primary">
                                        <LogoutIcon />
                                    </Button>
                                </>
                            ) : (
                                <p>{t('homepage.pleaseLogin')}</p>
                            )}
                        </div>
                    </div>
                </Drawer>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center', alignItems: 'center', minHeight: '100vh'
                }}>
                    {userData ? (
                        <div style={{
                            backgroundColor: 'rgb(50, 68, 14)', color: 'whitesmoke',
                            width: '400px', height: '325px',
                            fontFamily: 'Arial, Helvetica, sans-serif', padding: '20px'
                        }}>
                            <h1>{t('homepage.userInformations')}</h1>
                            <p>{t('homepage.name')} {userData.firstName}</p>
                            <p>{t('homepage.surname')} {userData.lastName}</p>
                            <p>{t('homepage.company')} {userData.company}</p>
                            <p>{t('homepage.department')} {userData.department}</p>
                            <p>{t('homepage.role')} {userData.role}</p>
                        </div>
                    ) : (
                        <p>{t('homepage.dataLoading')}</p>
                    )}
                </div>
            </div>
        );
    }
}

export default Homepage;
