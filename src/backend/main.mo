import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Content Types
  type HeroContent = {
    title : Text;
    subtitle : Text;
    ctaText : Text;
  };

  type AboutContent = {
    title : Text;
    body : Text;
  };

  type ServiceContent = {
    id : Text;
    title : Text;
    description : Text;
  };

  type TestimonialContent = {
    id : Text;
    quote : Text;
    author : Text;
    role : Text;
  };

  type ContactInfo = {
    address : Text;
    email : Text;
    phone : Text;
  };

  type GalleryItem = {
    id : Text;
    blob : Storage.ExternalBlob;
    title : Text;
    category : Text;
  };

  // Persistent Storage
  var heroContent : HeroContent = {
    title = "Welcome to Our Site";
    subtitle = "Best services in town.";
    ctaText = "Get Started";
  };

  var aboutContent : AboutContent = {
    title = "About Us";
    body = "We are a leading provider of services...";
  };

  let servicesStore = Map.empty<Text, ServiceContent>();
  let testimonialsStore = Map.empty<Text, TestimonialContent>();
  var contactInfo : ContactInfo = {
    address = "123 Main St";
    email = "contact@ourcompany.com";
    phone = "+1234567890";
  };

  var galleryStore : Map.Map<Text, GalleryItem> = Map.empty<Text, GalleryItem>();

  // Authorization Helper
  func onlyAdmin(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  // Queries (public access - no authorization needed)
  public query func getHeroContent() : async HeroContent {
    heroContent;
  };

  public query func getAboutContent() : async AboutContent {
    aboutContent;
  };

  public query func getAllServices() : async [ServiceContent] {
    servicesStore.values().toArray();
  };

  public query func getAllTestimonials() : async [TestimonialContent] {
    testimonialsStore.values().toArray();
  };

  public query func getContactInfo() : async ContactInfo {
    contactInfo;
  };

  public query func getAllGalleryItems() : async [GalleryItem] {
    galleryStore.values().toArray();
  };

  public query func getGalleryItemsByCategory(category : Text) : async [GalleryItem] {
    galleryStore.values().toArray().filter(
      func(item) { item.category == category }
    );
  };

  public query func searchServices(keyword : Text) : async [ServiceContent] {
    servicesStore.values().toArray().filter(
      func(service) {
        service.title.contains(#text keyword) or service.description.contains(#text keyword);
      }
    );
  };

  // Admin-only updates
  public shared ({ caller }) func updateHeroContent(newHero : HeroContent) : async () {
    onlyAdmin(caller);
    heroContent := newHero;
  };

  public shared ({ caller }) func updateAboutContent(newAbout : AboutContent) : async () {
    onlyAdmin(caller);
    aboutContent := newAbout;
  };

  public shared ({ caller }) func addService(service : ServiceContent) : async () {
    onlyAdmin(caller);
    if (servicesStore.containsKey(service.id)) { Runtime.trap("Service already exists") };
    servicesStore.add(service.id, service);
  };

  public shared ({ caller }) func updateService(serviceId : Text, updatedService : ServiceContent) : async () {
    onlyAdmin(caller);
    ignore getService(serviceId);
    servicesStore.add(serviceId, { updatedService with id = serviceId });
  };

  public shared ({ caller }) func removeService(serviceId : Text) : async () {
    onlyAdmin(caller);
    ignore getService(serviceId);
    servicesStore.remove(serviceId);
  };

  public shared ({ caller }) func addTestimonial(testimonial : TestimonialContent) : async () {
    onlyAdmin(caller);
    if (testimonialsStore.containsKey(testimonial.id)) { Runtime.trap("Testimonial already exists") };
    testimonialsStore.add(testimonial.id, testimonial);
  };

  public shared ({ caller }) func updateTestimonial(testimonialId : Text, updatedTestimonial : TestimonialContent) : async () {
    onlyAdmin(caller);
    ignore getTestimonial(testimonialId);
    testimonialsStore.add(testimonialId, { updatedTestimonial with id = testimonialId });
  };

  public shared ({ caller }) func removeTestimonial(testimonialId : Text) : async () {
    onlyAdmin(caller);
    ignore getTestimonial(testimonialId);
    testimonialsStore.remove(testimonialId);
  };

  public shared ({ caller }) func updateContactInfo(newContact : ContactInfo) : async () {
    onlyAdmin(caller);
    contactInfo := newContact;
  };

  public shared ({ caller }) func addGalleryItem(item : GalleryItem) : async () {
    onlyAdmin(caller);
    if (galleryStore.containsKey(item.id)) {
      Runtime.trap("Gallery item already exists");
    };
    galleryStore.add(item.id, item);
  };

  public shared ({ caller }) func updateGalleryItem(itemId : Text, updatedItem : GalleryItem) : async () {
    onlyAdmin(caller);
    ignore getGalleryItem(itemId);
    galleryStore.add(itemId, { updatedItem with id = itemId });
  };

  public shared ({ caller }) func removeGalleryItem(itemId : Text) : async () {
    onlyAdmin(caller);
    ignore getGalleryItem(itemId);
    galleryStore.remove(itemId);
  };

  // Private helpers
  func getService(serviceId : Text) : ServiceContent {
    switch (servicesStore.get(serviceId)) {
      case (?service) { service };
      case (null) { Runtime.trap("Service not found") };
    };
  };

  func getTestimonial(testimonialId : Text) : TestimonialContent {
    switch (testimonialsStore.get(testimonialId)) {
      case (?testimonial) { testimonial };
      case (null) { Runtime.trap("Testimonial not found") };
    };
  };

  func getGalleryItem(itemId : Text) : GalleryItem {
    switch (galleryStore.get(itemId)) {
      case (?item) { item };
      case (null) { Runtime.trap("Gallery item not found") };
    };
  };
};
