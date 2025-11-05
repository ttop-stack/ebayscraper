/**
 * CORE ORCHESTRATOR
 *
 * This is the only module that knows about the overall flow.
 * All dependencies are injected through interfaces.
 *
 * This service can be tested with mock implementations.
 * Any module can be swapped without changing this code.
 */
import { IImageAnalyzer } from '../interfaces/IImageAnalyzer';
import { IPriceEstimator } from '../interfaces/IPriceEstimator';
import { IImageStorage } from '../interfaces/IImageStorage';
import { ImageData, AnalysisResult } from '../types/primitives';
export declare class JacketPricingService {
    private imageAnalyzer;
    private priceEstimator;
    private imageStorage;
    constructor(imageAnalyzer: IImageAnalyzer, priceEstimator: IPriceEstimator, imageStorage: IImageStorage);
    /**
     * Analyzes a jacket image and provides a price estimate.
     * This is the main entry point for the application.
     */
    analyzeAndPrice(image: ImageData): Promise<AnalysisResult>;
}
