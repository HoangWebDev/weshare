interface IFriendShip {
    id_friendship?: number | null;
    id_user1?: number;
    id_user2?: number;
    status?: number;
    created_at?: Date;
    updated_at?: Date;


}

class FriendShip implements IFriendShip {
    id_friendship?: number | null;
    id_user1?: number;
    id_user2?: number;
    status?: number;
    created_at?: Date;
    updated_at?: Date;

    constructor(id_friendship: number | null,
        id_user1: number,
        id_user2: number,
        status: number,
        created_at: Date,
        updated_at: Date
    ) {
        this.id_friendship = id_friendship;
        this.id_user1 = id_user1;
        this.id_user2 = id_user2;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export default FriendShip