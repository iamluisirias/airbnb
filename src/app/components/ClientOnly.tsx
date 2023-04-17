'use client';

import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode
}

// This component what is does is to protect from SSR errors (hydration errors)

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null;

  return (
    <>
     {children} 
    </>
  );
};

export default ClientOnly;