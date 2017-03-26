export interface IFbQuestion {
    questionId: number;
    answerIds: Array<number>;
    answerCounts: Array<number>;
    getTotalGuesses(): number;
}

export class FbQuestion implements IFbQuestion {
    questionId: number;
    answerIds: Array<number>;
    answerCounts: Array<number>;

    //error: getTotalGuesses is not a function from guess-list.component.ts
    getTotalGuesses(): number {
        return this.answerCounts.reduce((a: number, b: number) => { return a + b })
    }
}