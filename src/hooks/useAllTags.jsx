import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { useContext } from 'react';
import { UserProvider } from '../context/AuthContext';

const useAllTags = () => {
    const { user, loader } = useContext(UserProvider)
    const axiosData = useAxios();
    const { isPending, error, data: tags, refetch } = useQuery({
        queryKey: ['useAllTags'],
        enabled: !loader,
        queryFn: () =>
            axiosData.get(`/tags?email=${user?.email}`)
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, tags, refetch }
};

export default useAllTags;