import BASEURL from "../../baseUrl.js";

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

export const updateUserData = async (id) => {
    if (!id) {
        return null;
    }

    try {
        const uri = `${BASEURL}/profile?id=${id}`;
        const response = await fetch(
            uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            localStorage.setItem('user-data', JSON.stringify(data));
        }

    }catch(error) {
        console.error('Error updating user data:', error);
    }

    // window.location.reload();
}

export default getUserNameFromLocalStorage;