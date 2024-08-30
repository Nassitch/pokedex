export class FavoriteCard {
    private userId: number;
    private cardId: number;
    private ref: number

    constructor(userId: number, cardId: number, ref: number) {
        this.userId = userId;
        this.cardId = cardId;
        this.ref = ref;
    }
    
}