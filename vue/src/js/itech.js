import itechObject from "./itech-objects";

const itech = function(){
    return {
        cms: function(){
            return {
                /**
                 * 
                 * @param {Element} context 
                 * @param {String | null} classes 
                 * @param {String | null} styles 
                 * @returns html string
                 */
                generated: function(context,classes,styles){
                    return new CMS(context,classes,styles).html()
                },
                /**
                 * 
                 * @param {Array} templateData 
                 * @param {String} customTemplateHTML 
                 */
                wrappedTemplate: function(templateData=[],customTemplateHTML=''){
                    let temp = `<div class="w-full">`;
                    templateData.forEach(d=>{
                        temp += d
                    })
                    temp += `</div>`;
                    return temp
                },
                blogTemplate: function(title,icon,blog){
                    let date = itechObject().date(new Date(),true).format('dd,mm yy').withTime('h:m:s a')
                    return `<div class='w-full flex flex-col rounded bg-gray-100'>
                                <div class="flex border-b-2 p-3">
                                    <div class="w-10 h-10 flex items-center justify-center rounded-full bg-[#0000004c]">
                                        ${icon}
                                    </div>
                                    <div class="px-2 flex flex-col">
                                        <h3>${title}</h3>
                                        <i class="text-[.7em]">${date}</i>
                                    </div>
                                </div>
                                ${blog}
                            </div>`
                }
            }
        },
        textEditor: function(cmd, value = true){
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
class CMS{
    /**
     * 
     * @param {Element} target 
     * @param {String} classes 
     * @param {String} styles 
     */
    constructor(target,classes,styles){
        this.target = target
        this.classes = classes
        this.styles = styles
    }
    html(){
        let tag = this.target.tagName.toLowerCase()
        return `<${tag} class='${this.classes}' style='${this.styles}'>${this.target.innerHTML}</${tag}>`
    }
}
export default itech;