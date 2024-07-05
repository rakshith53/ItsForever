import { USERNAME, PASSWORD, pageOneAndTwo } from "../Constant/constants";

const fetchData = async(id, setItemName, setCoverPhotoURL, setDate, setPhotographer, setDescription, getPhotographer) => {  

    const basicAuth = 'Basic ' + btoa(USERNAME + ':' + PASSWORD);

    try {
        const eventResponse = await fetch(`${pageOneAndTwo}${id}`, {
            method: 'GET',
            headers: {
                'Authorization': basicAuth,
                'Content-Type': 'application/json'
            }
        });

        if (eventResponse.ok) {
            const eventData = await eventResponse.json();
            setItemName(eventData.body.name);
            setCoverPhotoURL(eventData.body.coverPhotoLink);
            setDate(eventData.body.date);
            setPhotographer(getPhotographer(eventData.body.vendors));
            setDescription(eventData.body.description);
        } else {
            console.error("Failed to fetch event data");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


export default fetchData;