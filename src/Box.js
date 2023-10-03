import {useState} from "react";

const Box = ({children}) => {
    // const [isOpen1, setIsOpen1] = useState(true);

    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    )
}

export default Box;
