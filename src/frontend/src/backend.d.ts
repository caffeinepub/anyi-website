import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface HeroContent {
    title: string;
    ctaText: string;
    subtitle: string;
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
export interface UserProfile {
    name: string;
}
export interface ContactInfo {
    email: string;
    address: string;
    phone: string;
}
export interface backendInterface {
    addService(service: ServiceContent): Promise<void>;
    addTestimonial(testimonial: TestimonialContent): Promise<void>;
    getAboutContent(): Promise<AboutContent>;
    getAllServices(): Promise<Array<ServiceContent>>;
    getAllTestimonials(): Promise<Array<TestimonialContent>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getContactInfo(): Promise<ContactInfo>;
    getHeroContent(): Promise<HeroContent>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    removeService(serviceId: string): Promise<void>;
    removeTestimonial(testimonialId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchServices(keyword: string): Promise<Array<ServiceContent>>;
    updateAboutContent(newAbout: AboutContent): Promise<void>;
    updateContactInfo(newContact: ContactInfo): Promise<void>;
    updateHeroContent(newHero: HeroContent): Promise<void>;
    updateService(serviceId: string, updatedService: ServiceContent): Promise<void>;
    updateTestimonial(testimonialId: string, updatedTestimonial: TestimonialContent): Promise<void>;
}
