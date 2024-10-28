import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById(params.id).then();
        fetchComments(params.id).then();
    }, []);

    return (
        <div>
            <h2>Вы попали на страницу поста с ID = {params.id}</h2>
            {isLoading
                ? <Loader></Loader>
                : <div>{post.id}. {post.title}</div>
            }
            <h2>Комментарии</h2>
            {isComLoading
                ? <Loader></Loader>
                : <div>
                    {comments.map(comment =>
                        <div key={comment.id} style={{marginTop: 15}}>
                            <h4>{comment.email}</h4>
                            <div>{comment.body}</div>
                        </div>)}
                </div>
            }
        </div>
    );
};

export default PostIdPage;