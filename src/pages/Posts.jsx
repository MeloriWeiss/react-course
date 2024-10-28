import React, {useEffect, useState} from 'react';
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPagesCount} from "../utils/pages";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import Loader from "../components/UI/Loader/Loader";

const Posts = () => {
    const [posts, setPosts] = useState([
        {id: 1, title: 'тт', body: 'пп'},
        {id: 2, title: 'вв', body: 'лл'},
        {id: 3, title: 'аа#', body: 'яя'},
    ]);
    const [filter, setFilter] = useState({
        sort: '',
        query: ''
    });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPagesCount(totalCount, limit));
    })

    useEffect(() => {
        fetchPosts(limit, page).then();
    }, []);

    // const bodyInputRef = useRef();
    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page).then();
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}></PostForm>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}></PostFilter>
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader></Loader></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Посты про js'}></PostList>
            }
            <Pagination page={page} changePage={changePage} totalPages={totalPages}></Pagination>
        </div>
    );
};

export default Posts;