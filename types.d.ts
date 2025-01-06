export interface Artist {
    name: string;
    image?: string;
    info?: string;
}

export interface Album {
    name: string;
    artist: string;
    year: number;
    image?: string;
}

export interface Track {
    name: string;
    album: string;
    duration: string;
}
