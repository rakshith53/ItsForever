import { USERNAME, PASSWORD, pageThree } from "../Constant/constants";

const fetchFolderData = async (id, setFolderData) => {

    const basicAuth = 'Basic ' + btoa(USERNAME + ':' + PASSWORD);
        const queryParams = new URLSearchParams({
            eventId: id
        }).toString();

    try {
        const folderUrl = `${pageThree}?${queryParams}`;
        const folderResponse = await fetch(folderUrl, {
            method: 'GET',
            headers: {
                'Authorization': basicAuth,
                'Content-Type': 'application/json'
            }
        });

        if (folderResponse.ok) {
            const foldersData = await folderResponse.json();
            setFolderData(foldersData.body)
        } else {
            console.error("Failed to fetch folder data");
        }  
    } catch (error) {
        console.error("Error fetching folder data:", error);
    }
}


export default fetchFolderData;