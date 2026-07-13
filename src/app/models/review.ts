export interface Review {
    id: number
    nome: string
    nota: number
    review: string
}

export interface ApiReviews {
    reviews: Review[]
}
