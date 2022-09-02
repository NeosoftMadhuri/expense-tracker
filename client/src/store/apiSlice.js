import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseURI='http://localhost:5000'
export const apiSlice=createApi({
    baseQuery:fetchBaseQuery({baseUrl:baseURI}),
    endpoints:builder=>({

        //get categories
        getCategories:builder.query({
            //get:'http://localhost:5000/api/categories
            query:()=>'/api/categories',
            providesTags:['categories']
        }),

        //get labels
        getLabels:builder.query({
             //get:'http://localhost:5000/api/labes
            query:()=>'/api/labels',
            providesTags:['transaction']
        }),

        //add new transaction
        addTransaction:builder.mutation({
            query:(initialTransaction)=>({
                 //post:'http://localhost:5000/api/transaction
                url:'/api/transaction',
                method:"POST",
                body:initialTransaction
            }),
            invalidatesTags:['transaction']
        }),
        //delete record

        deleteTransaction:builder.mutation({
             //delete:'http://localhost:5000/api/transaction
            query:recordid=>({
                url:'/api/transaction',
                method:"DELETE",
                body:recordid
            }),
            invalidatesTags:['transaction']      
        })
    })
})

export default apiSlice