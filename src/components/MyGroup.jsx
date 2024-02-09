import {MdOutlineInfo} from "react-icons/md";
import { MdConnectWithoutContact } from "react-icons/md";
import {BsThreeDotsVertical} from "react-icons/bs";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const MyGroup = () => {

    const db = getDatabase()
    const data = useSelector((state) => state.userLoginInfo.userInfo)

    const [grouplist, setGroupList] = useState([])
    const [show, setShow] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [groupJoinRequest, setGroupJoinRequest] = useState([])
    const [groupMenmbers, setGroupMembers] = useState([])

    //filtr my group
    
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
    //filtr my group

    const handleGroupDelete = (group)=>{
        remove(ref(db,'group/'+group.id))
    }

    //handle show request start

    const handleGroupRequest = (group)=>{
        setShow(true)
        const groupRequestRef = ref(db,'groupJoinRequest')
        onValue(groupRequestRef,(snapshot)=>{
            let list = []
            snapshot.forEach((item)=>{
                if(data.uid == item.val().adminId && item.val().groupId ==group.id){
                    list.push({...item.val(), key:item.key})
                }
            })
            setGroupJoinRequest(list)
        })
    }

    //handle show request end

    //accept join request

    const handleAcceptJoinRequest = (item)=>{
        set(push(ref(db, "groupMembers")),{
            groupId : item.groupId,
            groupName : item.groupName,
            adminId : item.adminId,
            adminName : item.adminName,
            userId : item.userId,
            userName : item.userName,
        }).then(()=>{
            remove(ref(db,'groupJoinRequest/'+ item.key))
        })
    }
    const handleDeleteJoinRequest = (item)=>{
        remove(ref(db,'groupJoinRequest/'+ item.key))
    }

    //group info start

    const handleGroupInfo = (group)=>{
        setShowInfo(true)
        const groupMembersRef = ref(db, 'groupMembers')
        onValue(groupMembersRef,(snapshot)=>{
            let list = []
            snapshot.forEach((item)=>{
                if(data.uid == group.adminId && item.val().groupId == group.id){
                    list.push({...item.val(), key:item.key})
                }
            })
            setGroupMembers(list)
        })
    }

    //group info end
    return (
        <div className='list'>

            <div className="user_header flex items-center w-full justify-between">
                <h1 >My Group</h1>
                {
                    show?
                    <button onClick={()=>setShow(false)} className="btn_v_3 bg-white text-primary">Back</button>
                    :
                    showInfo?
                    <button onClick={()=>setShowInfo(false)} className="btn_v_3 bg-white text-primary">Back</button>
                    :
                    <BsThreeDotsVertical/>
                }

            </div>
            {
                show?

                (
                    groupJoinRequest.length==0?
                    <h1 className="text-center
                    uppercase font-bold mt-10 text-primary">no join request found</h1>
                    :

                    groupJoinRequest.map((item)=>{
                        return(
                            <div key={item.id} className=" user_list ">
    
                            <div className='img_name'>
                                <div className='img'><img src="../../public/image/dp.jpg" alt=""/></div>
                                <div className='name'>
                                <h1 className="font-bold">{item.userName}</h1>
    
                                </div>
                            </div>
                            <div className="mr-3 flex items-center gap-2">
                               
                                <button onClick={()=>handleAcceptJoinRequest(item)} className="btn_v_3 font-semibold bg-green-500">Accept</button>
                                <button onClick={()=>handleDeleteJoinRequest(item)}  className="btn_v_3 font-semibold bg-red-500">Reject</button>
    
                            </div>
                        </div>
                        )
                    })
                )
                
                :

                    (
                        showInfo?
                        (
                            groupMenmbers.map((item)=>{
                                return(
                                    <div key={item.key} className=" user_list ">
    
                                    <div className='img_name'>
                                        <div className='img'><img src="../../public/image/dp.jpg" alt=""/></div>
                                        <div className='name'>
                                        <h1 className="font-bold">{item.userName}</h1>
                                    
                                        </div>
                                    </div>
                                    <div className="mr-3 flex items-center gap-2">
                               
                               <button onClick={()=>handleDeleteJoinRequest(item)}  className="btn_v_3 font-semibold bg-red-500">BAN</button>
   
                           </div>
                                </div>
                                )
                            })
                        )
                        :
                        grouplist.map(group=>{
                            return(
                                <div key={group.id} className=" user_list ">

                                <div className='img_name'>
                                    <div className='img'><img src="../../public/image/dp.jpg" alt=""/></div>
                                    <div className='name'>
                                    <h1 className="font-bold">{group.groupName}</h1>
                                    {
                                        data.uid===group.adminId?
                                        <p className="text-[12px] !text-primary">Tag : {group.tagName}</p>
                                        :
                                        <p className="text-[12px] !text-primary"> Admin : {group.adminName}</p>


                                    }
                                    </div>
                                </div>
                                <div className="mr-3 flex items-center gap-2">
                                    <button onClick={()=>handleGroupRequest(group)} title="Request" className="btn_v_3 bg-green-500 font-semibold"><MdConnectWithoutContact className=" text-[20px] "/></button>
                                    <button onClick={()=>handleGroupInfo(group)} className="btn_v_3 font-semibold"><MdOutlineInfo className=" text-[20px] "/></button>
                                    <button onClick={()=>handleGroupDelete(group)} className="btn_v_3 font-semibold bg-red-500"><MdDeleteOutline className=" text-[20px] "/></button>

                                </div>
                            </div>
                            )
                        })
                    )
                    }


        </div>
    );
};

export default MyGroup;