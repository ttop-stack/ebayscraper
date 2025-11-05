"use strict";
/**
 * IMPLEMENTATION: Local filesystem storage
 *
 * This is ONE way to implement IImageStorage.
 * Can easily be replaced with S3, database, etc.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalFileStorage = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const crypto_1 = require("crypto");
class LocalFileStorage {
    constructor(storageDir) {
        this.storageDir = storageDir;
        // Ensure storage directory exists
        this.ensureDirectoryExists();
    }
    async ensureDirectoryExists() {
        try {
            await fs_1.promises.mkdir(this.storageDir, { recursive: true });
        }
        catch (error) {
            // Directory might already exist, ignore error
        }
    }
    async store(image) {
        await this.ensureDirectoryExists();
        const id = (0, crypto_1.randomUUID)();
        const ext = image.mimeType.split('/')[1] || 'jpg';
        const filepath = path.join(this.storageDir, `${id}.${ext}`);
        await fs_1.promises.writeFile(filepath, image.buffer);
        console.log('  💾 [Storage] Saved image:', filepath);
        return id;
    }
    async retrieve(id) {
        // Find file with this ID (may have different extensions)
        const files = await fs_1.promises.readdir(this.storageDir);
        const file = files.find(f => f.startsWith(id));
        if (!file) {
            throw new Error(`Image not found: ${id}`);
        }
        const filepath = path.join(this.storageDir, file);
        const buffer = await fs_1.promises.readFile(filepath);
        const ext = path.extname(file).slice(1);
        return {
            buffer,
            mimeType: `image/${ext}`,
            filename: file
        };
    }
    async delete(id) {
        const files = await fs_1.promises.readdir(this.storageDir);
        const file = files.find(f => f.startsWith(id));
        if (file) {
            await fs_1.promises.unlink(path.join(this.storageDir, file));
            console.log('  🗑️  [Storage] Deleted image:', id);
        }
    }
}
exports.LocalFileStorage = LocalFileStorage;
