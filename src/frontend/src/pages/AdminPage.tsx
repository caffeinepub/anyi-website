import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Image,
  Loader2,
  LogOut,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAboutContent,
  useAddGalleryItem,
  useAddService,
  useAddTestimonial,
  useContactInfo,
  useDeleteGalleryItem,
  useDeleteService,
  useDeleteTestimonial,
  useGalleryItems,
  useHeroContent,
  useIsAdmin,
  useServices,
  useTestimonials,
  useUpdateAbout,
  useUpdateContactInfo,
  useUpdateHero,
  useUpdateService,
  useUpdateTestimonial,
} from "../hooks/useQueries";
import type { ServiceContent, TestimonialContent } from "../hooks/useQueries";

function LoginScreen({
  onLogin,
  isLoggingIn,
}: { onLogin: () => void; isLoggingIn: boolean }) {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-card p-10 max-w-md w-full text-center"
      >
        <div className="flex items-center justify-center gap-1 font-bold text-2xl mb-2">
          <span className="text-navy">ANYI</span>
          <span className="w-2.5 h-2.5 rounded-full bg-teal mt-0.5" />
        </div>
        <p className="text-sm text-body-gray mb-8">Admin Content Management</p>
        <h1 className="text-2xl font-bold text-navy mb-2">Sign In</h1>
        <p className="text-sm text-body-gray mb-8">
          Login with your Internet Identity to access the CMS panel.
        </p>
        <Button
          data-ocid="admin.primary_button"
          onClick={onLogin}
          disabled={isLoggingIn}
          className="w-full bg-navy text-white hover:bg-navy/90 rounded-full py-6 font-semibold"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Signing In...
            </>
          ) : (
            "Sign In with Internet Identity"
          )}
        </Button>
      </motion.div>
    </div>
  );
}

