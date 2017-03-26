export interface ISoQuestion {
    question_id: number;
    title: string;
    totalGuesses?: number;
}

export class SoQuestion implements ISoQuestion {
    question_id: number;
    title: string;
    totalGuesses?: number;
}