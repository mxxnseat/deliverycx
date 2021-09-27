export default function debounce(fn: any, time: number){
    let timeout: boolean = false;
    
    return function(){
        if(timeout) return;

        const result = fn();
        timeout = true;

        setTimeout(()=>{
            timeout = false;
        }, time);

        return result
    }
}