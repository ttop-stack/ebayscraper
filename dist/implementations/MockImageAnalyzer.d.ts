/**
 * MOCK IMPLEMENTATION for testing
 * This simulates Gemini without needing an API key
 *
 * Replace with GeminiImageAnalyzer when ready to use real API
 */
import { IImageAnalyzer } from '../interfaces/IImageAnalyzer';
import { ImageData, JacketAttributes } from '../types/primitives';
export declare class MockImageAnalyzer implements IImageAnalyzer {
    analyzeJacket(image: ImageData): Promise<JacketAttributes>;
    validateImage(image: ImageData): Promise<boolean>;
}
