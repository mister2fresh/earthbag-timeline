// scripts/add-photos.js
const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const PHASES = [
  'foundation',
  'walls', 
  'bondbeam',
  'roof',
  'finishing',
  'toinfinity'
];

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function optimizeImage(inputPath, outputPath, isCover = false) {
  try {
    await sharp(inputPath)
      .resize(1200, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ 
        quality: 82, 
        progressive: true 
      })
      .toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    console.log(`  ✓ ${path.basename(outputPath)} (${(outputStats.size / 1024).toFixed(0)}KB, ${savings}% smaller)`);
  } catch (error) {
    console.error(`  ✗ Error processing ${path.basename(inputPath)}:`, error.message);
  }
}

async function main() {
  console.log('\n🏜️  Earthship Photo Organizer\n');
  console.log('This will help you organize and optimize photos for your earthship timeline.\n');

  // Step 1: Select phase
  console.log('Available phases:');
  PHASES.forEach((phase, i) => {
    console.log(`  ${i + 1}. ${phase}`);
  });
  
  const phaseAnswer = await question('\nWhich phase? (enter number or name): ');
  const phaseIndex = parseInt(phaseAnswer) - 1;
  const phase = isNaN(phaseIndex) ? phaseAnswer.toLowerCase() : PHASES[phaseIndex];
  
  if (!PHASES.includes(phase)) {
    console.log(`\n❌ Invalid phase. Please use one of: ${PHASES.join(', ')}`);
    rl.close();
    return;
  }

  console.log(`\n📁 Selected phase: ${phase}\n`);

  // Step 2: Get source folder
  const sourceFolder = await question('Enter the path to your photos folder (drag folder here): ');
  const cleanSourcePath = sourceFolder.trim().replace(/['"]/g, '');
  
  if (!fs.existsSync(cleanSourcePath)) {
    console.log(`\n❌ Folder not found: ${cleanSourcePath}`);
    rl.close();
    return;
  }

  // Step 3: Get photo files
  const files = fs.readdirSync(cleanSourcePath)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map(file => path.join(cleanSourcePath, file));

  if (files.length === 0) {
    console.log('\n❌ No image files found in that folder.');
    rl.close();
    return;
  }

  console.log(`\n📸 Found ${files.length} photos`);
  
  // Step 4: Select cover photo
  console.log('\nYour photos:');
  files.forEach((file, i) => {
    console.log(`  ${i + 1}. ${path.basename(file)}`);
  });
  
  const coverAnswer = await question('\nWhich photo should be the cover? (enter number, or press Enter for first): ');
  const coverIndex = coverAnswer.trim() ? parseInt(coverAnswer) - 1 : 0;
  
  if (coverIndex < 0 || coverIndex >= files.length) {
    console.log('\n❌ Invalid selection.');
    rl.close();
    return;
  }

  // Step 5: Create output directory
  const outputDir = path.join(process.cwd(), 'public', 'images', phase);
  await fs.ensureDir(outputDir);

  console.log(`\n🔄 Processing and optimizing ${files.length} photos...\n`);

  // Step 6: Process cover photo first
  const coverFile = files[coverIndex];
  const coverOutput = path.join(outputDir, 'cover.jpg');
  console.log('📌 Cover photo:');
  await optimizeImage(coverFile, coverOutput, true);

  // Step 7: Process remaining photos
  console.log('\n📷 Gallery photos:');
  let photoNumber = 1;
  
  for (let i = 0; i < files.length; i++) {
    if (i === coverIndex) continue; // Skip cover photo
    
    const file = files[i];
    const outputPath = path.join(outputDir, `photo-${photoNumber}.jpg`);
    await optimizeImage(file, outputPath);
    photoNumber++;
  }

  console.log(`\n✅ Success! ${files.length} photos organized and optimized.`);
  console.log(`📁 Location: /public/images/${phase}/`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Check the photos in /public/images/${phase}/`);
  console.log(`   2. Update content/${phase}/phase.md with a description`);
  console.log(`   3. Run this script again for the next phase`);
  console.log(`   4. When all phases are done, run: npm run dev`);
  
  rl.close();
}

main().catch(error => {
  console.error('Error:', error);
  rl.close();
  process.exit(1);
});
