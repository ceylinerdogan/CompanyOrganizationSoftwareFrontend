import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Button, Avatar, IconButton, Tooltip, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
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
    const [selectedFile, setSelectedFile] = useState(null);

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

    const roles = [
        { id: 1, name: 'ADMIN' },
        { id: 2, name: 'MANAGER' },
        { id: 3, name: 'USER' }
    ];

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
                localStorage.setItem('userDepartment', Response.data.department);
                localStorage.setItem('userRole', Response.data.role);
            })
            .catch((Error) => {
                console.error('user not found', Error);
            });
    }, [navigate2]);

    // Handle file selection and upload in one button click
    const handleFileChangeAndUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);

            // Proceed with file upload
            const formData = new FormData();
            formData.append('file', file);  // Append the file to the formData

            axios.post("https://delta1.eu-west-1.elasticbeanstalk.com/api/user/upload-profile-picture", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'  // Ensure the content type is multipart
                }
            })
                .then(response => {
                    console.log("Profile picture uploaded successfully", response.data);
                    

                    // Re-fetch the user data to update the profile picture
                    axios.get("https://delta1.eu-west-1.elasticbeanstalk.com/api/user/profile", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then((res) => {
                            setUserData(res.data);
                        })
                        .catch((err) => {
                            console.error('Error fetching updated user data:', err);
                        });

                        
                })
                .catch(error => {
                    console.error("Error uploading profile picture:", error);
                    alert("Failed to upload profile picture. Please try again.");
                });
        }
    };


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
                            {userData?.role === 'ADMIN' || userData?.role === 'MANAGER' ? (
                                <Button onClick={handleClickUserTable} style={{ marginRight: '50px', marginLeft: '10px', color: 'black' }} color="primary">
                                    {t('homepage.users')}
                                </Button>
                            ) : null}
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
                            width: '400px', height: '550px',
                            fontFamily: 'Arial, Helvetica, sans-serif', padding: '20px',
                            display: 'flex', flexDirection: 'column', alignItems: 'center'
                        }}>
                            <h1>{t('homepage.userInformations')}</h1>
                            {userData.profilePicture ? (
                                <Avatar
                                    alt="Profile"
                                    src={userData.profilePicture ? `data:image/jpeg;base64,${userData.profilePicture}` : "https://via.placeholder.com/150"}
                                    sx={{ width: 150, height: 150, marginBottom: '20px' }}
                                />
                            ) : (
                                <Avatar
                                    icon="user"
                                    alt="No Profile"
                                    sx={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '40px', }}
                                />
                            )}
                          
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileChangeAndUpload}
                            />

                            {/* Styled Upload Button as Underlined Text */}
                            <Tooltip title="Upload New Profile Picture">
                                <label htmlFor="fileInput">
                                    <Typography
                                        variant="body1"
                                        component="span"
                                        style={{
                                            color: '#1E90FF',
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                            marginTop: '10px'
                                        }}
                                    >
                                        {t('homepage.uploadProfile')}
                                    </Typography>
                                </label>
                            </Tooltip>

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
