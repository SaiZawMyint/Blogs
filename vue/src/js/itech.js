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
                },
                previewTemplate: function(data = []){
                    return new CMS().previewTemplate(data)
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
        "createRandomName":function(prefix = '',tailing = ''){
            return  prefix.replaceAll(' ','')+"-"+ (Math.random() + 1).toString(36).substring(2)+tailing.replaceAll(' ','');
        },
        file: function(file){
            return {
                extension: function(){
                    if(file){
                        let ftype = file.type
                        return ftype.substring(ftype.indexOf('/')+1, ftype.length)
                    }
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
    previewTemplate(json = []){
        let template = ``
        let temp = ``
        json.forEach((data)=>{
            if('editor' in data){
                switch(data['editor']){
                    case 'text':{
                        let context = 'context' in data ? data['context'] : ''
                        temp += `<div class="p-2 te">${context}</div>`
                    }
                    break
                    case 'image':{
                        let view = 'view' in data ? data['view'] : 'justify-start'
                        let imgFill = 'imgFill' in data ? data['imgFill'] : 'w-auto'
                        let src = 'src' in data ? data['src'] : ''
                        temp += `<div class="p-2 flex w-full ${view}">
                                    <div class="image-wrap ie ${imgFill}">
                                        <img alt="blog image" src='${src}'>
                                    </div>
                                </div>`
                    }
                    break
                }
            }
        })
        template = `<div class="w-full">${temp}</div>`
        return template;
    }
}
export default itech;