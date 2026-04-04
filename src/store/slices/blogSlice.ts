import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types based on actual API response from curl
interface BlogPost {
  show_bool: boolean;
  id: number;
  title: string;
  author_name: string;
  thumbnail_image: string;
  content_body: string;
  date_to_show: string;
  comments: any[];
  featured: boolean;
}

interface Comment {
  id: number;
  post: number;
  author_name?: string;
  content: string;
  created_at: string;
  updated_at?: string;
  parent?: number | null;
}

// Create the API slice
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://api.nitdgplug.org/blog/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["BlogPost", "Comment"],
  endpoints: (builder) => ({
    // ==================== BLOG POSTS ====================
    
    // Fetch all blog posts - API returns array directly, not an object
    fetchBlogPosts: builder.query<BlogPost[], void>({
      query: () => "posts/",
      providesTags: ["BlogPost"],
    }),

    // Fetch a single blog post by ID
    fetchBlogPostById: builder.query<BlogPost, number>({
      query: (id) => `posts/${id}/`,
      providesTags: (result, error, id) => [{ type: "BlogPost", id }],
    }),

    // Create a new blog post
    createBlogPost: builder.mutation<BlogPost, Partial<BlogPost>>({
      query: (post) => ({
        url: "posts/",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["BlogPost"],
    }),

    // Update a blog post
    updateBlogPost: builder.mutation<BlogPost, { id: number; data: Partial<BlogPost> }>({
      query: ({ id, data }) => ({
        url: `posts/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "BlogPost", id }],
    }),

    // Delete a blog post
    deleteBlogPost: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["BlogPost"],
    }),

    // ==================== COMMENTS ====================
    
    // Fetch all comments - API returns array directly
    fetchComments: builder.query<Comment[], void>({
      query: () => "comments/",
      providesTags: ["Comment"],
    }),

    // Fetch comments for a specific post
    fetchCommentsByPostId: builder.query<Comment[], number>({
      query: (postId) => `comments/?post=${postId}`,
      providesTags: (result, error, postId) => [{ type: "Comment", id: postId }],
    }),

    // Fetch a single comment by ID
    fetchCommentById: builder.query<Comment, number>({
      query: (id) => `comments/${id}/`,
      providesTags: (result, error, id) => [{ type: "Comment", id }],
    }),

    // Create a new comment
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: (comment) => ({
        url: "comments/",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: (result, error, { post }) => [
        "Comment",
        { type: "Comment", id: post },
      ],
    }),

    // Update a comment
    updateComment: builder.mutation<Comment, { id: number; data: Partial<Comment> }>({
      query: ({ id, data }) => ({
        url: `comments/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Comment", id }],
    }),

    // Delete a comment
    deleteComment: builder.mutation<void, number>({
      query: (id) => ({
        url: `comments/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),

    // Fetch replies for a comment (nested comments)
    fetchCommentReplies: builder.query<Comment[], number>({
      query: (parentId) => `comments/?parent=${parentId}`,
      providesTags: (result, error, parentId) => [
        { type: "Comment", id: `replies-${parentId}` },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  // Blog Posts Hooks
  useFetchBlogPostsQuery,
  useFetchBlogPostByIdQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
  
  // Comments Hooks
  useFetchCommentsQuery,
  useFetchCommentsByPostIdQuery,
  useFetchCommentByIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useFetchCommentRepliesQuery,
} = blogApi;