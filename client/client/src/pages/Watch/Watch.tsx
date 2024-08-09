/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useContext, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faVideo, faImage, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ResponsiveContext } from '~/features/Provider/ResponsiveProvider';
import PostForm from '~/features/Post/PostForm';
import Contact from '~/pages/Contact/Contact';
import Button from '~/components/Button/Button';
import Image from '~/components/Image';
import Post from '~/features/Post/Post';
import { useFetch, useProfile } from '~/hooks';
import FriendShip from '~/features/FriendShip/FriendShip';

function Watch() {
    const [openPost, setOpenPost] = useState(false);
    const context = useContext(ResponsiveContext);
    const userProfile = useProfile();
    const { posts } = useFetch();
    const userProfileId = userProfile.id_user ?? 0;

    const togglePostForm = () => {
        setOpenPost(!openPost);
    };

    const filterVideo = useMemo(() => {
        if (!posts) {
            return [];
        }
        // Check if the video array is not empty
        return posts.filter((post) => post.video && post.video.length > 0 && (!post.images || post.images.length === 0));
    }, [posts]);

    console.log(filterVideo);


    return (
        <>
            <section className="w-custom fixed top-[60px] left-[16.25rem] max-h-[90vh] overflow-y-auto ml-[1rem] mr-[1rem] scrollbar hidden md:block">
                <h1 className="text-xl font-semibold text-left">Watch</h1>
                <Post posts={filterVideo} togglePostForm={togglePostForm} />
                <Contact />
            </section>
            {/* Responsive */}
        </>
    );
}

export default Watch;
