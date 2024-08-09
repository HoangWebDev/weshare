export interface PostFormProps {
    openPost: boolean;
    togglePostForm: () => void;
}

export interface CommentFormProps {
    openComment: boolean;
    idPost: number;
    toggleComment: () => void;
}