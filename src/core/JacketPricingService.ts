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

export class JacketPricingService {
  constructor(
    private imageAnalyzer: IImageAnalyzer,
    private priceEstimator: IPriceEstimator,
    private imageStorage: IImageStorage
  ) {}

  /**
   * Analyzes a jacket image and provides a price estimate.
   * This is the main entry point for the application.
   */
  async analyzeAndPrice(image: ImageData): Promise<AnalysisResult> {
    // Step 1: Validate the image contains a jacket
    const isValid = await this.imageAnalyzer.validateImage(image);
    if (!isValid) {
      throw new Error('Image does not appear to contain a denim jacket');
    }

    // Step 2: Extract jacket attributes from the image
    const attributes = await this.imageAnalyzer.analyzeJacket(image);

    // Step 3: Get price estimate based on attributes
    const priceEstimate = await this.priceEstimator.estimatePrice(attributes);

    // Step 4: Store the image for future reference
    await this.imageStorage.store(image);

    return {
      attributes,
      priceEstimate,
      timestamp: new Date()
    };
  }
}
