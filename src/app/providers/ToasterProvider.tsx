'use client';

import { Toaster } from 'react-hot-toast';

// We need this wrapper to use a client-only npm packages because they need at least one client component parent ('use client')
const ToasterProvider = () => <Toaster />;

export default ToasterProvider;
