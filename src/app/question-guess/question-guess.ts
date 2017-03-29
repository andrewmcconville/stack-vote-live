export interface IQuestionGuess {
    $key: string;
    answers: Array<{}>
    title: string;
    totalGuesses?: number;
    getTotalGuesses(): number;
}

export class QuestionGuess implements IQuestionGuess {
    $key: string;
    answers: Array<{}>
    title: string;
    totalGuesses?: number;

    //error: getTotalGuesses is not a function from guess-list.component.ts
    public getTotalGuesses(): number {
        return 0//this.answers.reduce((a: number, b: number) => { return a + b })
    }
}