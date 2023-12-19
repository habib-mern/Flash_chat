import { useSelector } from "react-redux";
import BlockList from "../components/BlockList";
import FriendList from "../components/FriendList";
import FriendRequest from "../components/FriendRequest";
import GroupList from "../components/GroupList";
import MyGroup from "../components/MyGroup";
import SideNavbar from "../components/SideNavbar";
import UserList from "../components/UserList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Home = () => {
    const navigate= useNavigate()
    const data = useSelector((state)=>state.userLoginInfo.userInfo) 
    useEffect(()=>{
        if(!data){
            navigate('/')
        }
    })
    return (
        <div className="relative">
           <div className='sticky top-0 z-[9999]'><SideNavbar/></div>
        <div id='home'>
           
           <div className='item'><UserList/></div>
           <div className='item'><FriendList/></div>
           <div className='item'><FriendRequest/></div>
           <div className='item'><GroupList/></div>
           <div className='item'><MyGroup/></div>
           <div className='item'><BlockList/></div>
        </div>
        </div>
    );
};

export default Home;