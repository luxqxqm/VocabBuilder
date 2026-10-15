"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api, getErrorMessage } from "./api";
import type {
  Answer,
  AuthUser,
  Task,
  Word,
  WordPayload,
  WordsFilters,
  WordsResponse,
} from "./types";

export type WordsKind = "own" | "all";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get<AuthUser>("/users/current");
      return data;
    },
    staleTime: Infinity,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get<string[]>("/words/categories");
      return data;
    },
    staleTime: Infinity,
  });
}

export function useWords(kind: WordsKind, filters: WordsFilters) {
  return useQuery({
    queryKey: ["words", kind, filters],
    queryFn: async () => {
      const params: Record<string, string | number | boolean> = {
        page: filters.page,
        limit: 7,
      };
      if (filters.keyword) params.keyword = filters.keyword;
      if (filters.category) params.category = filters.category;
      if (filters.category === "verb" && filters.isIrregular !== undefined) {
        params.isIrregular = filters.isIrregular;
      }

      const url = kind === "own" ? "/words/own" : "/words/all";
      const { data } = await api.get<WordsResponse>(url, { params });
      return data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useStatistics() {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await api.get<{ totalCount: number }>("/words/statistics");
      return data;
    },
  });
}

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await api.get<unknown>("/words/tasks");

      if (Array.isArray(data)) return data as Task[];

      if (data && typeof data === "object") {
        const list = Object.values(data).find(Array.isArray);
        if (list) return list as Task[];
      }

      return [];
    },
    staleTime: Infinity,
    gcTime: 0,
  });
}

export function useCreateWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: WordPayload) => {
      const { data } = await api.post<Word>("/words/create", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Word added");
      queryClient.invalidateQueries({ queryKey: ["words"] });
      queryClient.invalidateQueries({ queryKey: ["statistics"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useEditWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...payload }: WordPayload & { id: string }) => {
      const { data } = await api.patch<Word>(`/words/edit/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Word updated");
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/words/delete/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Word deleted");
      queryClient.invalidateQueries({ queryKey: ["words"] });
      queryClient.invalidateQueries({ queryKey: ["statistics"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useAddToDictionary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.post<Word>(`/words/add/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Word added to your dictionary");
      queryClient.invalidateQueries({ queryKey: ["words"] });
      queryClient.invalidateQueries({ queryKey: ["statistics"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useSubmitAnswers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (answers: Answer[]) => {
      const { data } = await api.post<Answer[]>("/words/answers", answers);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
      queryClient.invalidateQueries({ queryKey: ["statistics"] });
    },
  });
}
