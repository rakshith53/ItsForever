import { USERNAME, PASSWORD, addToPhysicalALbum } from "../Constant/constants";

const handleAddPhysicalAlbumClick = async (id) => {

    const basicAuth = 'Basic ' + btoa(USERNAME + ':' + PASSWORD);

    const body = {
        addToPhysicalAlbum: true,
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
            alert("Photo added to physical album");
        } else {
            alert("Failed to add photo to physical album");
        }
    
    }catch(e){
        console.log(e);
    }
};

export default handleAddPhysicalAlbumClick;