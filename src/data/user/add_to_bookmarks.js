import BASEURL from "../../baseUrl.js";
import isUserRegistered from "./is_user_registered.js"

const addToBookmarks = async ({ item_id, item_type }) => {
    if (!item_id || !item_type) {
        alert('Invalid item to bookmark.');
        return;
    }
    const isRegisteredAndAuthenticatedUser = isUserRegistered();

    if (!isRegisteredAndAuthenticatedUser) {
        alert('You must be logged in to add a bookmark.');
        return;
    }

    const userData = JSON.parse(localStorage.getItem('user-data'));
    const { id, email } = userData;

    try {
        const response = await fetch(`${BASEURL}/auth/update-bookmarks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                email,
                item_id,
                item_type
            })
        })
        await response.json();
        if (response.ok) {
            alert('Bookmark updated successfully.');
            return;
        }
        return;
    } catch (error) {

    }
}

export default addToBookmarks;