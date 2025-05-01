import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const execPromise = promisify(exec);

export interface ProcessedVideo {
  hdPath: string; // High quality (4K or original resolution)
  sdPath: string; // Standard quality (HD 1080p)
  lowPath: string; // Low quality (SD 480p)
  hdSize: string;
  sdSize: string;
  lowSize: string;
}

/**
 * Process video file to create multiple quality versions
 * @param inputPath Full path to the original video file
 * @returns Object with paths to different quality versions
 */
export async function processVideo(inputPath: string): Promise<ProcessedVideo> {
  try {
    const filename = path.basename(inputPath, path.extname(inputPath));
    const dirPath = path.dirname(inputPath);
    
    // Set output paths
    const hdOutputPath = path.join(dirPath, `${filename}_4k${path.extname(inputPath)}`);
    const sdOutputPath = path.join(dirPath, `${filename}_hd${path.extname(inputPath)}`);
    const lowOutputPath = path.join(dirPath, `${filename}_sd${path.extname(inputPath)}`);
    
    // Create a copy for HD (this would normally be converting to 4K if needed)
    await fs.promises.copyFile(inputPath, hdOutputPath);
    
    // Convert to 1080p for standard quality
    await execPromise(`ffmpeg -i ${inputPath} -vf scale=1920:1080 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k ${sdOutputPath}`);
