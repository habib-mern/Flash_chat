import {BsThreeDotsVertical} from "react-icons/bs";
import {useEffect, useState} from "react";
import {
    getDatabase,
    ref,
    onValue,
    remove,
    set,
    push
} from "firebase/database";
import {useSelector} from "react-redux";
import ProfilepictureRequest from "./ProfilePicture/ProfilepictureRequest";

const FriendRequest = () => {

    const db = getDatabase()

    const data = useSelector((state) => state.userLoginInfo.userInfo)

    const [friendRequestList, setFriendRequestList] = useState([])
    const [show, setShow] = useState(false)

    //Send friend request start

    useEffect(() => {
        const friendRequestRef = ref(db, "friendRequest")
        onValue(friendRequestRef, (snapshot) => {
            let friendRequest = []
            snapshot.forEach((item) => {
                if (item.val().receverId === data.uid) {

                    friendRequest.push({
                        ...item.val(),
                        id: item.key
                    })

                }
            })
            setFriendRequestList(friendRequest)
        })
    }, [])

    //Cancle Start

    const handleCancleFriendRequest = (item) => {
        remove(ref(db, "friendRequest/" + item.id))
        setShow(false)
    }

    //Cancle End Accept Start

    const handleAcceptFriendRequest = (item) => {
        set(push(ref(db, "friend")), {
            ...item
        }).then(() => {
            remove(ref(db, "friendRequest/" + item.id))
        })
    }

    //Accept End

    return (
        <div className='list'>

            <div className="user_header flex items-center w-full justify-between">
                <h1>Friend Request
                    <span className="font-extrabold ml-2 rounded-full px-2 bg-white text-primary">{friendRequestList.length}</span>
                </h1>
                <BsThreeDotsVertical/>

            </div>
            {
                friendRequestList.map((item, i) => {
                    return (

                            show
                            ? (
                                <div>
                                    <div className="text-center font-bold mt-10">
                                        <h1>Delete
                                            <span className="underline ">{item.senderName}</span>
                                        </h1>
                                    </div>

                                    <div
                                        className="opacity-100 font-bold flex gap-2 absolute z-[9] transform translate-x-[-50%] translate-y-[-50%] top-[55%] left-[50%]">

                                        <button
                                            onClick={() => handleCancleFriendRequest(item)}
                                            className="btn_v_3 bg-green-500">Confirm</button>
                                        <button onClick={() => setShow(false)} className="btn_v_3 bg-red-500">Cancel</button>
                                    </div>
                                </div>
                            )

                            : <div key={i}>
                                <div className=" user_list relative ">
                                    <div className='img_name'>
                                        <ProfilepictureRequest user={item}/>
                                        <div className='name'>
                                            <h1>{item.senderName}</h1>
                                        </div>
                                    </div>
                                    <div className="mr-3 flex gap-1 ">
                                        <button onClick={() => handleAcceptFriendRequest(item)} className="btn_v_3 ">Accept</button>
                                        <button onClick={() => setShow(true)} className="btn_v_3 bg-red-500">Delete</button>
                                    </div>

                                </div>
                            </div>

                        )
                })
            }

        </div>
    );
};

export default FriendRequest;