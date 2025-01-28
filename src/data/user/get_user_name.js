const getUserNameFromLocalStorage = () => {
    const userData = localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem(('user-data'))) : null;
    if (!userData) {
        return null;
    }
    if (userData.firstName === 'Guest') {
        return 'anonymous_user';
    }

    return `${userData.firstname} ${userData.lastname}`;
};

export default getUserNameFromLocalStorage;