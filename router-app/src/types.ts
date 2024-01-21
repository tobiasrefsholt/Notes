export type category = {
    guid: string | null;
    parentGuid: string | null;
    name: string;
}

export type Note = {
    guid: string;
    title: string;
    content: string;
    categoryGuid: string | null;
    categoryName: string | null;
    dateAdded: Date;
    lastChanged: Date;
}

export type InsertNote = {
    guid?: string;
    title?: string;
    content?: string;
    categoryGuid?: string | null;
    categoryName?: string | null;
}

export type FetchResponse<T> = {
    error: string | null;
    isPending: boolean;
    data: T;
}