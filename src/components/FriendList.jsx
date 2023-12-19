import {PiMessengerLogoBold} from "react-icons/pi";
import {BsThreeDotsVertical} from "react-icons/bs";
import {MdBlock} from "react-icons/md";
import {useEffect, useState} from "react";
import {getDatabase, ref, onValue, push, set, remove} from "firebase/database";
import {useSelector} from "react-redux";
import ProfilepictureRequest from "./ProfilePicture/ProfilepictureRequest";
import {getDownloadURL, getStorage} from "firebase/storage";
import ProfilePictureFriendList from "./ProfilePicture/ProfilePictureFriendList";

const FriendList = () => {

    const db = getDatabase()

    const data = useSelector((state) => state.userLoginInfo.userInfo)
    

    const [friendtList, setFriendList] = useState([])

    useEffect(() => {
        const friendListRef = ref(db, "friend/")
        onValue(friendListRef, (snapshot) => {
            let list = []
            snapshot.forEach((item) => {
                if (data.uid === item.val().receverId || data.uid === item.val().senderId) {
                    list.push({
                        ...item.val(),
                        key: item.key
                    })
                }
            })
            setFriendList(list)

        })

    }, [])

    //block start
    const handleBlock = (item)=>{
        if(data.uid == item.senderId){
            set(push(ref(db,"block")),{
                
                blockName: item.receverName,
                blockId: item.receverId,
                blockByName: item.senderName,
                blockById: item.senderId,
            }).then(()=>{
                remove(ref(db, "friend/"+item.key))
            })

        }
        else{
            set(push(ref(db,"block")),{
                
                blockName: item.senderName,
                blockId: item.senderId,
                blockByName: item.receverName,
                blockById: item.receverId,
            }).then(()=>{
                remove(ref(db, "friend/"+item.key))
            })
        }
    }
    //block end

    return (
        <div className='list'>

            <div className="user_header flex items-center w-full justify-between">
                <h1>Friends</h1>
                <BsThreeDotsVertical/>

            </div>

            {
                friendtList.map((item, i) => {
                    return (

                        <div key={item.key} className=" user_list ">

                            <div className='img_name'>

                                {
                                    data.uid == item.receverId
                                        ? <ProfilePictureFriendList user={item.senderId}/>

                                        : <ProfilePictureFriendList user={item.receverId}/>

                                }

                                <div className='name'>
                                    {
                                        data.uid == item.receverId
                                            ? <h1>{item.senderName}</h1>
                                            : <h1>{item.receverName}</h1>
                                    }
                                </div>
                            </div>
                            <div className="mr-3 flex gap-1">
                                <button className="btn_v_3 "><PiMessengerLogoBold className=" text-[20px] "/></button>
                                <button onClick={()=>handleBlock(item)} className="btn_v_3 bg-red-500 "><MdBlock className=" text-[20px] "/></button>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
};

export default FriendList;