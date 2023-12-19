import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import { useSelector } from "react-redux";

const BlockList = () => {

    const db = getDatabase()
    const data = useSelector((state) => state.userLoginInfo.userInfo)
    const [blockList, setBlockList] = useState([])
    
    //get block user start

    useEffect(()=>{
        const blockRef = ref(db, "block");
        onValue(blockRef,(snapshot)=>{
            snapshot.forEach((item)=>{
                const list = []
                if(data.uid ==item.val().blockById){
                    list.push({
                        id: item.key,
                        block: item.val().blockName,
                        blockId: item.val().blockId
                    })
                    
                }
                else{
                    list.push({
                        id: item.key,
                        block: item.val().blockByName,
                        blockId: item.val().blockById
                    })
                }
                setBlockList(list)
                
            })
        })
    },[])
    //get block user end

    //unblock start
    const handelUnblock =(item)=>{
        set(push(ref(db,"friend")),{
            senderId: item.blockId,
            senderName: item.block,
            receverId: data.uid,
            receverName: data.displayName
        }).then(()=>{
            remove(ref(db,"block/"+item.id))
        })
    }
    //unblock end

    return (
        <div className='list'>

            <div className="user_header flex items-center w-full justify-between">
                <h1>Block List</h1>
                <BsThreeDotsVertical/>

            </div>
        {
            blockList.map((item)=>{
            return(
                <div key={item.id} className=" user_list ">

                <div className='img_name'>
                    <div className='img'><img src="../../public/image/dp.jpg" alt=""/></div>
                    <div className='name'>
                        <h1>{item.block?
                        item.block:
                        item.blockBy
                        }</h1>
                    </div>
                </div>
                <div className="mr-3">
                    
                    {
                        item.block?
                        <button onClick={()=>handelUnblock(item)} className="btn_v_3 bg-red-500">Unblock</button>
                        :
                        <button className="btn_v_3 bg-red-500">lock</button>
                    }
                </div>
            </div>
            )
            })
        }

        </div>
    );
};

export default BlockList;