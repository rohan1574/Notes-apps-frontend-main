import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { useContext } from 'react';
import { UserProvider } from '../context/AuthContext';

const useAllTrash = () => {
    const { user, loader } = useContext(UserProvider)
    const axiosData = useAxios();
    const { isPending, error, data: trash, refetch } = useQuery({
        queryKey: ['useAllTrash'],
        enabled: !loader,
        queryFn: () =>
            axiosData.get(`/trash?email=${user?.email}`)
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, trash, refetch }
};

export default useAllTrash;