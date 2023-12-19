import Lottie from "lottie-react";
import ErrorAni from "../../public/animation/error.json";
const Error = () => {
    return (
        <div>
            <Lottie className="w-screen h-screen" animationData={ErrorAni}/>
        </div>
    );
};

export default Error;