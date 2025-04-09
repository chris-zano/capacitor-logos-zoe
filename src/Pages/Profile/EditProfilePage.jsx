import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BASEURL from '../../baseUrl.js';
import { updateUserData } from '../../data/user/get_user_name.js';

const getUserDataFromLocalStorage = () => {
    const userDataString = localStorage.getItem('user-data');
    if (!userDataString) {
        console.warn("No 'user-data' found in localStorage.");
        return null;
    }
    try {
        const userData = JSON.parse(userDataString);
        return {
            id: userData.id || '',
            firstname: userData.firstname || '',
            lastname: userData.lastname || '',
            profilePicture: userData.profilePicture || 'none'
        };
    } catch (error) {
        console.error("Failed to parse 'user-data' from localStorage:", error);
        return null;
    }
};

export default function EditProfilePage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const [file, setFile] = useState(null);


    const [imagePreviewUrl, setImagePreviewUrl] = useState('');


    const [error, setError] = useState('');
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        const initialData = getUserDataFromLocalStorage();

        if (initialData) {
            setUserId(initialData.id);
            setFirstName(initialData.firstname);
            setLastName(initialData.lastname);

            if (initialData.profilePicture && initialData.profilePicture !== 'none') {
                setImagePreviewUrl(initialData.profilePicture);
            } else {
                setImagePreviewUrl('');
            }

        } else {

            setImagePreviewUrl('');
        }
        setInitialLoadComplete(true);
    }, []);


    useEffect(() => {


        let currentPreviewUrl = imagePreviewUrl;
        return () => {

            if (currentPreviewUrl && currentPreviewUrl.startsWith('blob:')) {

                URL.revokeObjectURL(currentPreviewUrl);
            }
        };
    }, [imagePreviewUrl]);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);


            const newPreviewUrl = URL.createObjectURL(selectedFile);

            setImagePreviewUrl(newPreviewUrl);
        }
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }


    const updateProfilePicture = async (e) => {
        e.preventDefault();
        setError('');


        if (!userId) {
            setError('User ID not available.'); return;
        }
        if (!file) {
            setError('Please select a profile picture file.'); return;
        }


        try {
            const uri = `${BASEURL}/profile/picture?id=${userId}`;
            const formData = new FormData();
            formData.append('profilePicture', file);

            const response = await fetch(uri, { method: 'PATCH', body: formData });
            if (!response.ok) { throw new Error('Network response was not ok'); }

            const data = await response.json();
            alert('Profile picture updated successfully!');
            updateUserData(userId);
        } catch (error) {
            setError(`Failed to update profile picture: ${error.message}`);
            console.error('Error updating profile picture:', error);
        }
    }

    const updateFirstName = async (e) => {
        e.preventDefault();
        setError('');


        if (!userId) { setError('User ID not available.'); return; }
        if (!firstName.trim()) { setError('First name cannot be empty.'); return; }
        try {
            const uri = `${BASEURL}/profile/firstname?id=${userId}`;

            const body = JSON.stringify({ firstName: firstName });
            const headers = { 'Content-Type': 'application/json' };

            const response = await fetch(uri, { method: 'PATCH', headers: headers, body: body });
            if (!response.ok) { throw new Error('Network response was not ok'); }
            await response.json();
            alert('First name updated successfully!');
            updateUserData(userId);
        } catch (error) {
            setError(`Failed to update first name: ${error.message}`);
            console.error('Error updating first name:', error);
        }
    }

    const updateLastName = async (e) => {
        e.preventDefault();
        setError('');


        if (!userId) { setError('User ID not available.'); return; }
        if (!lastName.trim()) { setError('Last name cannot be empty.'); return; }
        try {
            const uri = `${BASEURL}/profile/lastname?id=${userId}`;

            const body = JSON.stringify({ lastName: lastName });
            const headers = { 'Content-Type': 'application/json' };

            const response = await fetch(uri, { method: 'PATCH', headers: headers, body: body });
            if (!response.ok) { throw new Error('Network response was not ok'); }
            await response.json();
            alert('Last name updated successfully!');
            updateUserData(userId);
        } catch (error) {
            setError(`Failed to update last name: ${error.message}`);
            console.error('Error updating last name:', error);
        }
    }


    const fieldStyle = { marginBottom: '20px', padding: '10px', borderRadius: '5px' };
    const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: '400' };
    const inputStyle = { width: '95%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '3px', fontFamily: 'Poppins', backgroundColor: 'var(--modal-background)', color: 'var(--text)', fontSize: '0.99rem' };
    const buttonStyle = { backgroundColor: 'var(--purple)', color: 'white', border: 'none', borderRadius: '1ch', padding: '1ch 2ch', cursor: 'pointer', fontFamily: 'Poppins', fontSize: '0.89rem', marginTop: '5px' };
    const imagePreviewStyle = { margin: '1ch auto', width: '200px', height: '200px', display: 'block', marginBottom: '10px', borderRadius: '50%', border: '1px solid #ddd', objectFit: 'cover' };
    const errorStyle = { color: 'red', marginTop: '10px', fontSize: '0.9em' };

    if (!initialLoadComplete) {
        return <div>Loading profile data...</div>;
    }

    return (
        <div>
            <header>
                <div id="read-appbar">
                    <div className="row" style={{ display: "flex", justifyContent: "space-between", padding: "0 3ch 0 1ch" }}>
                        <button onClick={() => window.history.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span style={{ marginLeft: "2ch", fontSize: '0.99rem' }} className="poppins-regular">
                                Edit Profile
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <section style={{ marginTop: '3.2rem', padding: '1ch', display: 'flex', flexDirection: 'column', gap: '1ch', fontFamily: 'Poppins' }}>

                {error && <div style={errorStyle}>{error}</div>}

                <form onSubmit={updateProfilePicture}>
                    <div style={fieldStyle}>
                        <label htmlFor="profilePictureFile" style={labelStyle}>Profile Picture</label>
                        {imagePreviewUrl && (
                            <img
                                style={imagePreviewStyle}
                                src={imagePreviewUrl}
                                alt="Profile preview"

                                onError={(e) => { e.target.src = '/path/to/default/avatar.png'; }}
                            />
                        )}
                        <input
                            style={inputStyle}
                            type='file'
                            accept='image/*'
                            id="profilePictureFile"
                            name="profilePictureFile"
                            onChange={handleFileChange}

                        />
                        <button type="submit" style={buttonStyle}>Save</button>
                    </div>
                </form>

                <form onSubmit={updateFirstName}>
                    <div style={fieldStyle}>
                        <label htmlFor="firstname" style={labelStyle}>First Name</label>
                        <input
                            style={inputStyle}
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            placeholder="Enter first name"
                            required
                        />
                        <button type="submit" style={buttonStyle}>Save</button>
                    </div>
                </form>

                <form onSubmit={updateLastName}>
                    <div style={fieldStyle}>
                        <label htmlFor="lastname" style={labelStyle}>Last Name</label>
                        <input
                            style={inputStyle}
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={handleLastNameChange}
                            placeholder="Enter last name"
                            required
                        />
                        <button type="submit" style={buttonStyle}>Save</button>
                    </div>
                </form>
            </section>
        </div>
    );
}