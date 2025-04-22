export interface UploadFile {
    file_id?: number;
    prevUrl: string,
    filename: string,
    size: number,
    realFile?: File
}