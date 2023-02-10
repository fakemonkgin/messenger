"use client"
import { FormEvent, useState } from "react"
import { v4 as uuid} from "uuid"
import { Message } from "../typings"
import useSWR from "swr"
import fetcher from "../utils/fetchMessages"
import { getServerSession } from "next-auth"

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>> 
}

function ChatInput({session}: Props) {
  const [input, setInput] = useState("")
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher)
  
  const addMessage = async (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(!input || !session) return
      const messageToSend = input
      setInput("")

      const id = uuid()

      const message: Message = {
          id,
          message: messageToSend,
          created_at: Date.now(),
          username: "Gin",
          profilePic: "https://ibb.co/r62FsnX",
          email: "ginli2022@gmail.com"
      }

      const uploadMessageToUpstash = async () => {
          const data = await fetch("/api/addMessage", {
              method: "POST",   
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  message
              }),
          }).then(res=> res.json())

          return [data.message, ...messages!]
      }
      
      await mutate(uploadMessageToUpstash, {
         optimisticData:[message, ...messages!],
         rollbackOnError: true,
      })
  }
   
  return (
    <form onSubmit={addMessage} className='fixed bottom-0 z-50 flex w-full px-10 py-5 space-x-2 bg-white border-t border-gray-100'>
       <input value={input} disabled={!session} onChange={(e) => setInput(e.target.value)} className="flex-1 px-5 py-3 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="text" placeholder='enter message here...'/>
       <button disabled={!input} className="px-4 py-2 font-bold text-white bg-blue-500 rounded disabled:opacity-50 disabled:cursor-not-allowed" type='submit'>
         Send 
       </button> 
    </form>
  ) 
}

export default ChatInput