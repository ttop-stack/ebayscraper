"use strict";
/**
 * Configuration and dependency injection setup.
 * This is where you wire together your black box modules.
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
exports.createPricingService = createPricingService;
const JacketPricingService_1 = require("./core/JacketPricingService");
const MockImageAnalyzer_1 = require("./implementations/MockImageAnalyzer");
const MockPriceEstimator_1 = require("./implementations/MockPriceEstimator");
const LocalFileStorage_1 = require("./implementations/LocalFileStorage");
const dotenv = __importStar(require("dotenv"));
// Load environment variables
dotenv.config();
function createPricingService() {
    const storageDir = process.env.STORAGE_DIR || './uploads';
    // Using MOCK implementations for now
    // When ready, replace with:
    //   - GeminiImageAnalyzer (requires GEMINI_API_KEY)
    //   - EbayPriceEstimator (requires EBAY_APP_ID, EBAY_CERT_ID, EBAY_DEV_ID)
    const imageAnalyzer = new MockImageAnalyzer_1.MockImageAnalyzer();
    const priceEstimator = new MockPriceEstimator_1.MockPriceEstimator();
    const imageStorage = new LocalFileStorage_1.LocalFileStorage(storageDir);
    // Inject dependencies into core service
    return new JacketPricingService_1.JacketPricingService(imageAnalyzer, priceEstimator, imageStorage);
}
