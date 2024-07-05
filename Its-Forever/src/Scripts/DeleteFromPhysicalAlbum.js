import { USERNAME, PASSWORD, addToPhysicalALbum } from "../Constant/constants";

const handleDeletePhysicalAlbumClick = async (id) => {

    const basicAuth = 'Basic ' + btoa(USERNAME + ':' + PASSWORD);

    const body = {
        addToPhysicalAlbum: false,
        fileIds: [id],
    };

    try{
        const response = await fetch(addToPhysicalALbum, {
            method: 'POST',
            headers: {
                'Authorization': basicAuth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            alert("Photo deleted from physical album");
        } else {
            alert("Failed to delete photo to physical album");
        }
    
    }catch(e){
        console.log(e);
    }
};

export default handleDeletePhysicalAlbumClick;