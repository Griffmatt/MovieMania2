export interface Icrew{
    name: string;
    job: string;

}

export interface Iactor{
    id: number;
    name: string; 
    character: string;
    profile_path: string;
}

export interface Icredits{
    cast: Iactor[];
    crew: Icrew[];

}