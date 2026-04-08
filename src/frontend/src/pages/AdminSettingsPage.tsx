import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTACT } from "@/config/contact";
import {
  ArrowLeft,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ThemeToggle } from "../components/ThemeToggle";
import { useActor } from "../hooks/useActor";
interface AdminSettingsPageProps {
  navigate: (to: string) => void;
}

export default function AdminSettingsPage({
  navigate,
}: AdminSettingsPageProps) {
  const { actor, isFetching } = useActor();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState(CONTACT.email);
  const [phone, setPhone] = useState(CONTACT.phone);
  const [address, setAddress] = useState(CONTACT.address);

  useEffect(() => {
    if (!actor || isFetching) return;
    let cancelled = false;
    async function init() {
      try {
        const [adminStatus, contactInfo] = await Promise.all([
          actor!.isCallerAdmin(),
          actor!.getContactInfo(),
        ]);
        if (cancelled) return;
        setIsAdmin(adminStatus);
        if (adminStatus) {
          setEmail(contactInfo.email || CONTACT.email);
          setPhone(contactInfo.phone || CONTACT.phone);
          setAddress(contactInfo.address || CONTACT.address);
        }
      } catch {
        if (!cancelled) setIsAdmin(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    init();
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching]);

  const handleSave = async () => {
    if (!actor) return;
    setSaving(true);
    try {
      await actor.updateContactInfo({ email, phone, address });
      toast.success("Contact settings saved successfully!");
    } catch {
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            data-ocid="admin_settings.link"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/logo-019d2435-a026-72b8-ba6b-b9bde75c6d82-1.png"
              alt="ANYI Logo"
              className="h-8 w-auto"
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Loading */}
        {(loading || isFetching) && (
          <div
            data-ocid="admin_settings.loading_state"
            className="flex flex-col items-center justify-center py-32 gap-4"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">
              Checking admin access…
            </p>
          </div>
        )}

        {/* Unauthorized */}
        {!loading && !isFetching && isAdmin === false && (
          <div
            data-ocid="admin_settings.error_state"
            className="flex flex-col items-center justify-center py-32 text-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <Settings className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Unauthorized
              </h2>
              <p className="text-muted-foreground max-w-md">
                Admin login is required to access this page. Please contact the
                site owner for access.
              </p>
            </div>
            <Button
              data-ocid="admin_settings.link"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Return to Home
            </Button>
          </div>
        )}

        {/* Admin Form */}
        {!loading && !isFetching && isAdmin === true && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-3">
                <Settings className="w-7 h-7 text-primary" />
                Contact Settings
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Update the contact information displayed on your website.
                Changes take effect immediately.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
                Contact Details
              </h2>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="admin-email"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address
                </Label>
                <Input
                  id="admin-email"
                  data-ocid="admin_settings.input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@example.com"
                  className="bg-background border-border"
                />
                <p className="text-xs text-muted-foreground">
                  This email will appear in the Contact section and be used for
                  the mailto link.
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label
                  htmlFor="admin-phone"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number
                </Label>
                <Input
                  id="admin-phone"
                  data-ocid="admin_settings.input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 00000 00000"
                  className="bg-background border-border"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label
                  htmlFor="admin-address"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  Address
                </Label>
                <Input
                  id="admin-address"
                  data-ocid="admin_settings.input"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Full address"
                  className="bg-background border-border"
                />
              </div>

              <div className="pt-2">
                <Button
                  data-ocid="admin_settings.submit_button"
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {saving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {saving ? "Saving…" : "Save Changes"}
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                How to configure the email ID in code
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                The default fallback email is set in{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                  src/frontend/src/config/contact.ts
                </code>
                . To change the permanent default, update the{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                  email
                </code>{" "}
                field in that file:
              </p>
              <pre className="bg-muted rounded-lg p-4 text-xs font-mono text-foreground overflow-x-auto">{`export const CONTACT = {
  email: "ys@anyi.co.in",  // ← change this
  phone: "098106 57082",
  address: "C-32, First & Second Floor...",
  // ...
};`}</pre>
              <p className="text-xs text-muted-foreground mt-3">
                Changes saved via this form are stored in the backend and
                override the default at runtime.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
