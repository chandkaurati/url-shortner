
function shortString(str){
    if(typeof str  !== "string" || str.length < 30 ){
        return str
    }
    return `${str.slice(0, 30)} ...`
}


export default shortString
