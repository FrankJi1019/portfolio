import { useMutation, useQuery } from "@tanstack/react-query"
import { useHttpClient } from './axios'

export const useFetchContentSection = (section: string) => {
    const apiClient = useHttpClient()
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
    const apiClient = useHttpClient()
    const mutation = useMutation({
        mutationFn: async ({content, section}: {content: any, section: string}) => {
            const { data } = await apiClient.put(`sections/${section}`, content)
            return data
        }
    })
    return mutation
}