export interface IQuestionNewest {
    owner: {
        reputation: number,
        profile_image: string,
        display_name: string,
        link: string
    };
    accepted_answer_id: number;
    answer_count: number;
    question_id: number;
    title: string;
    totalGuesses?: number;
    firebaseKey?: string;
}

export class QuestionNewest implements IQuestionNewest {
    owner: {
        reputation: number,
        profile_image: string,
        display_name: string,
        link: string
    };
    accepted_answer_id: number;
    answer_count: number;
    question_id: number;
    title: string;
    totalGuesses?: number;
    firebaseKey?: string;
}