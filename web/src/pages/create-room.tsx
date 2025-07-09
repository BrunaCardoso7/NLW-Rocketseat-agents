import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom'

type GetRoomsAPIResponse = Array<{
  id: string,
  name: string
}>

export function CreateRoom () {

    const { data, isLoading  } = useQuery({
        queryKey: ['get-room'],
        queryFn: async()=>{
        const response = await fetch('http://localhost:3333/rooms')
        const result: GetRoomsAPIResponse = await response.json()
        return result
        }
    })  

    return (
        <div>
            Create CreateRoom
            {
                isLoading && <p>Carregando ...</p> 
            }
            
            {
                data && data.map((dt) => {
                return <div>
                    <Link key={dt.id} to={`/room/${dt.id}`}>{dt.name}</Link>
                </div> 
                })
            }
        </div>
    )
}