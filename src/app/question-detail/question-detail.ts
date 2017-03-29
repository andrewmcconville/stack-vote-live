export class QuestionDetail {
    answers: Array<{
        up_vote_count: number,
        answer_id: number,
        body: string,
        guessCount?: number
    }>;
    owner: {
        reputation: number,
        profile_image: string,
        display_name: string,
        link: string
    };
    accepted_answer_id: number;
    answer_count: number;
    last_activity_date: number;
    question_id: number;
    link: string;
    title: string;
    body: string;
}