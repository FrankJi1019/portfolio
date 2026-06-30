import { useMutation, useQuery } from "@tanstack/react-query"
import apiClient from './axios'

export const useFetchResumes = () => {
    const query = useQuery({
        queryKey: ["section-content-resume"],
        queryFn: async () => {
            const { data } = await apiClient.get("resume/list")
            return data
        }
    })
    return query
}

export const useSyncResume = () => {
    const mutation = useMutation({
        mutationFn: async (fileId: string) => {
            const { data } = await apiClient.put("resume/sync", {fileId})
            return data
        }
    })
    return mutation
}