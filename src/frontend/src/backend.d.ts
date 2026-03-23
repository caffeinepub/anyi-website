import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface TestimonialContent {
    id: string;
    role: string;
    quote: string;
    author: string;
}
export interface AboutContent {
    title: string;
    body: string;
}
export interface ServiceContent {
    id: string;
    title: string;
    description: string;
}
export interface HeroContent {
    title: string;
    ctaText: string;
    subtitle: string;
}
export interface GalleryItem {
    id: string;
    title: string;
    blob: ExternalBlob;
    category: string;
}
export interface ContactInfo {
    email: string;
    address: string;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryItem(item: GalleryItem): Promise<void>;
    addService(service: ServiceContent): Promise<void>;
    addTestimonial(testimonial: TestimonialContent): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAboutContent(): Promise<AboutContent>;
    getAllGalleryItems(): Promise<Array<GalleryItem>>;
    getAllServices(): Promise<Array<ServiceContent>>;
    getAllTestimonials(): Promise<Array<TestimonialContent>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInfo(): Promise<ContactInfo>;
    getGalleryItemsByCategory(category: string): Promise<Array<GalleryItem>>;
    getHeroContent(): Promise<HeroContent>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeGalleryItem(itemId: string): Promise<void>;
    removeService(serviceId: string): Promise<void>;
    removeTestimonial(testimonialId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchServices(keyword: string): Promise<Array<ServiceContent>>;
    updateAboutContent(newAbout: AboutContent): Promise<void>;
    updateContactInfo(newContact: ContactInfo): Promise<void>;
    updateGalleryItem(itemId: string, updatedItem: GalleryItem): Promise<void>;
    updateHeroContent(newHero: HeroContent): Promise<void>;
    updateService(serviceId: string, updatedService: ServiceContent): Promise<void>;
    updateTestimonial(testimonialId: string, updatedTestimonial: TestimonialContent): Promise<void>;
}
