import store from "../store"
import {defaultProps} from './app.properties'
import itech from "./itech"
import itechObject from './itech-objects'

export function blogsData(id,x){
    let blogs = x.blogs
    blogs.likes = x.likes.length
    blogs.comments = x.comments.length
    blogs.data = {like: x.likes,  comment: x.comments}
    let lkindex = x.likes.findIndex(lk=> lk.user_id == id)
    blogs.isliked = lkindex != -1
    return blogs
}
export function isLiked(id,x){
    let index = x.findIndex(l=>l.user_id == id)
    return index != -1
}
export function routeHistory(to,from){
    console.log(store.state.page.history.data)
    if(from.name === undefined){
        store.state.page.history.route = {
            name: 'top'
        }
    }else{
        if(!(to.name in store.state.page.history.data)){
            store.state.page.history.route.name = from.name
            if (from.params) store.state.page.history.route.params = from.params
            store.state.page.history.data[to.name] = {name: from.name,params: from.params}
        }else{
            store.state.page.history.route = store.state.page.history.data[to.name]
            delete store.state.page.history.data[from.name]
        }
    }
    
}
export function calculateStatus(data = {posts:0,likes:0,comments: 0}){
    let result = {
        posts: data.posts,
        likes: 0,
        comments: 0
    }
    result.likes = ((data.likes / (data.posts + 100)) * 100).toFixed(2)
    result.comments = ((data.comments / (data.posts + 50)) * 100).toFixed(2)
    return result
}
export function getString(obj){
    let str = ``
    for(let key in obj){
        str += obj[key]+" "
    }
    return str
}

export function commentData(comments=[],id=0){
    if (comments.length == 0) return []
    let copy = Object.assign([], comments);
    for (let i = 0; i < copy.length; i++) {
        if(copy[i].user_id == id){
            copy[i]['isMe'] = true
        }else{
            copy[i]['isMe'] = false
        }
    }
    return copy
}

export const blog_data = {
    body: "",
    comments: 0,
    created_at: "",
    data: { like: [], comment: [] },
    del_flag: 0,
    id: 0,
    isliked: false,
    likes: 0,
    title: "",
    updated_at: "",
    user_id: 0,
    type: 0,
    desciption: '',
    outlines: [],
    cover: {
        name: '',
        data: ''
    },
    postData:{
        conver: '',
        post: ''
    }
}

export function findDataFromArrayById(id = 0,data = []){
    let index = data.findIndex(d=> d.nid == id)
    console.log(data,id,index)
    return {
        index: index,
        data: Object.assign({},data[index])
    }
}
export function clearAllFromStore(){
    store.state.user.data = {}
    store.state.modalBox = {
        data: {
                
        },
        step: {
        },
        input: {
            title: '',
            body: ''
        }
    }
    store.state.blogs = {
        data:[],
        createfn: null
    }
    store.state.page = {
        sub: false,
        search: {
            data: {s:''},
            is: false
        },
        history:{
            data:{},
            route:{}
        },
        
    }
    store.state.profile = {
        data:{},
        blogs:[]
    }
    store.state.loadingScreen = {data: {}}
    store.state.notification = {data: {}}
    store.state.alertBox = {data:{},show: false}
    store.state.userNotification = {data: [],hasUnseen:false}
}
export function getBlogTypeIcon(id){

    const type = Object.assign([],defaultProps)
    console.log(type)
    const selectedtype = type[itechObject(type).find(id,'id')]
    console.log(selectedtype)
    return selectedtype ? selectedtype.icon : null
}
export function convertDate(date){
    try{
        return itechObject().date(date, true).format('dd,mm yy').withTime('h:mm:ss a')
    }catch(err){
        
    }
}

export function seprateNoti(data = []){
    let unseen =0, seen =0;
    data.forEach(d=>{
        if(d.seen){
            seen ++
        }else{
            unseen ++
        }
    })
    return {
        unseen, seen
    }
}
export function showNotification(before,after,delay = 1000){
    itech().wait(delay,()=>{
        store.state.notification.data = before
    },()=>{
        store.state.notification.data = after
    })
}
export function generateOutlineId(outline = {id:0,name: ''}){
    return outline.name.replaceAll(' ','').concat(`-${outline.id}`)
}
export default{
    blogsData,
    isLiked,
    blog_data,
    getString,
    findDataFromArrayById,
    commentData,
    getBlogTypeIcon,
    convertDate,
    seprateNoti: seprateNoti,
    showNotification: showNotification,
    generateOutlineId
}