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
        setAccessToken(token);
        setId(ID);
        const link = "https://delta.eu-west-1.elasticbeanstalk.com/users/" + ID;
        axios.get(link, {
            headers: { Authorization: token }
        })
            .then((Response) => {
                console.log("user found", Response.data);
                setUserData(Response.data);
            })
            .catch((Error) => {
                console.error('user not found', Error);
            });
    },
        []);

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
                    <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', padding: '10px' }}>Menu</h2>
                    <div >
                        <Button style={{ marginRight: '50px', marginLeft: '10px', color: 'black' }}>
                            {t('usertable.homepage')}
                        </Button>
                        <div>
                            <Button onClick={handleClickUserTable} style={{ marginRight: '50px', marginLeft: '10px', color: 'black' }} color="primary">
                                {t('usertable.users')}
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
                                <p>{t('usertable.pleaseLogin')}</p>
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
                            width: '400px', height: '275px',
                            fontFamily: 'Arial, Helvetica, sans-serif'
                        }} >
                            <h1>{t('usertable.userInformations')}</h1>
                            <p>{t('usertable.name')} {userData.data.name}</p>
                            <p>{t('usertable.surname')} {userData.data.surname}</p>
                            <p>{t('usertable.company')} {userData.data.company.name}</p>
                            <p>{t('usertable.department')} {userData.data.department.name}</p>
                            <p>{t('usertable.role')} {userData.data.role.name}</p>
                        </div>
                    ) : (
                        <p>{t('usertable.dataLoading')}</p>
                    )}
                </div>
            </div>


        );
    }


}

export default Homepage;