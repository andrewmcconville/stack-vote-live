export class QuestionNewest {
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
}