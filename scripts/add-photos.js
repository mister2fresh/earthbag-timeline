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

// Extract numbers from filename for sorting
function extractNumber(filename) {
  const basename = path.basename(filename, path.extname(filename));
  const matches = basename.match(/\d+/g);
  if (matches) {
    // Return the first number found, or concatenate all numbers
    return parseInt(matches.join(''), 10);
  }
  return 0;
}

// Natural sort comparison (handles numbers in strings properly)
function naturalSort(a, b) {
  const numA = extractNumber(a);
  const numB = extractNumber(b);
  
  if (numA !== numB) {
    return numA - numB;
  }
  
  // Fall back to alphabetical if numbers are equal
  return path.basename(a).localeCompare(path.basename(b));
}

// Sort by file modification date
function dateSort(a, b) {
  const statA = fs.statSync(a);
  const statB = fs.statSync(b);
  return statA.mtime.getTime() - statB.mtime.getTime();
}

// Find the highest existing photo number in a directory
function findHighestPhotoNumber(dir) {
  if (!fs.existsSync(dir)) return 0;
  
  const files = fs.readdirSync(dir);
  let highest = 0;
  
  for (const file of files) {
    const match = file.match(/^photo-(\d+)\.jpg$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > highest) highest = num;
    }
  }
  
  return highest;
}

async function optimizeImage(inputPath, outputPath, isCover = false, forceOrientation = null) {
  try {
    let image = sharp(inputPath);
    
    // First, auto-rotate based on EXIF orientation data
    image = image.rotate();
    
    // Get metadata to check dimensions after EXIF rotation
    const metadata = await image.metadata();
    const width = metadata.width;
    const height = metadata.height;
    const isPortrait = height > width;
    const isLandscape = width > height;
    
    // Apply orientation transformation if needed
    if (forceOrientation === 'landscape' && isPortrait) {
      // Rotate portrait to landscape (90 degrees clockwise)
      image = sharp(inputPath).rotate(90);
      console.log(`  ↻ Rotating portrait → landscape`);
    } else if (forceOrientation === 'portrait' && isLandscape) {
      // Rotate landscape to portrait (90 degrees clockwise)
      image = sharp(inputPath).rotate(90);
      console.log(`  ↻ Rotating landscape → portrait`);
    } else {
      // Just apply EXIF auto-rotation
      image = sharp(inputPath).rotate();
    }
    
    await image
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
    
    const orientationLabel = isPortrait ? '↕ portrait' : (isLandscape ? '↔ landscape' : '◻ square');
    console.log(`  ✓ ${path.basename(outputPath)} (${(outputStats.size / 1024).toFixed(0)}KB, ${savings}% smaller) [${orientationLabel}]`);
  } catch (error) {
    console.error(`  ✗ Error processing ${path.basename(inputPath)}:`, error.message);
  }
}

