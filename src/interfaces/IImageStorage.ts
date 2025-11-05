/**
 * BLACK BOX: Image Storage Module
 * 
 * Responsibility: Persist and retrieve images.
 * 
 * This can be implemented using:
 * - Local filesystem
 * - S3/Cloud storage
 * - Database BLOBs
 * 
 * The implementation can be completely replaced without affecting other modules.
 */

import { ImageData } from '../types/primitives';

export interface IImageStorage {
  /**
   * Stores an image and returns a unique identifier.
   * @param image - The image data to store
   * @returns Unique identifier for the stored image
   */
  store(image: ImageData): Promise<string>;
  
  /**
   * Retrieves an image by its identifier.
   * @param id - The unique identifier
   * @returns The image data
   * @throws Error if image doesn't exist
   */
  retrieve(id: string): Promise<ImageData>;
  
  /**
   * Deletes an image by its identifier.
   * @param id - The unique identifier
   */
  delete(id: string): Promise<void>;
}
