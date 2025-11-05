/**
 * IMPLEMENTATION: Local filesystem storage
 * 
 * This is ONE way to implement IImageStorage.
 * Can easily be replaced with S3, database, etc.
 */

import { IImageStorage } from '../interfaces/IImageStorage';
import { ImageData } from '../types/primitives';
import { promises as fs } from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

export class LocalFileStorage implements IImageStorage {
  constructor(private storageDir: string) {
    // Ensure storage directory exists
    this.ensureDirectoryExists();
  }

  private async ensureDirectoryExists(): Promise<void> {
    try {
      await fs.mkdir(this.storageDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }
  }

  async store(image: ImageData): Promise<string> {
    await this.ensureDirectoryExists();
    
    const id = randomUUID();
    const ext = image.mimeType.split('/')[1] || 'jpg';
    const filepath = path.join(this.storageDir, `${id}.${ext}`);
    
    await fs.writeFile(filepath, image.buffer);
    
    console.log('  💾 [Storage] Saved image:', filepath);
    
    return id;
  }

  async retrieve(id: string): Promise<ImageData> {
    // Find file with this ID (may have different extensions)
    const files = await fs.readdir(this.storageDir);
    const file = files.find(f => f.startsWith(id));
    
    if (!file) {
      throw new Error(`Image not found: ${id}`);
    }

    const filepath = path.join(this.storageDir, file);
    const buffer = await fs.readFile(filepath);
    const ext = path.extname(file).slice(1);
    
    return {
      buffer,
      mimeType: `image/${ext}`,
      filename: file
    };
  }

  async delete(id: string): Promise<void> {
    const files = await fs.readdir(this.storageDir);
    const file = files.find(f => f.startsWith(id));
    
    if (file) {
      await fs.unlink(path.join(this.storageDir, file));
      console.log('  🗑️  [Storage] Deleted image:', id);
    }
  }
}
