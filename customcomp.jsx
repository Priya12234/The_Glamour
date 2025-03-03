import { useState } from "react";
import UserComp1 from "./cleanup";

const ShowHideuser = ({xyz}) =>
(xyz ? <UserComp1/> : null);

function Conditional(){
    const [show, setShow] = useState(false);
    return (
        <div>
            <button onClick={() => setShow(!show)}>User
                {show? "Hide User" : "Show User"}
            </button>
            <ShowHideuser xyz={show}/>  {/* Passing the state to the component */}
        </div>
    );
}
export default Conditional;