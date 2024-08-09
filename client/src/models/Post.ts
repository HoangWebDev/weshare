interface IPostModel {
    id_posts?: number | null;
    id_user?: number | null;
    content?: string;
    images?: (File | string)[];
    video?: (File | string)[];
    created_at?: Date;
    updated_at?: Date;
}

class PostModel implements IPostModel {
    id_posts?: number | null;
    id_user?: number | null;
    content?: string;
    images?: (File | string)[];
    video?: (File | string)[];
    created_at?: Date;
    updated_at?: Date;

    constructor(
        id_posts: number | null = null,
        id_user: number | null = null,
        content: string = '',
        images: (File | string)[] = [],
        video: (File | string)[] = [],
        created_at: Date = new Date(),
        updated_at: Date = new Date()
    ) {
        this.id_posts = id_posts;
        this.id_user = id_user;
        this.content = content;
        this.images = images;
        this.video = video;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export default PostModel;
