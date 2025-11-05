/**
 * BLACK BOX: Image Analysis Module
 *
 * Responsibility: Convert image data into structured jacket attributes.
 *
 * This can be implemented using:
 * - Google Gemini
 * - OpenAI Vision
 * - AWS Rekognition
 * - A custom ML model
 *
 * The implementation can be completely replaced without affecting other modules.
 */
import { ImageData, JacketAttributes } from '../types/primitives';
export interface IImageAnalyzer {
    /**
     * Analyzes an image and extracts jacket attributes.
     * @param image - The image data to analyze
     * @returns Structured jacket attributes
     * @throws Error if image cannot be processed
     */
    analyzeJacket(image: ImageData): Promise<JacketAttributes>;
    /**
     * Validates that the image contains a denim jacket.
     * @param image - The image data to validate
     * @returns true if image appears to contain a denim jacket
     */
    validateImage(image: ImageData): Promise<boolean>;
}
