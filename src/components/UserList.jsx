import {IoMdPersonAdd} from "react-icons/io";
import {BsThreeDotsVertical} from "react-icons/bs";
import {ImCancelCircle} from "react-icons/im";
import {useEffect, useState} from "react";
import {getDatabase, ref, onValue, push, remove} from "firebase/database";
import {useSelector} from "react-redux";
import {set} from "firebase/database";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import {MdDoneOutline} from "react-icons/md";

const UserList = () => {

    const db = getDatabase()

    const data = useSelector((state) => state.userLoginInfo.userInfo)

    const [userList, setUserList] = useState([]);
    const [friendRequestList, setFriendRequestList] = useState([])
    const [friendtList, setFriendList] = useState([])

    //get all user frome database start
    useEffect(() => {
        const userRef = ref(db, "users")

        let list = []
        onValue(userRef, (snapshot) => {
            snapshot.forEach((item) => {
                if (data.uid !== item.key) {

                    list.push({
                        ...item.val(),
                        id: item.key
                    })
                    setUserList(list)
                }
            })
        })
    }, []);
    //get all user frome database end Send friend request start

    const handleFriendRequest = (item) => {
        set(push(ref(db, "friendRequest")), {
            senderId: data.uid,
            senderName: data.displayName,
            receverId: item.id,
            receverName: item.username

        })

    }

    useEffect(() => {
        const friendRequestRef = ref(db, "friendRequest")
        onValue(friendRequestRef, (snapshot) => {
            let friendRequest = []
            snapshot.forEach((item) => {
                friendRequest.push(item.val().receverId + item.val().senderId)

            })
            setFriendRequestList(friendRequest)
        })
    }, [])

    //Send friend request end Cancle request Start
    const handleCancleFriendRequest = (item) => {
        console.log(item)
        remove(ref(db, "friendRequest/" + item.id))

    }
    //Cancle request Start

    useEffect(() => {
        const friendListRef = ref(db, "friend")
        onValue(friendListRef, (snapshot) => {
            let friendList = []
            snapshot.forEach((item) => {
                friendList.push(item.val().receverId + item.val().senderId)
            })
            setFriendList(friendList)
        })

    }, [])

    return (
        <div className='list'>

            <div className="user_header flex items-center w-full justify-between">
                <h1>User List</h1>
                <BsThreeDotsVertical/>

            </div>

            {
                userList.map((item) => {
                    return (
                        <div key={item.id} className=" user_list ">

                            <div className='img_name'>
                                <ProfilePicture item={item}/>
                                <div className='name'>
                                    <h1>{item.username}</h1>
                                </div>
                            </div>
                            <div className="mr-3">
                                {
                                    friendtList.includes(item.id + data.uid) || friendtList.includes(
                                        data.uid + item.id
                                    )
                                        ? <div className="flex items-center">
                                                <button className="btn_v_3 !bg-green-500 mr-2 ">
                                                    <span className="font-bold mr-2">Friend</span><MdDoneOutline className=" text-[21px]  "/></button>
                                            </div>
                                        : <div>
                                                {
                                                    friendRequestList.includes(item.id + data.uid) || friendRequestList.includes(
                                                        data.uid + item.id
                                                    )
                                                        ? <div className="flex items-center">

                                                                <button
                                                                    onClick={() => handleCancleFriendRequest(item)}
                                                                    className="btn_v_3 !bg-red-500 font-bold items-center">Cancel<ImCancelCircle className="text-[18px] ml-1"/></button>
                                                            </div>
                                                        : <button onClick={() => handleFriendRequest(item)} className="btn_v_3 "><IoMdPersonAdd className=" text-[20px] "/></button>

                                                }
                                            </div>
                                }
                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
};

export default UserList;