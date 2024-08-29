import {getInitials} from "../utils.ts";
import {useState} from "react";
import Avatar from "./avatar.tsx";
import usePosts from "../hooks/use-posts.ts";
import {useUser} from "@clerk/clerk-react";

type NewPostProps = {
  onGetPosts: () => void
}

function NewPost({onGetPosts}: NewPostProps) {
  const { user, isLoaded } = useUser()
  const {createPost} = usePosts();
  const [postContent, setPostContent] = useState("");
  const [posting, setIsPosting] = useState(false);

  const handlePost = async () => {
    setIsPosting(true);
    const created = await createPost(postContent);
    if (created) {
      onGetPosts();
    }
    setPostContent("");
    setIsPosting(false);
  };
  
  if (!isLoaded) {
    return;
  }

  return (
    <div className="card bg-base-100 w-100 shadow-lg">
      <div className="card-body">
        <div className="flex gap-4 items-start">
          <Avatar avatarUrl={user!.imageUrl} initials={getInitials(user!.firstName ?? "", user!.lastName ?? "")}/>
          <div className="w-full">
            <textarea className="w-full" placeholder="Type something nice..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}/>
            <div className="card-actions mt-4">
              <button
                className="btn btn-primary text-white"
                onClick={handlePost}
                disabled={posting}>
                {
                  posting
                    ?
                    <span className="loading loading-spinner"></span>
                    :
                    <SendIcon/>
                }
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-send"
         viewBox="0 0 16 16">
      <path
        d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
    </svg>
  );
}

export default NewPost;