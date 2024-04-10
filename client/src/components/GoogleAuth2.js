import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

import { signIn, signOut } from '../actions';

const GoogleAuth = ({ isSignedIn, signIn, signOut }) => {
    const [profile, setProfile] = useState();

    // useEffect(() => {
    //     if (profile) {
    //         signIn(profile.id);
    //     }

    //     return () => {
    //         // Cleanup logic can go here if needed
    //     };
    // }, [profile]);

    const handleLoginSuccess = async (tokenResponse) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                    Accept: 'application/json'
                }
            });

            setProfile(response.data);
            signIn(response.data.id);
        } catch (error) {
            console.error('Error fetching user data: ', error);
        }
    };

    const handleLoginError = (error) => {
        console.error('Login Failed ', error);
    };

    const login = useGoogleLogin({
        onSuccess: handleLoginSuccess,
        onError: handleLoginError
    });

    const handleLogout = () => {
        googleLogout();
        setProfile(null);
        signOut();
    };

    return (
        <div>
            {profile ? (
                <button className='ui red google button' onClick={handleLogout}>
                    <i className='google icon' />
                    Sign out
                </button>
            ) : (
                <button className='ui red google button' onClick={login}>
                    <i className='google icon' />
                    Sign in with Google
                </button>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
