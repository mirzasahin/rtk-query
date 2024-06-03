// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const jsonPlaceholderApi = createApi({
  reducerPath: 'jsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPostById: builder.query({ // We can use mutation key instead query to post data to DB.
      query: (id) => `posts/${id}`,
    }),
    createPost: builder.mutation({
        query: (newPost) => ({
            url: `posts`,
            method: 'POST',
            body: newPost
        })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostByIdQuery, useCreatePostMutation } = jsonPlaceholderApi