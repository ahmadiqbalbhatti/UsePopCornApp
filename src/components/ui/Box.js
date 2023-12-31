import {useState} from "react";
import ToggleButton from "./ToggleButton";

const Box = ({children}) => {
    // const [isOpen1, setIsOpen1] = useState(true);

    const [isOpen, setIsOpen] = useState(true)

    const handleIsOpen = () => {
        setIsOpen((open) => !open)
    }

    return (
        <div className="box">
            <ToggleButton onIsOpen={handleIsOpen}>
                {isOpen ? "–" : "+"}
            </ToggleButton>
            {isOpen && children}
        </div>
    )
}

// const Box = ({element}) => {
//     // const [isOpen1, setIsOpen1] = useState(true);
//
//     const [isOpen, setIsOpen] = useState(true)
//     return (
//         <div className="box">
//             <button
//                 className="btn-toggle"
//                 onClick={() => setIsOpen((open) => !open)}
//             >
//                 {isOpen ? "–" : "+"}
//             </button>
//             {isOpen && element}
//         </div>
//     )
// }


export default Box;
