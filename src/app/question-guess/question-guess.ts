export class QuestionGuess {
    $key: string;
    answers: Array<{}>;
    title: string;
    owner: {
        reputation: number,
        profile_image: string,
        display_name: string,
        link: string
    };
    totalGuesses?: number;
}
