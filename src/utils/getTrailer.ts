import { youtubeUrl } from "../constants"

export const getTrailer = async (title: string) => {
   const response = await fetch(youtubeUrl + '/search?' + new URLSearchParams({
    part: 'snippet',
    maxResults: "1",
    q: title,
    type: 'video',
    videoEmbeddable: 'true'
   }),
   {
    
    headers: {
      authorization: localStorage.getItem('accessToken') ?? ''
    }
   }
    )  
    return (await response.json()).items[0].id.videoId as string;
}
