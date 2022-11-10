import store from "../store"

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
    if(!(to.name in store.state.page.history.data)){
        store.state.page.history.route.name = from.name
        if (from.params) store.state.page.history.route.params = from.params
        store.state.page.history.data[to.name] = {name: from.name,params: from.params}
    }else{
        store.state.page.history.route = store.state.page.history.data[to.name]
        delete store.state.page.history.data[from.name]
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
    like_count: 0,
    likes: 0,
    title: "",
    updated_at: "",
    user_id: 0
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
export default{
    blogsData: blogsData,
    isLiked: isLiked,
    blog_data: blog_data,
    getString: getString,
    findDataFromArrayById: findDataFromArrayById,
    commentData: commentData
}