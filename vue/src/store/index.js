import {createStore} from 'vuex'
import axiosClient from '../axios'
import {blogsData, blog_data, clearAllFromStore, commentData, findDataFromArrayById, isLiked} from '../js/blogs.js'
import router from '../router'



const userModule = {
    state: ()=>({
        data: {},
        token: sessionStorage.getItem('TOKEN'),
        emailVerify: false
    }),
    actions: {
        async register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then((res) => {
                    console.log(res)
                    commit('setUser', res.data)
                    return data;
                }).catch(err=>{
                    return {ok:false,error: err.response.data.message}
                })
        },
        async login({ commit }, user,
        ) {
            return axiosClient.post('/login', user)
                .then(({ data }) => {
                    if(data.ok)commit('setUser', data)
                    return data;
                }).catch(err=>{
                    return {ok:false,error: err.response.data.message}
                })
        },
        async logout({ commit }) {
            return axiosClient.post('/logout')
                .then((res) => {
                    commit('logout')
                    return res
                })
        },
        async currentUser({commit}){
            if(!store.state.user.token) return false
            return axiosClient.get('/me').then((res)=>{
                commit('storeUser',res.data.data)
            }).catch(err=>{
                router.push({name:'login'})
            })
        }
    },
    mutations: {
        logout: state => {
            state.data = {}
            state.token = null
            sessionStorage.removeItem('TOKEN')
            clearAllFromStore()
        },
        setUser: (state, data) => {
            state.data = data.user
            state.token = data.token
            sessionStorage.setItem("TOKEN", data.token)
        },
        storeUser: (state,data) =>{
            state.data = data
        }
    }
}
const modalBox = {
    state: ()=>({
        data: {
                
        },
        step: {
        },
        input: {
            title: '',
            body: ''
        }
    })
}
const blogs = {
    state: ()=>({
        data:[],
        createfn: null
    }),
    actions: {
        async createBlog({commit},data){
            return axiosClient.post('/blogs',data).then((res)=>{
                if(res.data.ok)commit('add',res.data.data)
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        async getBlogs({commit}){
            return axiosClient.get('/blogs').then((res)=>{
                if(res.data.ok) commit('put',res.data)
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        async searchBlogs({commit},data){
            return axiosClient.get(`/blogs/search?s=${data.s}`).then((res)=>{
                if(res.data.ok) commit('put',res.data)
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        async updateBlog({commit},data){
            return axiosClient.post(`/blogs/${data.id}`,data.data).then((res)=>{
                if (res.data.ok) {
                    commit('updateBlog', res.data.data)
                }
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        async deleteBlog({commit}, id){
            return axiosClient.delete(`/blogs/${id}`).then((res)=>{
                if(res.data.ok) commit('deleteBlog', id)
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        like: async function({commit},id){
            const res = await axiosClient.post(`/blogs/${id}/like`)
            if (res.data.ok)
                commit('putlike', { id: id, uid: res.data.uid, data: res.data.data })
            return res.data.data
        }
    },
    mutations:{
        add: (state,data)=>{
            let xdata = {
                blogs: data,
                likes: [],
                comments: []
            }
            state.data.unshift(blogsData(data.user_id,xdata))
        },
        put: (state,data)=>{
            state.data = []
            for(let x of data.data){
                state.data.push(Object.assign({coverPhoto: x.cover},blogsData(data.uid,x)))
            }
            console.log(data.data,store.state.blogs.data)
        },
        updateBlog:(state,data)=>{
            let index = state.data.findIndex((blog)=> blog.id == data.id)
            if(index > 0){
                state.data[index].body = data.body
                state.data[index].title = data.title
                state.data[index].updated_at = data.updated_at
            }
        },
        deleteBlog:(state,id)=>{
            let index = state.data.findIndex((blog)=> blog.id == id)
            state.data.splice(index,1)
        },
        putlike: (state,x)=>{
            let data = x.data
            let index = state.data.findIndex((blog)=> blog.id == x.id)
            state.data[index].data.like = data
            state.data[index].likes = data.length
            let lkindex = state.data[index].data.like.findIndex((l) => l.user_id == x.uid)
            state.data[index].isliked = lkindex != -1
        }
    }
}
const post = {
    state: ()=>({
        data:{
            body: "",
            comments: 0,
            created_at: new Date().toDateString(),
            data: { like: [], comment: [] },
            del_flag: 0,
            id: 0,
            isliked: false,
            like_count: 0,
            likes: 0,
            title: "",
            updated_at: new Date().toDateString(),
            description: '',
            user_id: 0,
            type: 0
        },
        permission: false
    }),
    actions: {
        async getBlogById({commit},id){
            return axiosClient.get(`/blogs/${id}`).then((res)=>{
                if(res.data.ok) commit('postdata',res.data)
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        async editionRequest({commit},id){
            return axiosClient.get(`/blogs/${id}/edit`).then((res)=>{
                if(res.data.ok) commit('postdata',res.data)
                else commit('permissionLock')
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        async postlike({commit},id){
            return axiosClient.post(`/blogs/${id}/like`).then(res=>{
                if(res.data.ok) commit('like',{id: id,uid: res.data.uid,data:res.data.data})
                return res.data.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        async postComment({commit},data){
            return axiosClient.post(`/blogs/${data.id}/comment`, data.data).then(res=>{
                if(res.data.ok) commit('comment',res.data)
                return res.data.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        deleteComment: async function({commit},data){
            return axiosClient.delete(`/blogs/${data.blogId}/comment/${data.id}`).then(res=>{
                if(res.data.ok) commit('deleteCommentState',data)
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        }
    },
    mutations: {
        postdata: (state,data)=>{
            state.data = {
                body: data.data.blogs.body,
                comments: data.data.comments.length,
                created_at: data.data.blogs.created_at,
                data: { like: data.data.likes, comment: commentData(data.data.comments,data.uid) },
                del_flag: data.data.blogs.del_flag,
                id: data.data.blogs.id,
                isliked: isLiked(data.uid, data.data.likes),
                like_count: data.data.blogs.like_count,
                likes: data.data.likes.length,
                title: data.data.blogs.title,
                type: data.data.blogs.type,
                updated_at: data.data.blogs.updated_at,
                description: data.data.blogs.description,
                user_id: data.data.blogs.user_id,
                outlines: JSON.parse(data.data.blogs.outlines),
                cover: data.data.cover
            }
            if('postData' in data.data){
                state.data.postData = data.data.postData
            }
            state.permission = true
        },
        permissionLock: (state)=>{
            state.data = blog_data
            state.permission = false
        },
        like: (state,data)=>{
            state.data.isliked = isLiked(data.uid,data.data)
            state.data.data.like = data.data
            state.data.likes = data.data.length
        },
        comment: (state,data)=>{
            state.data.data.comment = commentData(data.data,data.uid) 
            state.data.comments = data.data.length
        },
        deleteCommentState: (state,data)=>{
            let index = state.data.data.comment.findIndex((c)=>c.id == data.id)
            if(index > -1){
                state.data.data.comment.splice(index,1)
            }
            state.data.comments -=1
        }
    }
}
const page ={
    state: ()=>({
        sub: false,
        search: {
            data: {s:''},
            is: false
        },
        history:{
            data:{},
            route:{}
        },
        view: 'lg:w-[60%] md:w-[100%] sm:w-[100%]',
        errMessage: 'Page Broken'
    }),
    actions: {},
    mutations: {}
}
const profile = {
    state:()=>({
        data:{},
        blogs:[]
    }),
    actions: {
        async me({commit}){
            return axiosClient.get(`/me`).then(res=>{
                
                if(res.data.ok) commit('putMe',res.data.data)
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        async getMyBlogs({commit}){
            return axiosClient.get(`/me/blogs`).then(res=>{
                if(res.data.ok) commit('putBlogData',res.data)
                return res.data;
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        async deleteMyBlog({commit}, id){
            return axiosClient.delete(`/blogs/${id}`).then((res)=>{
                if(res.data.ok) commit('deleteMyBlog', id)
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
    },
    mutations: {
        putMe: (state,data)=>{
            state.data = data
        },
        putBlogData: (state,data)=>{
            let xdata = []
            if(data.data.length > 0){
                for(let d of data.data){
                    xdata.push(blogsData(data.uid,d))
                }
            }
            state.blogs = xdata
        },
        deleteMyBlog:(state,id)=>{
            let index = state.blogs.findIndex((blog)=> blog.id == id)
            state.blogs.splice(index,1)
        },
    }
}
const loadingScreen = {
    state: ()=>({
        data: {
        }
    })
}
const loadingBar = {
    state: ()=>({
        data: {
        }
    })
}
const notification ={
    state: ()=>({
        data: {}
    })
}
const alertBox ={
    state: ()=>({
        data:{},
        show: false
    })
}
const userNotification = {
    state: ()=>({
        data: [],
        hasUnseen:false,
        unseencount: 0
    }),
    actions:{
        async loadNotification({commit}){
            return axiosClient.get('/notifications/get').then((res)=>{
                if(res.data.ok) commit('putNoti',res.data.data)
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        async seen({commit},id){
            return axiosClient.post(`/notifications/${id}/seen`).then(res=>{
                if(res.data.ok) commit('seen',{id: id,status: true})
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        async hasUnseen({commit}){
            return axiosClient.get(`/notifications/unseen`).then(res=>{
                if(res.data.ok) commit('putUnseen',res.data.data)
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        },
        async deleteNoti({commit},id){
            return axiosClient.post(`notifications/${id}/delete`).then((res)=>{
                if(res.data.ok) commit('removeNoti',id)
                return res.data
            }).catch(err=>{
                return {ok:false,error: err.response.data.message}
            })
        }
    },
    mutations:{
        putNoti: (state,data)=>{

            let unseen_count = 0
            for(let x of data){
                if(!x.seen){
                    unseen_count++
                }
            }
            state.data = data
            state.unseencount = unseen_count
        },
        seen: (state,data)=>{
            let finddata = findDataFromArrayById(data.id,state.data)
            state.data[finddata.index].seen = true
        },
        putUnseen: (state,data)=>{
            state.hasUnseen = data
        },
        removeNoti: (state,id)=>{
            let finddata = findDataFromArrayById(id,state.data)
            state.data.splice(finddata.index,1)
        }
    }
}
const pagination = {
    state: ()=>({
        current: 0,
        page: 0,
        size: 0
    })
}
const cms = {
    state: ()=>({
        outlines: []
    }),
    actions: {
        addOutline({commit},data){
            commit('putOutline',data)
        },
        deleteOutline({commit},index){
            commit('removeOutline',index)
        }
    },
    mutations: {
        putOutline: (state,data)=>{
            state.outlines.push(data)
        },
        removeOutline: (state,index)=>{
            state.outlines.splice(index,1)
        }
    }
}
const store = createStore({
    modules:{
        user: userModule,
        modalBox: modalBox,
        blogs: blogs,
        post: post,
        page: page,
        profile: profile,
        loadingScreen: loadingScreen,
        loadingBar: loadingBar,
        notification: notification,
        alertBox: alertBox,
        userNotification: userNotification,
        cms: cms
    }
})

export default store