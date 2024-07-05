import { USERNAME, PASSWORD, getAlbums, getPhysicalAlbums } from "../Constant/constants";

const prepareMedia = (images, videos) => {
    const mediaArray = [];
    let videosCount = videos.length;
    const items = [...images];
    let flag = true;

    while (items.length > 0 || videosCount > 0) {
        if (videosCount > 0 && items.length > 0) {
            if(flag){
                const video = videos.shift();
                const imagesForRow = items.splice(0, 2);

                mediaArray.push({ type: 'video', item: video });
                mediaArray.push(...imagesForRow.map(image => ({ type: 'image', item: image })));
                videosCount--;
            }else{
                const video = videos.shift();
                const imagesForRow = items.splice(0, 2);

                mediaArray.push(...imagesForRow.map(image => ({ type: 'image', item: image })));
                mediaArray.push({ type: 'video', item: video });
                videosCount--;
            }
            flag = !flag;
        } else if (items.length > 0) {
            const imagesForRow = items.splice(0, 4);
            mediaArray.push(...imagesForRow.map(image => ({ type: 'image', item: image })));
        }
    }
    return mediaArray;
};

const getData = async (response, setMedia) => {

    if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.body)) {
            const newImages = data.body.filter(item => /\.(jpg|jpeg|png|gif)$/i.test(item.name));
            const newVideos = data.body.filter(item => /\.(mp4|mov|avi|mkv)$/i.test(item.name));

            const preparedMedia = prepareMedia(newImages, newVideos);
            setMedia(preparedMedia);
            
        } else {
            console.error("Unexpected response format:", data);
        }
    } else {
        console.error("Failed to fetch albums:", response.statusText);
    }
}


export const fetchAlbums = async (albumId,  setMedia) => {

    const basicAuth = 'Basic ' + btoa(USERNAME + ':' + PASSWORD);
    const queryParams = new URLSearchParams({
        folderId: albumId,
    }).toString();
    

    try {
        const response = await fetch(`${getAlbums}?${queryParams}`, {
            method: 'GET',
            headers: {
                'Authorization': basicAuth,
                'Content-Type': 'application/json',
            },
        });

        getData(response, setMedia);

    } catch (error) {
        console.error("Error fetching albums:", error);
    }

};


export const fetchPhysicalAlbums = async (id, setMedia) => {
    const basicAuth = 'Basic ' + btoa(USERNAME + ':' + PASSWORD);
    const queryParams = new URLSearchParams({
        eventId: id,
    }).toString();
    

    try {
        const response = await fetch(`${getPhysicalAlbums}?${queryParams}`, {
            method: 'GET',
            headers: {
                'Authorization': basicAuth,
                'Content-Type': 'application/json',
            },
        });

        getData(response, setMedia);

    } catch (error) {
        console.error("Error fetching albums:", error);
    }
}