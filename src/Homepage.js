import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Button } from '@mui/material';

function Homepage() {
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [id, setId] = useState('');
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const ID = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const navigate1 = useNavigate();
    const navigate2 = useNavigate();

    const handleClickHomepage = () => {
        navigate1('/homepage');
    };

    const handleClickUserTable = () => {
        navigate2('/usertable');
    };

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
                setSuccessSnackbarOpen(true);
            })
            .catch((Error) => {
                console.error('user not found', Error);
                setErrorSnackbarOpen(true);
            });
    }, []);

    return (
        <div>
            <Button style={{ color: 'rgb(50, 68, 14)', position: 'absolute', top: 0, left: 0 }}
                onClick={() => setIsMenuOpen(true)}>
                <MenuIcon sx={{ fontSize: 30 }} />
            </Button>
            <Drawer anchor="left" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', padding: '10px' }}>Menu</h2>
                <div >
                    <Button onClick={handleClickHomepage} style={{ marginRight: '50px', marginLeft: '10px', color: 'black' }}>
                        Homepage
                    </Button>
                    <div>
                        <Button onClick={handleClickUserTable} style={{ marginRight: '50px', marginLeft: '10px', color: 'black' }} color="primary">
                            Users
                        </Button>
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
                        <h1>User Informations</h1>
                        <p>Name: {userData.data.name}</p>
                        <p>Surname: {userData.data.surname}</p>
                        <p>Company: {userData.data.company.name}</p>
                        <p>Department: {userData.data.department.name}</p>
                        <p>Role: {userData.data.role.name}</p>
                    </div>
                ) : (
                    <p>Data is loading...</p>
                )}
            </div>
        </div>


    );
}

export default Homepage;