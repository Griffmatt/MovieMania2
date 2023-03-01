import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import db from '../firebase'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../main'

export const useFollow = (userId?: string | null) => {
  const addToFollowList = async (profileId: string) => {
    if (userId == null) return
    const docRef = doc(db, 'following', userId)
    await updateDoc(docRef, {
      following: arrayUnion(profileId),
    })
    return profileId
  }

  const mutationFollow = useMutation(addToFollowList, {
    // When mutate is called:
    onMutate: async (profileId) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['following', userId])

      // Snapshot the previous value

      const previousFollowing = queryClient.getQueryData([
        'following',
        userId,
      ]) as { following: string[] }

      // Optimistically update to the new value

      previousFollowing &&
        queryClient.setQueryData(['following', userId], {
          following: [...previousFollowing.following, profileId],
        })

      // Return a context with the previous and new todo
      return { previousFollowing }
    },
    onError: (err, profileId, context) => {
      queryClient.setQueryData(
        ['following', userId],
        context?.previousFollowing
      )
      console.log(err)
    },
    // Always refetch after error or success:
    onSettled: () => {
      void queryClient.invalidateQueries(['following', userId])
    },
  })

  return mutationFollow
}
