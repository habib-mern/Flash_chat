import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";

import {MdGroupAdd, MdOutlineCancel} from "react-icons/md";
import { useSelector } from "react-redux";
import PropagateLoader from "react-spinners/PropagateLoader";
import { toast } from "react-toastify";

const GroupList = () => {

    const db = getDatabase()
    const data = useSelector((state) => state.userLoginInfo.userInfo)

    const [show, setShow] = useState(false)
    const [groupName, setGroupName] = useState("")
    const [tagName, setTagName] = useState("")
    const [loading, setLoading] = useState(false)
    const [grouplist, setGroupList] = useState([])


    const handleGroupName = (e)=>{
        setGroupName(e.target.value)

    }
    const handleTagName = (e)=>{
        setTagName(e.target.value)

    }
    const handleCreatGroup = ()=>{
        if(groupName && tagName){
            setLoading(true)
            set(push(ref(db, "group")),{
                groupName: groupName,
                tagName: tagName,
                adminName: data.displayName,
                adminId: data.uid
            }).then(()=>{
                setLoading(false)
                setShow(false)
                setGroupName("")
                setTagName("")
            })

        }
        else{
            alert("please enter name")
        }
    }

    //get group list


    useEffect(()=>{
        const groupRef = ref(db,"group")

        onValue(groupRef,(snapshot)=>{
            let list = []
            snapshot.forEach((item)=>{
                if(data.uid != item.val().adminId){
                    list.push({...item.val(),id:item.key})
                }
            })
            setGroupList(list)
        })
    },[])

    //get group list

    //send join request start
    const handlejoinrequest = (item)=>{
        set(push(ref(db,"groupJoinRequest")),{
            groupId: item.id,
            groupName: item.groupName,
            adminId: item.adminId,
            adminName: item.adminName,
            userId: data.uid,
            userName: data.displayName,
            tagName: item.tagName

        }).then(()=>{
            toast.success(`Successfully sent join request to ${item.groupName}`)
        })
    }
    //send join request end

    return (
        <div className='list'>

            <div className="user_header flex items-center w-full justify-between">
                <h1>Group List</h1>
                {
                    show?
                    <button onClick={()=> {setShow(!show), setLoading(!loading)}} className="flex items-center gap-1 bg-red-500 text-white px-1 rounded-lg transform active:scale-[1.2] duration-300 cursor-pointer">Cancel<MdOutlineCancel/></button>
                    :
                    <button onClick={()=> setShow(!show)} className="flex items-center gap-1 bg-white text-primary px-1 rounded-lg transform active:scale-[1.2] duration-300 cursor-pointer">Create<MdGroupAdd/></button>

                }
                

            </div>
            {
                show?
                <div className="bg-green-500 p-5">
                    <div className="">

                    <input onChange={handleGroupName} className="m-1 rounded-lg px-2 py-1 outline-none w-full" type="text" placeholder="Group name" />
                    <input onChange={handleTagName} className="m-1 rounded-lg px-2 py-1 outline-none w-full" type="text" placeholder="Tag name" />
                    {
                        loading?
                        <div >
                            <PropagateLoader className="btn_v_1 mt-[-3px] py-3 transform active:scale-[1.2] duration-300 bg-transparent text-green-500 w-5" color="#fff" />
                        </div>
                        :
                        <button onClick={handleCreatGroup} className="btn_v_1 mt-2 mb-[-8px] transform active:scale-[1.2] duration-300 bg-white text-green-500 ">Create</button>

                    }
                    </div>
                </div>
                :
                    (
                        grouplist.map(item=>{
                            return(
                                <div key={item.id} className=" user_list ">

                                <div className='img_name'>
                                    <div className='img'><img src="../../public/image/dp.jpg" alt=""/></div>
                                    <div className='name'>
                                        <h1 className="font-bold">{item.groupName}</h1>
                                        <p className="text-[12px] !text-primary"> Admin : {item.adminName}</p>
                                       
                                    </div>
                                </div>
                                <div className="mr-3">
                                    <button onClick={()=>handlejoinrequest(item)} className="btn_v_3 font-semibold">Join</button>
                                </div>
                            </div>
                            )
                        })
                    )

            }


        </div>
    );
};

export default GroupList;