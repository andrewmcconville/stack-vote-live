export interface IFbQuestion {
    questionId: number;
    answerIds: Array<number>;
    answerCounts: Array<number>;
}

export class FbQuestion implements IFbQuestion {
    questionId: number;
    answerIds: Array<number>;
    answerCounts: Array<number>;
}