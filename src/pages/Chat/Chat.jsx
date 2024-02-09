
import SideNavbar from '../../components/SideNavbar';
import FriendList from '../../components/FriendList'
import GroupChat from './GroupChat';
import Chating from './Chating';

const Chat = () => {
    return (
        <div className=''>
          <div className=''><SideNavbar/></div>
          <div className="py-2 md:py-8 w-[100%] md:w-[80%] mx-auto md:flex ">
            <div className='flex gap-2 md:flex-col'>
              <div className='chating rounded-lg shadow-lg overflow-scroll !h-[220px] w-[50%] md:w-[250px]'>
             <GroupChat/> 
              </div>
              <div className='chating rounded-lg shadow-lg overflow-hidden !h-[220px] w-[50%] md:w-[250px]'>
              <FriendList/>
              </div>

            </div>
            <div className='w-full h-[53vh] md:h-[67vh] my-auto'>
              <Chating />
            </div>
          </div>
        </div>
    );
};

export default Chat;