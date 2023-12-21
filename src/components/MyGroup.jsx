import {MdOutlineInfo} from "react-icons/md";
import { MdConnectWithoutContact } from "react-icons/md";
import {BsThreeDotsVertical} from "react-icons/bs";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const MyGroup = () => {

    const db = getDatabase()
    const data = useSelector((state) => state.userLoginInfo.userInfo)

    const [grouplist, setGroupList] = useState([])

    useEffect(()=>{
        const groupRef = ref(db,"group")

        onValue(groupRef,(snapshot)=>{
            let list = []
            snapshot.forEach((item)=>{
                if(data.uid === item.val().adminId){
                    list.push({...item.val(),id:item.key})
                }
            })
            setGroupList(list)
        })
    },[])
    return (
        <div className='list'>

            <div className="user_header flex items-center w-full justify-between">
                <h1>My Group</h1>
                <BsThreeDotsVertical/>

            </div>
            {
                        grouplist.map(item=>{
                            return(
                                <div key={item.id} className=" user_list ">

                                <div className='img_name'>
                                    <div className='img'><img src="../../public/image/dp.jpg" alt=""/></div>
                                    <div className='name'>
                                    <h1 className="font-bold">{item.groupName}</h1>
                                    {
                                        data.uid===item.adminId?
                                        <p className="text-[12px] !text-primary">Tag : {item.tagName}</p>
                                        :
                                        <p className="text-[12px] !text-primary"> Admin : {item.adminName}</p>


                                    }
                                    </div>
                                </div>
                                <div className="mr-3 flex items-center gap-2">
                                    <button title="Request" className="btn_v_3 bg-green-500 font-semibold"><MdConnectWithoutContact className=" text-[20px] "/></button>
                                    <button className="btn_v_3 font-semibold"><MdOutlineInfo className=" text-[20px] "/></button>

                                </div>
                            </div>
                            )
                        })
                    }


        </div>
    );
};

export default MyGroup;