import { WebContainer } from '@webcontainer/api'
import { useEffect, useState } from 'react'

const useWebContainer = () => {

  const [webContainer, setWebContainer] = useState<WebContainer | null>(null)

  const main = async () => {
    console.log("Booting WebContainer...");
    const webContainer = await WebContainer.boot();
    console.log("WebContainer booted successfully");
    setWebContainer(webContainer);
  }

  useEffect(() => {
    !webContainer && main()
  }, [])

  return webContainer;
}

export default useWebContainer