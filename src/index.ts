/**
 * CLI Entry Point
 * Simple command-line interface for testing the jacket pricer
 */

import { createPricingService } from './config';
import { promises as fs } from 'fs';
import * as path from 'path';

async function main() {
  console.log('\n🧥 Denim Jacket Price Analyzer\n');
  console.log('================================\n');

  // Get image path from command line
  const imagePath = process.argv[2];
  
  if (!imagePath) {
    console.error('❌ Error: No image provided');
    console.log('\nUsage: npm start <path-to-jacket-image>');
    console.log('Example: npm start ./test-jacket.jpg\n');
    process.exit(1);
  }

  // Check if file exists
  try {
    await fs.access(imagePath);
  } catch (error) {
    console.error(`❌ Error: File not found: ${imagePath}\n`);
    process.exit(1);
  }

  try {
    // Create the pricing service
    const service = createPricingService();
    
    // Read the image file
    console.log('📸 Loading image:', imagePath);
    const buffer = await fs.readFile(imagePath);
    const filename = path.basename(imagePath);
    const mimeType = getMimeType(filename);
    
    // Analyze and price the jacket
    console.log('⏳ Processing...\n');
    const result = await service.analyzeAndPrice({
      buffer,
      mimeType,
      filename
    });

    // Display results
    console.log('\n📊 ANALYSIS RESULTS');
    console.log('================================\n');
    
    console.log('🏷️  JACKET DETAILS:');
    console.log('  Brand:', result.attributes.brand || 'Unknown');
    console.log('  Condition:', result.attributes.condition);
    console.log('  Style:', result.attributes.style || 'Unknown');
    console.log('  Color:', result.attributes.color || 'Unknown');
    console.log('  Size:', result.attributes.size || 'Unknown');
    console.log('  Material:', result.attributes.material || 'Unknown');
    console.log('  Features:', result.attributes.features.join(', ') || 'None');
    
    console.log('\n💰 PRICE ESTIMATE:');
    console.log(`  Range: ${result.priceEstimate.currency} $${result.priceEstimate.lowEstimate} - $${result.priceEstimate.highEstimate}`);
    console.log(`  Average: ${result.priceEstimate.currency} $${result.priceEstimate.averagePrice}`);
    console.log(`  Confidence: ${(result.priceEstimate.confidence * 100).toFixed(0)}%`);
    console.log(`  Based on: ${result.priceEstimate.comparableListings} listings`);
    console.log(`  Data Source: ${result.priceEstimate.dataSource}`);
    
    console.log('\n⏰ Analysis completed at:', result.timestamp.toLocaleString());
    console.log('\n✅ Done!\n');

  } catch (error) {
    console.error('\n❌ Error during analysis:');
    if (error instanceof Error) {
      console.error('  ', error.message);
    } else {
      console.error('  ', error);
    }
    console.log('');
    process.exit(1);
  }
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp'
  };
  return mimeTypes[ext] || 'image/jpeg';
}

// Run the CLI
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
