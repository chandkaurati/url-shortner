
function shortString(str){
    if(typeof str  !== "string" || str.length <  50){
        return str
    }
    return `${str.slice(0, 60)} ...`
}


export default shortString
