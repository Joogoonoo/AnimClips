 import{ 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  videos, type Video, type InsertVideo
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Video methods
  getVideos(): Promise<Video[]>;
  getVideosByCategory(categoryId: number): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  getFeaturedVideos(): Promise<Video[]>;
  getRecentVideos(limit?: number): Promise<Video[]>;
  getPopularVideos(): Promise<Video[]>;
  incrementViews(id: number): Promise<void>;
  searchVideos(query: string): Promise<Video[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private videos: Map<number, Video>;
  private userCurrentId: number;
  private categoryCurrentId: number;
  private videoCurrentId: number;

  constructor() {
    this.users = new Map();
