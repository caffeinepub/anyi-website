import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
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
  useUpdateGalleryItem,
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
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-10 max-w-md w-full text-center"
      >
        <div className="flex items-center justify-center gap-1 font-bold text-2xl mb-2">
          <span className="text-gradient font-bold">ANYI</span>
          <span className="w-2.5 h-2.5 rounded-full bg-primary mt-0.5" />
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Admin Content Management
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Sign In</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Login with your Internet Identity to access the CMS panel.
        </p>
        <Button
          data-ocid="admin.primary_button"
          onClick={onLogin}
          disabled={isLoggingIn}
          className="w-full btn-gradient text-white hover:opacity-90 rounded-full py-6 font-semibold"
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
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
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
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
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
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
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
          className="btn-gradient text-white hover:opacity-90 rounded-full"
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

  // Parse existing JSON body or fall back to plain text
  let parsedBody = { body: "", mission: "", vision: "", tagline: "" };
  try {
    parsedBody = JSON.parse(about?.body ?? "");
  } catch {
    parsedBody.body = about?.body ?? "";
  }

  const [title, setTitle] = useState(about?.title ?? "");
  const [bodyText, setBodyText] = useState(parsedBody.body);
  const [tagline, setTagline] = useState(parsedBody.tagline);
  const [mission, setMission] = useState(parsedBody.mission);
  const [vision, setVision] = useState(parsedBody.vision);

  const handleSave = async () => {
    try {
      const serialized = JSON.stringify({
        body: bodyText,
        mission,
        vision,
        tagline,
      });
      await update.mutateAsync({ title, body: serialized });
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
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Title
          </p>
          <Input
            data-ocid="admin.input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="About Us"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Tagline
          </p>
          <Input
            data-ocid="admin.input"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Innovative. Strategic. Results-Driven."
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Body Text
          </p>
          <Textarea
            data-ocid="admin.textarea"
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            placeholder="Describe your agency..."
            rows={5}
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Mission
          </p>
          <Textarea
            data-ocid="admin.textarea"
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            placeholder="To empower brands with creative strategies..."
            rows={3}
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Vision
          </p>
          <Textarea
            data-ocid="admin.textarea"
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            placeholder="To be the most trusted creative partner..."
            rows={3}
          />
        </div>
        <Button
          data-ocid="admin.save_button"
          onClick={handleSave}
          disabled={update.isPending}
          className="btn-gradient text-white hover:opacity-90 rounded-full"
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
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
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
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
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
            className="bg-primary text-white hover:bg-primary/90 rounded-full"
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
          <h3 className="font-semibold text-foreground">Existing Services</h3>
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
                className="btn-gradient text-white rounded-full"
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
              <div className="font-semibold text-foreground">
                {service.title}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
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
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
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
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
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
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
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
            className="bg-primary text-white hover:bg-primary/90 rounded-full"
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
          <h3 className="font-semibold text-foreground">
            Existing Testimonials
          </h3>
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
                className="btn-gradient text-white rounded-full"
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
              <p className="text-sm text-muted-foreground italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="font-semibold text-foreground text-sm mt-2">
                {testimonial.author}
              </div>
              <div className="text-xs text-muted-foreground">
                {testimonial.role}
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
  const updateItem = useUpdateGalleryItem();
  const [uploading, setUploading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const uniqueCategories = galleryItems
    ? Array.from(new Set(galleryItems.map((i) => i.category)))
    : [];

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
      setNewDescription("");
      setUploadProgress(0);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (item: { id: string; title: string; category: string }) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditDescription("");
  };

  const handleEditSave = async (item: {
    id: string;
    blob: ReturnType<typeof ExternalBlob.fromBytes>;
  }) => {
    try {
      await updateItem.mutateAsync({
        id: item.id,
        item: {
          id: item.id,
          title: editTitle,
          category: editCategory,
          blob: item.blob,
        },
      });
      setEditingId(null);
      toast.success("Updated!");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem.mutateAsync(id);
      setConfirmDeleteId(null);
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Item */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Gallery Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                Title *
              </p>
              <Input
                data-ocid="admin.input"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Project title"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                Category
              </p>
              <Input
                data-ocid="admin.input"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g. Branding"
                list="category-suggestions"
              />
              <datalist id="category-suggestions">
                {uniqueCategories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
              Description (optional)
            </p>
            <Textarea
              data-ocid="admin.textarea"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Short description of this project..."
              rows={2}
            />
          </div>
          <label
            data-ocid="admin.upload_button"
            className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-teal hover:bg-primary/5 transition-all ${
              uploading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {uploading ? (
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                <span className="text-sm text-muted-foreground">
                  Uploading... {uploadProgress}%
                </span>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 text-muted-foreground/70 mx-auto mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload image
                </span>
                <span className="text-xs text-muted-foreground/70 block mt-1">
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
          </label>
        </CardContent>
      </Card>

      {/* Categories summary */}
      {uniqueCategories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Categories ({uniqueCategories.length})</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {uniqueCategories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-medium"
              >
                {cat} (
                {galleryItems?.filter((i) => i.category === cat).length ?? 0})
              </span>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Gallery items list */}
      {galleryItems && galleryItems.length > 0 && (
        <div>
          <h3 className="font-semibold text-foreground mb-4">
            Gallery Images ({galleryItems.length})
          </h3>
          <div className="space-y-3" data-ocid="admin.list">
            {galleryItems.map((item, i) => (
              <div
                key={item.id}
                className="bg-white border border-border rounded-xl p-4 flex gap-4 items-start"
                data-ocid={`admin.item.${i + 1}`}
              >
                <div className="w-20 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center">
                  <Image className="w-6 h-6 text-muted-foreground/70" />
                </div>

                <div className="flex-1 min-w-0">
                  {editingId === item.id ? (
                    <div className="space-y-2">
                      <Input
                        data-ocid="admin.input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Title"
                        className="text-sm"
                      />
                      <Input
                        data-ocid="admin.input"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        placeholder="Category"
                        className="text-sm"
                        list="category-suggestions"
                      />
                      <Textarea
                        data-ocid="admin.textarea"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Description (optional)"
                        rows={2}
                        className="text-sm"
                      />
                      <div className="flex gap-2">
                        <Button
                          data-ocid={`admin.save_button.${i + 1}`}
                          size="sm"
                          onClick={() => handleEditSave(item as any)}
                          disabled={updateItem.isPending}
                          className="bg-primary text-white hover:bg-primary/90"
                        >
                          {updateItem.isPending ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            "Save"
                          )}
                        </Button>
                        <Button
                          data-ocid={`admin.cancel_button.${i + 1}`}
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="font-semibold text-foreground text-sm">
                        {item.title}
                      </div>
                      <div className="text-xs text-primary mt-0.5">
                        {item.category}
                      </div>
                    </>
                  )}
                </div>

                {editingId !== item.id && (
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      data-ocid={`admin.edit_button.${i + 1}`}
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(item)}
                      className="rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5 rotate-45" />
                    </Button>
                    {confirmDeleteId === item.id ? (
                      <div className="flex gap-1">
                        <Button
                          data-ocid={`admin.confirm_button.${i + 1}`}
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                          disabled={deleteItem.isPending}
                          className="rounded-lg text-xs"
                        >
                          Confirm
                        </Button>
                        <Button
                          data-ocid={`admin.cancel_button.${i + 1}`}
                          size="sm"
                          variant="outline"
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-lg text-xs"
                        >
                          No
                        </Button>
                      </div>
                    ) : (
                      <Button
                        data-ocid={`admin.delete_button.${i + 1}`}
                        size="sm"
                        variant="destructive"
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {(!galleryItems || galleryItems.length === 0) && (
        <div
          className="text-center py-12 text-muted-foreground"
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
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
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
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
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
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
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
          className="btn-gradient text-white hover:opacity-90 rounded-full"
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl p-10 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Access Denied
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
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
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="btn-gradient text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-bold text-lg">
            <span>ANYI</span>
            <span className="w-2 h-2 rounded-full bg-primary" />
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
          <h1 className="text-2xl font-bold text-foreground">
            Content Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
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
                className="capitalize rounded-lg data-[state=active]:btn-gradient data-[state=active]:text-white"
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
