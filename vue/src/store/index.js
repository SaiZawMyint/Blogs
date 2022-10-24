import { useRouter } from 'vue-router'
import {createStore} from 'vuex'
import axiosClient from '../axios'
import {blogsData, isLiked} from '../js/blogs.js'
import router from '../router'

const route = useRouter()

const userModule = {
    state: ()=>({
        data: {},
        token: sessionStorage.getItem('TOKEN'),
        emailVerify: false
    }),
    actions: {
        register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({ data }) => {
                    commit('setUser', data)
                    return data;
                })
        },
        login({ commit }, user,
        ) {
            return axiosClient.post('/login', user)
                .then(({ data }) => {
                    if(data.ok)commit('setUser', data)
                    return data;
                }).catch(err=>{
                    return {ok:false,error: err.response.data.message}
                })
        },
        logout({ commit }) {
            return axiosClient.post('/logout')
                .then((res) => {
                    commit('logout')
                    return res
                })
        },
        currentUser({commit}){
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
        createBlog({commit},data){
            return axiosClient.post('/blogs',data).then((res)=>{
                if(res.data.ok)commit('add',res.data.data)
                return res.data
            })
        },
        getBlogs({commit}){
            return axiosClient.get('/blogs').then((res)=>{
                if(res.data.ok) commit('put',res.data)
                return res.data
            })
        },
        searchBlogs({commit},data){
            return axiosClient.get(`/blogs/search?s=${data.s}`).then((res)=>{
                if(res.data.ok) commit('put',res.data)
                return res.data
            })
        },
        updateBlog({commit},data){
            return axiosClient.post(`/blogs/${data.id}`,data.data).then((res)=>{
                if (res.data.ok) {
                    data.delete ?
                        commit('deleteBlog', res.data.data)
                        : commit('updateBlog', res.data.data)
                }
                return res.data.data
            })
        },
        like: function({commit},id){
            return axiosClient.post(`/blogs/${id}/like`).then(res=>{
                if(res.data.ok) commit('putlike',{id: id,uid: res.data.uid,data:res.data.data})
                return res.data.data
            })
            
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
                state.data.push(blogsData(data.uid,x))
            }
        },
        updateBlog:(state,data)=>{
            console.log(data)
            let index = state.data.findIndex((blog)=> blog.id == data.id)
            if(index > 0){
                state.data[index].body = data.body
                state.data[index].title = data.title
                state.data[index].updated_at = data.updated_at
            }
        },
        deleteBlog:(state,data)=>{
            let index = state.data.findIndex((blog)=> blog.id == data.id)
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
    }),
    actions: {
        getBlogById({commit},id){
            return axiosClient.get(`/blogs/${id}`).then((res)=>{
                if(res.data.ok) commit('postdata',res.data)
                return res.data
            })
        },
        postlike({commit},id){
            return axiosClient.post(`/blogs/${id}/like`).then(res=>{
                if(res.data.ok) commit('like',{id: id,uid: res.data.uid,data:res.data.data})
                return res.data.data
            })
        },
        postComment({commit},data){
            return axiosClient.post(`/blogs/${data.id}/comment`, data.data).then(res=>{
                if(res.data.ok) commit('comment',res.data)
                return res.data.data
            })
        }
    },
    mutations: {
        postdata: (state,data)=>{
            state.data = {
                body: data.data.blogs.body,
                comments: data.data.comments.length,
                created_at: data.data.blogs.created_at,
                data: { like: data.data.likes, comment: data.data.comments },
                del_flag: data.data.blogs.del_flag,
                id: data.data.blogs.id,
                isliked: isLiked(data.uid, data.data.likes),
                like_count: data.data.blogs.like_count,
                likes: data.data.likes.length,
                title: data.data.blogs.title,
                updated_at: data.data.blogs.updated_at,
                user_id: data.data.blogs.user_id
            }
        },
        like: (state,data)=>{
            state.data.isliked = isLiked(data.uid,data.data)
            state.data.data.like = data.data
            state.data.likes = data.data.length
        },
        comment: (state,data)=>{
            state.data.data.comment = data.data
            state.data.comments = data.data.length
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
        me({commit}){
            return axiosClient.get(`/me`).then(res=>{
                
                if(res.data.ok) commit('putMe',res.data.data)
                return res.data
            })
        },
        getMyBlogs({commit}){
            return axiosClient.get(`/me/blogs`).then(res=>{
                console.log(res.data)
                if(res.data.ok) commit('putBlogData',res.data)
                return res.data;
            })
        }
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
        }
    }
}
const loadingScreen = {
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
const store = createStore({
    modules:{
        user: userModule,
        modalBox: modalBox,
        blogs: blogs,
        post: post,
        page: page,
        profile: profile,
        loadingScreen: loadingScreen,
        notification: notification
    }
})


export default store