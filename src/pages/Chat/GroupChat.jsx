import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {BsThreeDotsVertical} from "react-icons/bs";

const GroupChat = () => {
    const db =getDatabase()
    const data = useSelector((state) => state.userLoginInfo.userInfo)
    const [groupList, setGroupList] = useState([])

    useEffect(()=>{
        const groupRef = ref(db, "group")
        onValue(groupRef,(snapshot)=>{
            let list = []
            snapshot.forEach((item)=>{
                list.push({...item.val(), id:item.key})
            })
            setGroupList(list)
        })
    },[])
    return (
        <div className='list'>

            <div className="user_header flex items-center w-full justify-between">
                <h1>Groups</h1>
                <BsThreeDotsVertical/>

            </div>

            {
                groupList.map((item) => {
                    return (

                        <div key={item.id} className=" user_list ">

                            <div className='img_name'>
                            <div className='img relative'>
                            <img src="../../../public/image/dp.jpg" alt=""/>
                                                    
                            </div>

                                <div className='name'>
                                <h1>{item.groupName}</h1>
                                <h1 className="text-[12px] text-primary">Admin : {item.adminName}</h1>
                                 
                                </div>
                            </div>

                        </div>
                    )
                })
            }

        </div>
    );
};

export default GroupChat;