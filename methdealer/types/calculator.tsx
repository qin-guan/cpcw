export interface GTEquation {
    title: string;
    id: number
}

export interface GTTopics {
    [key: string]: GTEquation[]
}

export interface Equation {
    id: number;
    formula: string;
    difficulty: 'a' | 'e';
    topic: string;
    title: string;
    legend: string;
    description: string;
    alternative: string;
}

export interface Topics {
    [key: string]: Equation[]
}