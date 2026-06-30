import { useMutation, useQuery } from "@tanstack/react-query"
import apiClient from './axios'

export const useFetchContentSection = (section: string) => {
    const query = useQuery({
        queryKey: [`section-content-${section}`],
        queryFn: async () => {
            const { data } = await apiClient.get(`sections/${section}`)
            return data
        }
    })
    return query
}

export const useUpdateContentSection = () => {
    const mutation = useMutation({
        mutationFn: async ({content, section}: {content: any, section: string}) => {
            const { data } = await apiClient.put(`sections/${section}`, content)
            return data
        }
    })
    return mutation
}