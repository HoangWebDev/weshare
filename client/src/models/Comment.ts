interface ICommentModel {
    id_comment?: number | null;
    id_posts?: number;
    id_user?: number;
    content?: string;
    image?: string;
    created_at?: Date;
    updated_at?: Date;
}

class CommentModel implements ICommentModel {
    id_comment?: number | null;
    id_posts?: number;
    id_user?: number;
    content?: string;
    image?: string;
    created_at?: Date;
    updated_at?: Date;
    length: number | null | undefined;

    constructor(id_comment: number | null,
        id_posts: number,
        id_user: number,
        content: string,
        image: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.id_comment = id_comment;
        this.id_posts = id_posts;
        this.id_user = id_user;
        this.content = content;
        this.image = image;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export default CommentModel