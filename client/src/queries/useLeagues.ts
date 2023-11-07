import { useQuery } from "@tanstack/react-query"
import axios from 'axios'

interface League {
    name: string
}

function fetchLeagues(): Promise<League[]> {
    return axios.get('/api/leagues').then((response) => response.data)
}

// ✅ data will be `League[] | undefined` here
export function useLeagues() {
    return useQuery({ queryKey: ['leagues'], queryFn: fetchLeagues })
}