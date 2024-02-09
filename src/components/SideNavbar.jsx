import {LuHome} from "react-icons/lu";
import {HiOutlineUserGroup} from "react-icons/hi2";
import {HiOutlineUpload} from "react-icons/hi";
import {IoChatbubbleEllipsesOutline} from "react-icons/io5";
import {NavLink, useNavigate} from "react-router-dom";
import {IoIosLogOut} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {useState, createRef} from "react";
import {getDownloadURL, getStorage, ref, uploadString} from "firebase/storage";
import {getAuth, updateProfile, signOut} from "firebase/auth";
import "cropperjs/dist/cropper.css";
import {Cropper} from "react-cropper";
import {userLoginInfo} from "../slices/userSlice";

const SideNavbar = () => {

    const auth = getAuth()
    const dispatch = useDispatch()

    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef('');
    const storage = getStorage();
    const navigate = useNavigate();
    const handleLogout = () => {

        const auth = getAuth();
        signOut(auth)
            .then(() => {
                dispatch(userLoginInfo(null))
                localStorage.removeItem('user')
                navigate('/')

            })
            .catch((error) => {
                // An error happened.
            });

    }

    const handleDpUpload = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (
            typeof cropperRef.current
                ?.cropper !== "undefined"
        ) {
            setCropData(
                cropperRef.current
                    ?.cropper.getCroppedCanvas().toDataURL()
            );
            const storageRef = ref(storage, auth.currentUser.uid);

            const message4 = cropperRef.current
                ?
                    .cropper
                    .getCroppedCanvas()
                    .toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {;
            });
            getDownloadURL(storageRef).then((downloadURL) => {
                updateProfile(auth.currentUser, {photoURL: downloadURL})
                dispatch(userLoginInfo({
                    ...data,
                    photoURL: downloadURL
                }));
                localStorage.setItem("user", JSON.stringify(auth.currentUser))

                setModel(false)

            });

        }
    };

    const [model, setModel] = useState(false)

    const CUTTING_EXPRESSION = /\s+[^\s]*$/;

    const createShortcut = (text, limit) => {
        if (text.length > limit) {
            const part = text.slice(0, limit - 3);
            if (part.match(CUTTING_EXPRESSION)) {

                return part.replace(CUTTING_EXPRESSION, ' ...');

            }
            return part + '...';
        }
        return text;
    };

    const Component = ({text, limit}) => {
        const shortcut = createShortcut(text, limit);
        return (<div title={text}>{shortcut}</div>);
    };

    const data = useSelector((state) => state.userLoginInfo.userInfo)

    return (
        <div className="">
            {
                model && <div
                        className="model w-screen  h-screen z-[9990] overflow-hidden absolute bg-black bg-opacity-25 flex items-center justify-center ">
                        <div className="md:w-[50%]  bg-primary opacity-100 p-5 md:p-10 ">
                            <h1 className=" font-bold text-[20px] md:text-[30px] text-center text-white">Set Profile Picture</h1>
                            <div></div>
                            <div>

                                <form>
                                    <label className="block">
                                        <span className="sr-only">Choose profile photo</span>
                                        <input
                                            onChange={handleDpUpload}
                                            type="file"
                                            className=" file_input block text-sm text-gray-500
      file:me-4 file:py-1 file:px-2 md:px-4
      file:rounded-lg file:border-2
      file:text-sm file:font-semibold
      file:bg-primary file:text-white
      hover:file:bg-[#3e90b3]
      file:disabled:opacity-50 file:disabled:pointer-events-none
      dark:file:bg-blue-500
      dark:hover:file:bg-blue-400
      file:border-white
      file:cursor-pointer
      border-white border-2 m-auto w-[70%] py-2 px-3 rounded-lg

    "/>
                                    </label>
                                </form>
                            </div>

                            {/* ..................... */}

                            {
                                image && <div className="relative">

                                        <div className="border-2 border-white mt-3 p-3 rounded-lg">

                                            {
                                                image && <Cropper
                                                        className=" w-[50%] h-[20%]   ml-0 block rounded-lg "
                                                        ref={cropperRef}
                                                        style={{}}
                                                        zoomTo={0.5}
                                                        initialAspectRatio={1}
                                                        preview=".img-preview"
                                                        src={image}
                                                        viewMode={1}
                                                        minCropBoxHeight={10}
                                                        minCropBoxWidth={10}
                                                        background={false}
                                                        responsive={true}
                                                        autoCropArea={1}
                                                        checkOrientation={false}
                                                        guides={true}/>
                                            }

                                        </div>
                                        <div>
                                            <div
                                                className="box absolute top-1/2 left-[73%] md:left-[67%] transform translate-y-[-50%] text-center">
                                                <h1 className="text-white font-bold">Preview</h1>
                                                <div
                                                    className="img-preview w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden "/>
                                            </div>

                                        </div>
                                    </div>

                            }
                            {/* ..................... */}

                            <div className="flex justify-between">
                                {
                                    image && <button
                                            onClick={getCropData}
                                            className="btn_v_1 hover:border-2 hover:border-white border-2 border-transparent   w-[45%] md:w-[40%] bg-green-500  hover:text-white transform active:scale-[1.1] duration-500 font-bold">Upload</button>

                                }
                                <button
                                    onClick={() => {
                                        setModel(!model),
                                        setCropData(""),
                                        setImage("")
                                    }}
                                    className="hover:border-2 hover:border-white border-2 border-transparent btn_v_1 w-[45%] md:w-[40%] bg-red-500  hover:text-white transform active:scale-[1.1] duration-500 font-bold">Cancel</button>
                            </div>
                        </div>
                    </div>
            }

            <div id="navbar">
                <div className="">
                    <ul className=''>
                        <li onClick={() => setModel(!model)} className=' duration-300 ease-in-out   '>
                            <NavLink
                                className={(
                                    {isActive}) => isActive
                                    ? ""
                                    : ""}
                                to="/profile">
                                <div className="flex items-center flex-col">

                                    <div className="img">
                                        <img
                                            src={data
                                                ?.photoURL}
                                            alt=""/>
                                        <div className="profile_hover">
                                            <div className="profile_opacity"></div>
                                            <HiOutlineUpload className="upload_icon text-white"/>
                                        </div>
                                    </div>
                                    <div className="text-[10px] md:text-[15px] font-bold uppercase  mt-1">

                                        <Component
                                            text={data
                                                ?.displayName}
                                            limit={17}/>
                                    </div>
                                </div>
                            </NavLink>
                        </li>
                        <li className=' duration-300 ease-in-out '>
                            <NavLink
                                className={(
                                    {isActive}) => isActive
                                    ? "text-red-500"
                                    : ""}
                                to="/home"><LuHome/></NavLink>
                        </li>
                        <li className=' duration-300 ease-in-out '>
                            <NavLink
                                className={(
                                    {isActive}) => isActive
                                    ? "text-red-500"
                                    : ""}
                                to="/chat"><IoChatbubbleEllipsesOutline/></NavLink>
                        </li>
                        <li className=' duration-300 ease-in-out '>
                            <NavLink
                                className={(
                                    {isActive}) => isActive
                                    ? "text-red-500"
                                    : ""}
                                to="/group"><HiOutlineUserGroup/></NavLink>
                        </li>
                                                <li className="cursor-pointer" onClick={handleLogout}><IoIosLogOut/></li>
                    </ul>

                </div>

            </div>

        </div>
    );
};

export default SideNavbar;