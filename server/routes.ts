import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import path from "path";
import fs from "fs";
import multer from "multer";
import { processVideo, getVideoDuration } from "./videoProcessor";
import { insertVideoSchema } from "@shared/schema";

// Set up multer for file uploads
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = file.fieldname === 'videoFile' 
      ? './uploads/videos' 
      : './uploads/thumbnails';
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: videoStorage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'videoFile') {
      // Accept video files only
      if (file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new Error('Only video files are allowed'));
      }
    } else if (file.fieldname === 'thumbnailFile') {
      // Accept image files only