async function getImageOrientation(imagePath) {
  try {
    const image = sharp(imagePath).rotate(); // Apply EXIF rotation first
    const metadata = await image.metadata();
    if (metadata.height > metadata.width) return 'portrait';
    if (metadata.width > metadata.height) return 'landscape';
    return 'square';
  } catch {
    return 'unknown';
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

  // Check for existing photos in this phase
  const outputDir = path.join(process.cwd(), 'public', 'images', phase);
  const existingHighest = findHighestPhotoNumber(outputDir);
  const hasCover = fs.existsSync(path.join(outputDir, 'cover.jpg'));
  
  if (existingHighest > 0 || hasCover) {
    console.log(`📂 Existing photos found in this phase:`);
    if (hasCover) console.log(`   • cover.jpg`);
    if (existingHighest > 0) console.log(`   • photo-1.jpg through photo-${existingHighest}.jpg`);
    console.log('');
  }

  // Step 2: Get source folder
  const sourceFolder = await question('Enter the path to your photos folder (drag folder here): ');
  const cleanSourcePath = sourceFolder.trim().replace(/['"]/g, '');
  
  if (!fs.existsSync(cleanSourcePath)) {
    console.log(`\n❌ Folder not found: ${cleanSourcePath}`);
    rl.close();
    return;
  }

  // Step 3: Get photo files (unsorted initially)
  let files = fs.readdirSync(cleanSourcePath)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map(file => path.join(cleanSourcePath, file));

  if (files.length === 0) {
    console.log('\n❌ No image files found in that folder.');
    rl.close();
    return;
  }

  console.log(`\n📸 Found ${files.length} photos`);

  // Step 4: Ask about sort order
  console.log('\n📋 Sort order options:');
  console.log('  1. Alphabetical (default filesystem order)');
  console.log('  2. Numerical (by numbers in filename: img1, img2, img10...)');
  console.log('  3. Date modified (oldest first)');
  console.log('  4. Date modified (newest first)');
  
  const sortAnswer = await question('\nChoose sort order (1-4, default: 1): ');
  const sortChoice = parseInt(sortAnswer) || 1;
  
  switch (sortChoice) {
    case 2:
      files.sort(naturalSort);
      console.log('  → Sorted by numerical order');
      break;
    case 3:
      files.sort(dateSort);
      console.log('  → Sorted by date (oldest first)');
      break;
    case 4:
      files.sort(dateSort).reverse();
      console.log('  → Sorted by date (newest first)');
      break;
    default:
      files.sort((a, b) => path.basename(a).localeCompare(path.basename(b)));
      console.log('  → Sorted alphabetically');
  }
  
  // Step 5: Show photos with orientation info
  console.log('\nYour photos (in import order):');
  for (let i = 0; i < files.length; i++) {
    const orientation = await getImageOrientation(files[i]);
    const orientationIcon = orientation === 'portrait' ? '↕' : (orientation === 'landscape' ? '↔' : '◻');
    const numInFilename = extractNumber(files[i]);
    const numLabel = numInFilename > 0 ? ` (#${numInFilename})` : '';
    console.log(`  ${i + 1}. ${path.basename(files[i])}${numLabel} [${orientationIcon} ${orientation}]`);
  }
  
  // Step 6: Ask about auto-rotation preference
  console.log('\n🔄 Orientation options:');
  console.log('  1. Keep original orientations (just fix EXIF rotation)');
  console.log('  2. Force all to landscape');
  console.log('  3. Force all to portrait');
  
  const orientationAnswer = await question('\nChoose orientation option (1-3, default: 1): ');
  const orientationChoice = parseInt(orientationAnswer) || 1;
  
  let forceOrientation = null;
  if (orientationChoice === 2) forceOrientation = 'landscape';
  if (orientationChoice === 3) forceOrientation = 'portrait';

  // Step 7: Ask about cover photo
  let includeCover = false;
  let coverIndex = -1;
  
  if (hasCover) {
    const coverAnswer = await question('\nCover photo already exists. Replace it? (y/N): ');
    includeCover = coverAnswer.trim().toLowerCase() === 'y';
  } else {
    const coverAnswer = await question('\nInclude a cover photo? (Y/n): ');
    includeCover = coverAnswer.trim().toLowerCase() !== 'n';
  }
  
  if (includeCover) {
    const coverSelectAnswer = await question('Which photo should be the cover? (enter number, or press Enter for first): ');
    coverIndex = coverSelectAnswer.trim() ? parseInt(coverSelectAnswer) - 1 : 0;
    
    if (coverIndex < 0 || coverIndex >= files.length) {
      console.log('\n❌ Invalid selection.');
      rl.close();
      return;
    }
  }

  // Step 8: Ask about starting number
  const suggestedStart = existingHighest + 1;
  console.log(`\n🔢 Photo numbering:`);
  if (existingHighest > 0) {
    console.log(`   Existing photos go up to photo-${existingHighest}.jpg`);
    console.log(`   Suggested starting number: ${suggestedStart}`);
  }
  
  const startAnswer = await question(`\nStart numbering at? (default: ${suggestedStart}): `);
  const startNumber = parseInt(startAnswer.trim()) || suggestedStart;
  
  if (startNumber < 1) {
    console.log('\n❌ Starting number must be at least 1.');
    rl.close();
    return;
  }
  
  if (startNumber <= existingHighest) {
    const overwriteAnswer = await question(`\n⚠️  This will overwrite existing photos starting at photo-${startNumber}.jpg. Continue? (y/N): `);
    if (overwriteAnswer.trim().toLowerCase() !== 'y') {
      console.log('\n❌ Cancelled.');
      rl.close();
      return;
    }
  }

  // Step 9: Create output directory
  await fs.ensureDir(outputDir);

  const photosToProcess = includeCover ? files.length : files.length;
  const galleryPhotos = includeCover ? files.length - 1 : files.length;
  
  console.log(`\n🔄 Processing and optimizing ${photosToProcess} photos...\n`);

  // Step 10: Process cover photo if needed
  if (includeCover && coverIndex >= 0) {
    const coverFile = files[coverIndex];
    const coverOutput = path.join(outputDir, 'cover.jpg');
    console.log('📌 Cover photo:');
    await optimizeImage(coverFile, coverOutput, true, forceOrientation);
    console.log('');
  }

  // Step 11: Process gallery photos with chosen starting number
  console.log('📷 Gallery photos:');
  let photoNumber = startNumber;
  
  for (let i = 0; i < files.length; i++) {
    if (includeCover && i === coverIndex) continue; // Skip cover photo
    
    const file = files[i];
    const outputPath = path.join(outputDir, `photo-${photoNumber}.jpg`);
    await optimizeImage(file, outputPath, false, forceOrientation);
    photoNumber++;
  }

  const finalPhotoNumber = photoNumber - 1;
  
  console.log(`\n✅ Success! ${photosToProcess} photos organized and optimized.`);
  console.log(`📁 Location: /public/images/${phase}/`);
  console.log(`🔢 Gallery photos: photo-${startNumber}.jpg through photo-${finalPhotoNumber}.jpg`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Check the photos in /public/images/${phase}/`);
  console.log(`   2. Update content/${phase}/phase.md with a description`);
  console.log(`   3. Run this script again to add more photos (start at ${finalPhotoNumber + 1})`);
  console.log(`   4. When all phases are done, run: npm run dev`);
  
  rl.close();
}

main().catch(error => {
  console.error('Error:', error);
  rl.close();
  process.exit(1);
});
