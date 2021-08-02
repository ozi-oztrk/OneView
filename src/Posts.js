import React, { useEffect, useState} from 'react';
import axios from 'axios';

// Component which renders title and description (second table after click)


// fetching specific data belongs to each user depending on their userId
const fetchPosts = (idx) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${idx}`)
                .then((response) => {
                    const { data } = response;
                    return data;
                })
                .catch((error) => console.error(error))
};

// helper function to extract header names
const extractHeaders = ([title, body]) => {
    const headings = {title, body};
    return Object.keys(headings);
  };

// userId and clicked props coming from main Table component
function Posts({userId, clicked}) {

    const [posts, setPosts] = useState([]);
    const [headers, setHeaders] = useState([]);
    

    useEffect(() => {
        fetchPosts(userId)
            .then((posts) => {
                setPosts(posts);
                setHeaders(extractHeaders(posts));
            })
    }, [userId, clicked])



    return (
        <div className='tables align'>
            { clicked && <table className='table'>
                <thead>
                    <tr>
                        {
                            headers.map((header, index) => {                              
                                    return <th key={index}>{header}</th>                                                                                                                      
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post, index) => {
                            if(post.userId === userId){
                                console.log(post)
                                return (
                                    <tr key={index}>
                                      <td>{post.title}</td>
                                      <td>{post.body}</td>                                  
                                    </tr>
                                  )
                            }                            
                        })
                    }
                </tbody>
            </table>}            
        </div>
    )
};

export default Posts;