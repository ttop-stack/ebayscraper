/**
 * IMPLEMENTATION: Local filesystem storage
 *
 * This is ONE way to implement IImageStorage.
 * Can easily be replaced with S3, database, etc.
 */
import { IImageStorage } from '../interfaces/IImageStorage';
import { ImageData } from '../types/primitives';
export declare class LocalFileStorage implements IImageStorage {
    private storageDir;
    constructor(storageDir: string);
    private ensureDirectoryExists;
    store(image: ImageData): Promise<string>;
    retrieve(id: string): Promise<ImageData>;
    delete(id: string): Promise<void>;
}
