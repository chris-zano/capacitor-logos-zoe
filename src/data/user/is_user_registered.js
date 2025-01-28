const isUserRegistered = () => {
    const userData = localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem(('user-data'))) : null;
    if (!userData) {
        return false;
    }

    if (
        userData.firstName === 'Guest' ||
        userData.lastname === 'User' ||
        userData.email === 'user@guest.com' ||
        userData.id === '0' ||
        userData.id === 0 ||
        String(userData.id).length < 2
     ) {
        return false;
    }
    return true;
}

export default isUserRegistered;