import BASEURL from "../../baseUrl.js";
import isUserRegistered from "./is_user_registered.js"

const getUserBookmarks = async () => {
    const isRegisteredUsers = isUserRegistered();
    if (!isRegisteredUsers) {
        return [];
    }

    const userData = JSON.parse(localStorage.getItem('user-data'));
    const { id, email } = userData;

    if (!id || !email) {
        return [];
    }

    try {
        const response = await fetch(`${BASEURL}/auth/get-bookmarks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                email
            })
        })
        const data = await response.json();
        return data.bookmarks
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default getUserBookmarks;