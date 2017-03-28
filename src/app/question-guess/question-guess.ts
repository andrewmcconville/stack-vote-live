export interface IQuestionGuess {
    $key: string;
    questionId: number;
    answerIds: Array<number>;
    answerCounts: Array<number>;
    totalGuesses?: number;
    getTotalGuesses(): number;
}

export class QuestionGuess implements IQuestionGuess {
    $key: string;
    questionId: number;
    answerIds: Array<number>;
    answerCounts: Array<number>;
    totalGuesses?: number;

    //error: getTotalGuesses is not a function from guess-list.component.ts
    public getTotalGuesses(): number {
        return this.answerCounts.reduce((a: number, b: number) => { return a + b })
    }
}