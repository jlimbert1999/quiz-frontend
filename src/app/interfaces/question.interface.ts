export interface question {
    _id: string;
    name: string;
    isActive: boolean;
    options: option[];
}

export interface option {
    name: string;
    correct: boolean;
    isSelected?:boolean
}
