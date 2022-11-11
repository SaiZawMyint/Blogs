const itech = function(){
    return {
        textEditor: function(cmd, value = null){
            document.execCommand(cmd,false,value)
        },
        richText: function(text){

            return {
                affilation: function(){
                    if(this.isValidLink()){
                        return `<a href='${text}'>${text}</a>`
                    }else{
                        return text
                    }
                },
                isValidLink: function(){
                    var res = text.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                    return (res !== null)
                }
            }
        },
        wait: function(time,action,callback){
            let id = null
            let p = 0
            clearInterval(id)
            action()
            id = setInterval(function(){
                if(p > 0){
                    clearInterval(id)
                    callback()
                }
                p++
            },time)
        }
    }
}
export default itech;