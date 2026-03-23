import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AboutContent,
  ContactInfo,
  GalleryItem,
  HeroContent,
  ServiceContent,
  TestimonialContent,
} from "../backend.d";
import { useActor } from "./useActor";

export type {
  HeroContent,
  AboutContent,
  ServiceContent,
  TestimonialContent,
  ContactInfo,
  GalleryItem,
};

export function useHeroContent() {
  const { actor, isFetching } = useActor();
  return useQuery<HeroContent>({
    queryKey: ["heroContent"],
    queryFn: async () => {
      if (!actor)
        return {
          title: "WE AMPLIFY YOUR BRAND.",
          subtitle:
            "We craft bold digital experiences that connect brands with their audience and drive meaningful results in an ever-evolving market.",
          ctaText: "EXPLORE SERVICES",
        };
      return actor.getHeroContent();
    },
    enabled: !isFetching,
  });
}

export function useAboutContent() {
  const { actor, isFetching } = useActor();
  return useQuery<AboutContent>({
    queryKey: ["aboutContent"],
    queryFn: async () => {
      if (!actor)
        return {
          title: "About Us",
          body: "We are a full-service creative agency dedicated to building brands that inspire, engage, and convert. With over a decade of experience, our team of strategists, designers, and developers work in harmony to deliver exceptional results.",
        };
      return actor.getAboutContent();
    },
    enabled: !isFetching,
  });
}

export function useServices() {
  const { actor, isFetching } = useActor();
  return useQuery<ServiceContent[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !isFetching,
  });
}

export function useTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<TestimonialContent[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !isFetching,
  });
}

export function useContactInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactInfo>({
    queryKey: ["contactInfo"],
    queryFn: async () => {
      if (!actor)
        return {
          email: "hello@anyi.co.in",
          address: "42 Creative Hub, Koramangala, Bengaluru 560034",
          phone: "+91 98765 43210",
        };
      return actor.getContactInfo();
    },
    enabled: !isFetching,
  });
}

export function useGalleryItems() {
  const { actor, isFetching } = useActor();
  return useQuery<GalleryItem[]>({
    queryKey: ["galleryItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGalleryItems();
    },
    enabled: !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !isFetching,
  });
}

// Mutations
export function useUpdateHero() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: HeroContent) => {
      if (!actor) throw new Error("Not connected");
      await actor.updateHeroContent(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["heroContent"] }),
  });
}

export function useUpdateAbout() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: AboutContent) => {
      if (!actor) throw new Error("Not connected");
      await actor.updateAboutContent(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aboutContent"] }),
  });
}

export function useAddService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: ServiceContent) => {
      if (!actor) throw new Error("Not connected");
      await actor.addService(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useUpdateService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ServiceContent }) => {
      if (!actor) throw new Error("Not connected");
      await actor.updateService(id, data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useDeleteService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.removeService(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useAddTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: TestimonialContent) => {
      if (!actor) throw new Error("Not connected");
      await actor.addTestimonial(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useUpdateTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: { id: string; data: TestimonialContent }) => {
      if (!actor) throw new Error("Not connected");
      await actor.updateTestimonial(id, data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.removeTestimonial(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useUpdateContactInfo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: ContactInfo) => {
      if (!actor) throw new Error("Not connected");
      await actor.updateContactInfo(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contactInfo"] }),
  });
}

export function useAddGalleryItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: GalleryItem) => {
      if (!actor) throw new Error("Not connected");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await actor.addGalleryItem(data as any);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["galleryItems"] }),
  });
}

export function useDeleteGalleryItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.removeGalleryItem(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["galleryItems"] }),
  });
}
