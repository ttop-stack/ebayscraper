/**
 * Configuration and dependency injection setup.
 * This is where you wire together your black box modules.
 */

import { JacketPricingService } from './core/JacketPricingService';
import { MockImageAnalyzer } from './implementations/MockImageAnalyzer';
import { MockPriceEstimator } from './implementations/MockPriceEstimator';
import { LocalFileStorage } from './implementations/LocalFileStorage';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export function createPricingService(): JacketPricingService {
  const storageDir = process.env.STORAGE_DIR || './uploads';

  // Using MOCK implementations for now
  // When ready, replace with:
  //   - GeminiImageAnalyzer (requires GEMINI_API_KEY)
  //   - EbayPriceEstimator (requires EBAY_APP_ID, EBAY_CERT_ID, EBAY_DEV_ID)
  const imageAnalyzer = new MockImageAnalyzer();
  const priceEstimator = new MockPriceEstimator();
  const imageStorage = new LocalFileStorage(storageDir);

  // Inject dependencies into core service
  return new JacketPricingService(
    imageAnalyzer,
    priceEstimator,
    imageStorage
  );
}
