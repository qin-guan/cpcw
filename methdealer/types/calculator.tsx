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
    calculation_vars: string;
    calculation_formula: string;
    calculated_units: string;
    simplify_formula: string;
    calculation_formula_var_mapping: string;
    graph_formula: string;
    resource_links: string;
    expand_formula: string;
    diff_formula: string;
}

export interface Topics {
    [key: string]: Equation[]
}