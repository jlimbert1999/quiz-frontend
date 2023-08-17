export interface question {
    _id: string;
    name: string;
    isActive: boolean;
    area: string;
    options: option[];
    imageUrl?: string;
}

export interface option {
    name: string;
    correct: boolean;
    imageUrl?: string;
    selected?: boolean
}
