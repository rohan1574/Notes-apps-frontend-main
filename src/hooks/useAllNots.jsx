import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { useContext } from 'react';
import { UserProvider } from '../context/AuthContext';

const useAllNots = () => {
    const { user, loader } = useContext(UserProvider)
    const axiosData = useAxios();
    const { isPending, error, data: notes, refetch } = useQuery({
        queryKey: ['allNotes'],
        enabled: !loader,
        queryFn: () =>
            axiosData.get(`/note?email=${user?.email}`)
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, notes, refetch }
};

export default useAllNots;