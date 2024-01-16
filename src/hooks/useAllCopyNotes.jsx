import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { useContext } from 'react';
import { UserProvider } from '../context/AuthContext';

const useAllCopyNotes = () => {
    const { user, loader } = useContext(UserProvider)
    const axiosData = useAxios();
    const { isPending, error, data: copynotes, refetch } = useQuery({
        queryKey: ['copynotes'],
        enabled: !loader,
        queryFn: () =>
            axiosData.get(`/notecopy?email=${user?.email}`)
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, copynotes, refetch }
};

export default useAllCopyNotes;