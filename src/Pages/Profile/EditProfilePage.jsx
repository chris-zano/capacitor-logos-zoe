import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCamera, faCheck } from "@fortawesome/free-solid-svg-icons";
import BASEURL from '../../baseUrl.js';
import { updateUserData } from '../../data/user/get_user_name.js';
import avatar1 from '../../assets/images/avatar1.jpg'

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
    const [success, setSuccess] = useState('');
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const showSuccessMessage = (message) => {
        setSuccess(message);
        setTimeout(() => setSuccess(''), 3000);
    }

    const updateProfilePicture = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        if (!userId) {
            setError('User ID not available.');
            setIsSubmitting(false);
            return;
        }
        if (!file) {
            setError('Please select a profile picture file.');
            setIsSubmitting(false);
            return;
        }

        try {
            const uri = `${BASEURL}/profile/picture?id=${userId}`;
            const formData = new FormData();
            formData.append('profilePicture', file);

            const response = await fetch(uri, { method: 'PATCH', body: formData });
            if (!response.ok) { throw new Error('Network response was not ok'); }

            const data = await response.json();
            showSuccessMessage('Profile picture updated successfully!');
            updateUserData(userId);
        } catch (error) {
            setError(`Failed to update profile picture: ${error.message}`);
            console.error('Error updating profile picture:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const updateFirstName = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        if (!userId) {
            setError('User ID not available.');
            setIsSubmitting(false);
            return;
        }
        if (!firstName.trim()) {
            setError('First name cannot be empty.');
            setIsSubmitting(false);
            return;
        }
        try {
            const uri = `${BASEURL}/profile/firstname?id=${userId}`;
            const body = JSON.stringify({ firstName: firstName });
            const headers = { 'Content-Type': 'application/json' };

            const response = await fetch(uri, { method: 'PATCH', headers: headers, body: body });
            if (!response.ok) { throw new Error('Network response was not ok'); }
            await response.json();
            showSuccessMessage('First name updated successfully!');
            updateUserData(userId);
        } catch (error) {
            setError(`Failed to update first name: ${error.message}`);
            console.error('Error updating first name:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const updateLastName = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        if (!userId) {
            setError('User ID not available.');
            setIsSubmitting(false);
            return;
        }
        if (!lastName.trim()) {
            setError('Last name cannot be empty.');
            setIsSubmitting(false);
            return;
        }
        try {
            const uri = `${BASEURL}/profile/lastname?id=${userId}`;
            const body = JSON.stringify({ lastName: lastName });
            const headers = { 'Content-Type': 'application/json' };

            const response = await fetch(uri, { method: 'PATCH', headers: headers, body: body });
            if (!response.ok) { throw new Error('Network response was not ok'); }
            await response.json();
            showSuccessMessage('Last name updated successfully!');
            updateUserData(userId);
        } catch (error) {
            setError(`Failed to update last name: ${error.message}`);
            console.error('Error updating last name:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 16px'
    };

    const headerStyle = {
        position: 'sticky',
        top: '0',
        background: 'var(--background)',
        padding: '16px 0',
        borderBottom: '1px solid var(--border)',
        zIndex: '100',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    };

    const backButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'none',
        border: 'none',
        color: 'var(--text)',
        fontSize: '1.5rem',
        cursor: 'pointer'
    };

    const sectionStyle = {
        marginTop: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    };

    const cardStyle = {
        background: 'var(--card-background)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    };

    const formGroupStyle = {
        marginBottom: '20px'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '500',
        color: 'var(--text)',
        fontSize: '0.95rem'
    };

    const inputStyle = {
        margin: '1ch 0',
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid var(--light-gray)',
        background: 'var(--input-background)',
        color: 'var(--text)',
        fontSize: '1rem',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        background: 'var(--purple)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 20px',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background 0.2s ease'
    };

    const avatarContainerStyle = {
        position: 'relative',
        width: '120px',
        height: '120px',
        margin: '0 auto 20px',
        borderRadius: '50%',
    };

    const avatarStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover'
    };

    const uploadButtonStyle = {
        position: 'absolute',
        bottom: '0',
        right: '10px',
        background: 'var(--purple)',
        color: 'white',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: 'none',
        zIndex: '10'
    };

    const fileInputStyle = {
        display: 'none'
    };

    const errorStyle = {
        color: 'var(--error)',
        fontSize: '0.9rem',
        marginTop: '8px'
    };

    const successStyle = {
        color: 'var(--success)',
        fontSize: '0.9rem',
        marginTop: '8px'
    };

    if (!initialLoadComplete) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                Loading profile data...
            </div>
        );
    }

    return (
        <div style={containerStyle} className='poppins-regular'>
            <header style={headerStyle}>
                <button onClick={() => window.history.back()} style={backButtonStyle}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h1 style={{ margin: '0', fontSize: '1.25rem' }}>Edit Profile</h1>
            </header>

            <main style={sectionStyle}>
                <div style={cardStyle}>
                    <form onSubmit={updateProfilePicture}>
                        <div style={formGroupStyle}>
                            <label style={labelStyle}>Profile Picture</label>
                            <div style={avatarContainerStyle}>
                                <img
                                    src={imagePreviewUrl || avatar1}
                                    alt="Profile preview"
                                    style={avatarStyle}
                                    onError={(e) => { e.target.src = avatar1; }}
                                />
                                <label style={uploadButtonStyle}>
                                    <FontAwesomeIcon icon={faCamera} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={fileInputStyle}
                                    />
                                </label>
                            </div>
                            <button
                                type="submit"
                                style={buttonStyle}
                                disabled={!file || isSubmitting}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                                {isSubmitting ? 'Saving...' : 'Save Picture'}
                            </button>
                            {error && <div style={errorStyle}>{error}</div>}
                            {success && <div style={successStyle}>{success}</div>}
                        </div>
                    </form>
                </div>

                <div style={cardStyle}>
                    <form onSubmit={updateFirstName}>
                        <div style={formGroupStyle}>
                            <label htmlFor="firstName" style={labelStyle}>First Name</label>
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
                            <button
                                type="submit"
                                style={buttonStyle}
                                disabled={isSubmitting}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                                {isSubmitting ? 'Saving...' : 'Save First Name'}
                            </button>
                        </div>
                    </form>
                </div>

                <div style={cardStyle}>
                    <form onSubmit={updateLastName}>
                        <div style={formGroupStyle}>
                            <label htmlFor="lastName" style={labelStyle}>Last Name</label>
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
                            <button
                                type="submit"
                                style={buttonStyle}
                                disabled={isSubmitting}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                                {isSubmitting ? 'Saving...' : 'Save Last Name'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}