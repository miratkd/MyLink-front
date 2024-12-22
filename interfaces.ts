export interface Card {
    id: number,
    imageUrl: string,
    title: string,
    description: string,
    displayEmail?: string,
    mainColor?: string,
    user?: string,
    links?: Link[]
}

export interface Link {
    position: number,
    plataformName: string,
    link: string,
    id: number,
    icon: string,
    color: string
}

export interface Plataform{
    color: string,
    imgUrl: string,
    name: string,
    id: number
}