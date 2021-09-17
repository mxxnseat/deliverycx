import {useEffect} from "react";

function useOutside(ref: any, toggleHandler: ()=>void, openValue: boolean){
    useEffect(()=>{
         function handleClickOutside(event: Event) {
            if (openValue && ref.current && !ref.current.contains(event.target)) {
                toggleHandler();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, openValue]);
}

export {useOutside};