import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {useEffect, useState} from "react";

const ProfilePicture = ({item}) => {
    const storage = getStorage()
    const [image, setImage] = useState('')

    const profilePitureRef = ref(storage, item.id)

    useEffect(() => {
        getDownloadURL(profilePitureRef)
            .then((url) => {
                setImage(url)
            })
            .catch((error) => {
                console.log(error)
            })
        })

    return (
        <div>
            <div className='img relative'>
                {
                    image
                        ? <img src={image} alt=""/>
                        : <h1
                                className="font-bold text-white absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">{item.username[0]}</h1>

                }
            </div>
        </div>
    );
};

export default ProfilePicture;