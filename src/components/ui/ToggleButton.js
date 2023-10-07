
const ToggleButton = ({onIsOpen, children}) => {
    return (
        <button
            className="btn-toggle"
            onClick={onIsOpen}
        >
            {children}
        </button>
    )
}

export default ToggleButton;
