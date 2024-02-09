import {BsThreeDotsVertical} from "react-icons/bs";
import { MdOutlineCameraAlt } from "react-icons/md";
import { IoMdArrowDropright, IoMdHappy } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import ModalImage from "react-modal-image";
const Chating = () => {
    return (
        <div className='chat_box overflow-y-scroll   relative md:ml-5  h-full shadow-lg  rounded-lg w-[100%]  m-auto overflow-hidden border-2 border-primary '>
            <div className=' bg-primary shadow-xl  sticky z-50 top-0 left-0 px-10 py-2 border-b-2 border-primary'>
            <div className='h-[50px] flex justify-between items-center'>
                <div className="flex gap-5 items-center">
                <div className="relative shadow-md  profile_pic w-[50px]  h-[50px] rounded-full">
                    <img className="rounded-full" src="../../../public/image/dp.jpg" alt="" />
                    <div className="border-2 border-white online w-[12px] rounded-full h-[12px] bg-green-300 absolute bottom-[5px] right-0"></div>
                </div>
                    <div className="text-white">

                    <h1 className="font-bold ">Ahsanul Habib</h1>
                    <p className="text-[12px]">Online</p>
                    </div>
                </div>
                <div>
                <BsThreeDotsVertical className="text-white"/>
                </div>
            </div>
            </div>


        <div className="px-5 py-5">
        {/* recive text strat */}
       <div className="mb-5 text-left bg-gray-200 inline-block rounded-lg p-3 relative">
        <p className="font-semibold"> Lorem,pisicing elit. vggvvvFugit, placeat.</p>
        <IoMdArrowDropleft className="text-[50px] absolute left-[-30px] bottom-[-10px] text-gray-200" />
       </div>
        {/* recive text end */}
        {/* send text strat */}
        <div className="flex justify-end">

       <div className=" mb-5 text-right bg-primary text-white inline-block rounded-lg p-3 relative">
        <p className="font-semibold text-right "> Lorem, ipsum dolor sit ametsicing elit. Fugit, placeat.</p>
        <IoMdArrowDropright className="text-[50px] absolute right-[-28px] bottom-[-11px] text-primary " />
       </div>
        </div>
        {/* send text end */}


        {/* Image send section */}

        {/* recive Image strat */}
       <div className="mb-5 text-left bg-gray-200 inline-block rounded-lg p-3 relative">
            <ModalImage className="h-[300px]"
        small={"../../../public/image/dp.jpg"}
        large={"../../../public/image/dp.jpg"}
        alt="Hello World!"
        />
        <IoMdArrowDropleft className="text-[50px] absolute left-[-30px] bottom-[-10px] text-gray-200" />
       </div>
        {/* recive Image end */}

        {/* send image strat */}
        <div className="flex justify-end">

       <div className="inline-block mb-5 text-right bg-primary text-white rounded-lg p-3 relative">
       <ModalImage className="h-[300px]"
        small={"../../../public/image/dp.jpg"}
        large={"../../../public/image/dp.jpg"}
        alt="Hello World!"
        />
        <IoMdArrowDropright className="text-[50px] absolute right-[-28px] bottom-[-11px] text-primary " />
       </div>
        </div>
        {/* send image end */}



        {/* Image send section */}
        </div>

            <div className='sticky z-50 bottom-0 left-0'>
            <div className='h-[50px] bg-primary relative flex justify-between'>
                <div>

                <div>
                    <input type="text" className="input outline-primary px-4 py-2 overflow-y-scroll  rounded-lg m-auto  md:w-[70%]  absolute transform translate-y-[-50%] top-[50%] md:left-[44%] md:translate-x-[-50%]" />
                    <div className="flex gap-2 text-[30px] text absolute right-[22%] top-[9px] z-50 text-primary">

                    <IoMdHappy className="cursor-pointer p-[3px] rounded-full bg-primary text-white hover:bg-green-500 duration-500" />
                    <MdOutlineCameraAlt className="cursor-pointer p-[3px] rounded-full bg-primary text-white hover:bg-green-500 duration-500"  />
                    
                    </div>
                    
                </div>
                </div>
                <button className=" bg-white text-primary px-3 mr-2 md:px-6 py-0 h-[80%] rounded-lg mt-1 md:mr-5 transform active:scale-[1.1] duration-300 uppercase font-bold active:bg-green-500 active:text-white">send</button>
                
            </div>
            </div>

        </div>
    );
};

export default Chating;