import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Principal "mo:core/Principal";



actor {

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
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

  // Persistent Storage
  var heroContent : HeroContent = {
    title = "Process Automation For Every Business Need";
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
    address = "C-32, First & Second Floor, Ram Nagar, Kaushambi, Ghaziabad, Uttar Pradesh 201010";
    email = "ys@anyi.co.in";
    phone = "098106 57082";
  };

  // Queries (public access)
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

  public query func searchServices(keyword : Text) : async [ServiceContent] {
    servicesStore.values().toArray().filter(
      func(service) {
        service.title.contains(#text keyword) or service.description.contains(#text keyword);
      }
    );
  };

  // Admin updates
  public shared func updateHeroContent(newHero : HeroContent) : async () {
    heroContent := newHero;
  };

  public shared func updateAboutContent(newAbout : AboutContent) : async () {
    aboutContent := newAbout;
  };

  public shared func addService(service : ServiceContent) : async () {
    if (servicesStore.containsKey(service.id)) { Runtime.trap("Service already exists") };
    servicesStore.add(service.id, service);
  };

  public shared func updateService(serviceId : Text, updatedService : ServiceContent) : async () {
    ignore getService(serviceId);
    servicesStore.add(serviceId, { updatedService with id = serviceId });
  };

  public shared func removeService(serviceId : Text) : async () {
    ignore getService(serviceId);
    servicesStore.remove(serviceId);
  };

  public shared func addTestimonial(testimonial : TestimonialContent) : async () {
    if (testimonialsStore.containsKey(testimonial.id)) { Runtime.trap("Testimonial already exists") };
    testimonialsStore.add(testimonial.id, testimonial);
  };

  public shared func updateTestimonial(testimonialId : Text, updatedTestimonial : TestimonialContent) : async () {
    ignore getTestimonial(testimonialId);
    testimonialsStore.add(testimonialId, { updatedTestimonial with id = testimonialId });
  };

  public shared func removeTestimonial(testimonialId : Text) : async () {
    ignore getTestimonial(testimonialId);
    testimonialsStore.remove(testimonialId);
  };

  public shared func updateContactInfo(newContact : ContactInfo) : async () {
    contactInfo := newContact;
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
};
