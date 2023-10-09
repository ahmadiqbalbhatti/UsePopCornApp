import {useEffect} from "react";
export function useKey(key, action) {
    useEffect(() => {
        function callbackFun(e) {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                action();
            }
        }

        document.addEventListener("keydown", callbackFun)
        return function () {
            document.removeEventListener('keydown', callbackFun);
        }
    }, [action, key]);
}