function HeroEditor() {
  const { data: hero } = useHeroContent();
  const update = useUpdateHero();
  const [form, setForm] = useState({
    title: hero?.title ?? "",
    subtitle: hero?.subtitle ?? "",
    ctaText: hero?.ctaText ?? "",
  });

  const handleSave = async () => {
    try {
      await update.mutateAsync(form);
      toast.success("Hero content updated!");
    } catch {
      toast.error("Failed to update hero content");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
            Headline
          </p>
          <Input
            data-ocid="admin.input"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder={hero?.title}
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
            Subtitle
          </p>
          <Textarea
            data-ocid="admin.textarea"
            value={form.subtitle}
            onChange={(e) =>
              setForm((p) => ({ ...p, subtitle: e.target.value }))
            }
            placeholder={hero?.subtitle}
            rows={3}
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
            CTA Button Text
          </p>
          <Input
            data-ocid="admin.input"
            value={form.ctaText}
            onChange={(e) =>
              setForm((p) => ({ ...p, ctaText: e.target.value }))
            }
            placeholder={hero?.ctaText}
          />
        </div>
        <Button
          data-ocid="admin.save_button"
          onClick={handleSave}
          disabled={update.isPending}
          className="bg-navy text-white hover:bg-navy/90 rounded-full"
        >
          {update.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function AboutEditor() {
  const { data: about } = useAboutContent();
  const update = useUpdateAbout();
  const [form, setForm] = useState({
    title: about?.title ?? "",
    body: about?.body ?? "",
  });

  const handleSave = async () => {
    try {
      await update.mutateAsync(form);
      toast.success("About content updated!");
    } catch {
      toast.error("Failed to update about content");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
            Title
          </p>
          <Input
            data-ocid="admin.input"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder={about?.title}
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
            Body Text
          </p>
          <Textarea
            data-ocid="admin.textarea"
            value={form.body}
            onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
            placeholder={about?.body}
            rows={6}
          />
        </div>
        <Button
          data-ocid="admin.save_button"
          onClick={handleSave}
          disabled={update.isPending}
          className="bg-navy text-white hover:bg-navy/90 rounded-full"
        >
          {update.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

const DEFAULT_SERVICE: ServiceContent = { id: "", title: "", description: "" };

function ServicesEditor() {
  const { data: services } = useServices();
  const addService = useAddService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  const [newService, setNewService] = useState<ServiceContent>({
    ...DEFAULT_SERVICE,
    id: Date.now().toString(),
  });

  const handleAdd = async () => {
    if (!newService.title) return toast.error("Title is required");
    try {
      await addService.mutateAsync(newService);
      setNewService({ ...DEFAULT_SERVICE, id: Date.now().toString() });
      toast.success("Service added!");
    } catch {
      toast.error("Failed to add service");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
              Title
            </p>
            <Input
              data-ocid="admin.input"
              value={newService.title}
              onChange={(e) =>
                setNewService((p) => ({ ...p, title: e.target.value }))
              }
              placeholder="Service name"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
              Description
            </p>
            <Textarea
              data-ocid="admin.textarea"
              value={newService.description}
              onChange={(e) =>
                setNewService((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Service description"
              rows={3}
            />
          </div>
          <Button
            data-ocid="admin.primary_button"
            onClick={handleAdd}
            disabled={addService.isPending}
            className="bg-teal text-white hover:bg-teal/90 rounded-full"
          >
            {addService.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Add Service
          </Button>
        </CardContent>
      </Card>

      {services && services.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-navy">Existing Services</h3>
          {services.map((service, i) => (
            <ServiceItem
              key={service.id}
              service={service}
              index={i + 1}
              onUpdate={updateService.mutateAsync}
              onDelete={deleteService.mutateAsync}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceItem({
  service,
  index,
  onUpdate,
  onDelete,
}: {
  service: ServiceContent;
  index: number;
  onUpdate: (args: { id: string; data: ServiceContent }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(service);

  const handleSave = async () => {
    try {
      await onUpdate({ id: service.id, data: form });
      setEditing(false);
      toast.success("Service updated!");
    } catch {
      toast.error("Failed to update service");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this service?")) return;
    try {
      await onDelete(service.id);
      toast.success("Service deleted");
    } catch {
      toast.error("Failed to delete service");
    }
  };

  return (
    <Card data-ocid={`admin.item.${index}`}>
      <CardContent className="pt-4 space-y-3">
        {editing ? (
          <>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
            />
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              rows={2}
            />
            <div className="flex gap-2">
              <Button
                data-ocid={`admin.save_button.${index}`}
                size="sm"
                onClick={handleSave}
                className="bg-navy text-white rounded-full"
              >
                Save
              </Button>
              <Button
                data-ocid={`admin.cancel_button.${index}`}
                size="sm"
                variant="outline"
                onClick={() => setEditing(false)}
                className="rounded-full"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <div className="font-semibold text-navy">{service.title}</div>
              <div className="text-sm text-body-gray mt-1">
                {service.description}
              </div>
            </div>
            <div className="flex gap-2 ml-4 flex-shrink-0">
              <Button
                data-ocid={`admin.edit_button.${index}`}
                size="sm"
                variant="outline"
                onClick={() => setEditing(true)}
                className="rounded-full"
              >
                Edit
              </Button>
              <Button
                data-ocid={`admin.delete_button.${index}`}
                size="sm"
                variant="destructive"
                onClick={handleDelete}
                className="rounded-full"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const DEFAULT_TESTIMONIAL: TestimonialContent = {
  id: "",
  quote: "",
  author: "",
  role: "",
};

function TestimonialsEditor() {
  const { data: testimonials } = useTestimonials();
  const addTestimonial = useAddTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const [newT, setNewT] = useState<TestimonialContent>({
    ...DEFAULT_TESTIMONIAL,
    id: Date.now().toString(),
  });

  const handleAdd = async () => {
    if (!newT.quote || !newT.author)
      return toast.error("Quote and author are required");
    try {
      await addTestimonial.mutateAsync(newT);
      setNewT({ ...DEFAULT_TESTIMONIAL, id: Date.now().toString() });
      toast.success("Testimonial added!");
    } catch {
      toast.error("Failed to add testimonial");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Testimonial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
              Quote
            </p>
            <Textarea
              data-ocid="admin.textarea"
              value={newT.quote}
              onChange={(e) =>
                setNewT((p) => ({ ...p, quote: e.target.value }))
              }
              placeholder="Customer testimonial..."
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
                Author Name
              </p>
              <Input
                data-ocid="admin.input"
                value={newT.author}
                onChange={(e) =>
                  setNewT((p) => ({ ...p, author: e.target.value }))
                }
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
                Role / Company
              </p>
              <Input
                data-ocid="admin.input"
                value={newT.role}
                onChange={(e) =>
                  setNewT((p) => ({ ...p, role: e.target.value }))
                }
                placeholder="CEO, Acme Corp"
              />
            </div>
          </div>
          <Button
            data-ocid="admin.primary_button"
            onClick={handleAdd}
            disabled={addTestimonial.isPending}
            className="bg-teal text-white hover:bg-teal/90 rounded-full"
          >
            {addTestimonial.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Add Testimonial
          </Button>
        </CardContent>
      </Card>

      {testimonials && testimonials.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-navy">Existing Testimonials</h3>
          {testimonials.map((t, i) => (
            <TestimonialItem
              key={t.id}
              testimonial={t}
              index={i + 1}
              onUpdate={updateTestimonial.mutateAsync}
              onDelete={deleteTestimonial.mutateAsync}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TestimonialItem({
  testimonial,
  index,
  onUpdate,
  onDelete,
}: {
  testimonial: TestimonialContent;
  index: number;
  onUpdate: (args: { id: string; data: TestimonialContent }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(testimonial);

  const handleSave = async () => {
    try {
      await onUpdate({ id: testimonial.id, data: form });
      setEditing(false);
      toast.success("Testimonial updated!");
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <Card data-ocid={`admin.item.${index}`}>
      <CardContent className="pt-4 space-y-3">
        {editing ? (
          <>
            <Textarea
              value={form.quote}
              onChange={(e) =>
                setForm((p) => ({ ...p, quote: e.target.value }))
              }
              rows={2}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={form.author}
                onChange={(e) =>
                  setForm((p) => ({ ...p, author: e.target.value }))
                }
                placeholder="Author"
              />
              <Input
                value={form.role}
                onChange={(e) =>
                  setForm((p) => ({ ...p, role: e.target.value }))
                }
                placeholder="Role"
              />
            </div>
            <div className="flex gap-2">
              <Button
                data-ocid={`admin.save_button.${index}`}
                size="sm"
                onClick={handleSave}
                className="bg-navy text-white rounded-full"
              >
                Save
              </Button>
              <Button
                data-ocid={`admin.cancel_button.${index}`}
                size="sm"
                variant="outline"
                onClick={() => setEditing(false)}
                className="rounded-full"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-body-gray italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="font-semibold text-navy text-sm mt-2">
                {testimonial.author}
              </div>
              <div className="text-xs text-body-gray">{testimonial.role}</div>
            </div>
            <div className="flex gap-2 ml-4 flex-shrink-0">
              <Button
                data-ocid={`admin.edit_button.${index}`}
                size="sm"
                variant="outline"
                onClick={() => setEditing(true)}
                className="rounded-full"
              >
                Edit
              </Button>
              <Button
                data-ocid={`admin.delete_button.${index}`}
                size="sm"
                variant="destructive"
                onClick={async () => {
                  if (confirm("Delete?")) {
                    await onDelete(testimonial.id);
                    toast.success("Deleted");
                  }
                }}
                className="rounded-full"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function GalleryEditor() {
  const { data: galleryItems } = useGalleryItems();
  const addItem = useAddGalleryItem();
  const deleteItem = useDeleteGalleryItem();
  const [uploading, setUploading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !newTitle) return toast.error("Please enter a title first");
    setUploading(true);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setUploadProgress(pct),
      );
      await addItem.mutateAsync({
        id: Date.now().toString(),
        title: newTitle,
        category: newCategory || "Uncategorized",
        blob,
      });
      setNewTitle("");
      setNewCategory("");
      setUploadProgress(0);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Gallery Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
                Title
              </p>
              <Input
                data-ocid="admin.input"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Project title"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
                Category
              </p>
              <Input
                data-ocid="admin.input"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g. Branding"
              />
            </div>
          </div>
          <div
            data-ocid="admin.upload_button"
            className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-subtle rounded-xl cursor-pointer hover:border-teal hover:bg-teal/5 transition-all ${
              uploading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {uploading ? (
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-teal mx-auto mb-2" />
                <span className="text-sm text-body-gray">
                  Uploading... {uploadProgress}%
                </span>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 text-muted-gray mx-auto mb-2" />
                <span className="text-sm text-body-gray">
                  Click to upload image
                </span>
                <span className="text-xs text-muted-gray block mt-1">
                  PNG, JPG, GIF up to 10MB
                </span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </div>
        </CardContent>
      </Card>

      {galleryItems && galleryItems.length > 0 && (
        <div>
          <h3 className="font-semibold text-navy mb-4">
            Gallery Images ({galleryItems.length})
          </h3>
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            data-ocid="admin.list"
          >
            {galleryItems.map((item, i) => (
              <div
                key={item.id}
                className="relative group rounded-xl overflow-hidden bg-muted aspect-video"
                data-ocid={`admin.item.${i + 1}`}
              >
                <Image className="w-8 h-8 text-muted-gray absolute inset-0 m-auto" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    data-ocid={`admin.delete_button.${i + 1}`}
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      if (!confirm("Delete this image?")) return;
                      await deleteItem.mutateAsync(item.id);
                      toast.success("Deleted");
                    }}
                    className="rounded-full"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
                  <div className="text-white text-xs font-semibold truncate">
                    {item.title}
                  </div>
                  <div className="text-white/70 text-xs">{item.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!galleryItems || galleryItems.length === 0) && (
        <div
          className="text-center py-12 text-body-gray"
          data-ocid="admin.empty_state"
        >
          <Image className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No gallery images yet. Upload your first image above.</p>
        </div>
      )}
    </div>
  );
}

function ContactEditor() {
  const { data: contactInfo } = useContactInfo();
  const update = useUpdateContactInfo();
  const [form, setForm] = useState({
    email: contactInfo?.email ?? "",
    phone: contactInfo?.phone ?? "",
    address: contactInfo?.address ?? "",
  });

  const handleSave = async () => {
    try {
      await update.mutateAsync(form);
      toast.success("Contact info updated!");
    } catch {
      toast.error("Failed to update contact info");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
            Email
          </p>
          <Input
            data-ocid="admin.input"
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder={contactInfo?.email}
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
            Phone
          </p>
          <Input
            data-ocid="admin.input"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            placeholder={contactInfo?.phone}
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-body-gray block mb-2">
            Address
          </p>
          <Textarea
            data-ocid="admin.textarea"
            value={form.address}
            onChange={(e) =>
              setForm((p) => ({ ...p, address: e.target.value }))
            }
            placeholder={contactInfo?.address}
            rows={3}
          />
        </div>
        <Button
          data-ocid="admin.save_button"
          onClick={handleSave}
          disabled={update.isPending}
          className="bg-navy text-white hover:bg-navy/90 rounded-full"
        >
          {update.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

export default function AdminPage({
  navigate,
}: { navigate: (to: string) => void }) {
  const { login, clear, isLoggingIn, isLoginSuccess, identity } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();

  const isAuthenticated = isLoginSuccess && !!identity;

  if (!isAuthenticated) {
    return <LoginScreen onLogin={login} isLoggingIn={isLoggingIn} />;
  }

  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-card p-10 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-navy mb-4">Access Denied</h2>
          <p className="text-sm text-body-gray mb-6">
            You don't have admin access to this panel.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              data-ocid="admin.secondary_button"
              variant="outline"
              onClick={() => navigate("/")}
              className="rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Site
            </Button>
            <Button
              data-ocid="admin.secondary_button"
              variant="outline"
              onClick={clear}
              className="rounded-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      {/* Admin Header */}
      <header className="bg-navy text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-bold text-lg">
            <span>ANYI</span>
            <span className="w-2 h-2 rounded-full bg-teal" />
          </div>
          <span className="text-white/40 text-sm">Admin CMS</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            data-ocid="admin.link"
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full text-xs"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Site
          </Button>
          <Button
            data-ocid="admin.secondary_button"
            variant="ghost"
            size="sm"
            onClick={clear}
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full text-xs"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-navy">Content Management</h1>
          <p className="text-sm text-body-gray mt-1">
            Update your website content without any coding.
          </p>
        </div>

        <Tabs defaultValue="hero" data-ocid="admin.tab">
          <TabsList className="mb-8 flex flex-wrap gap-1 h-auto bg-white shadow-card rounded-xl p-1.5">
            {[
              "hero",
              "about",
              "services",
              "gallery",
              "testimonials",
              "contact",
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                data-ocid="admin.tab"
                className="capitalize rounded-lg data-[state=active]:bg-navy data-[state=active]:text-white"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="hero">
            <HeroEditor />
          </TabsContent>
          <TabsContent value="about">
            <AboutEditor />
          </TabsContent>
          <TabsContent value="services">
            <ServicesEditor />
          </TabsContent>
          <TabsContent value="gallery">
            <GalleryEditor />
          </TabsContent>
          <TabsContent value="testimonials">
            <TestimonialsEditor />
          </TabsContent>
          <TabsContent value="contact">
            <ContactEditor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
