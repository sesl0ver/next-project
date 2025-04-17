"use client";

import { createContext, useContext, useState } from "react";

const LoadingContext = createContext<{
    isLoading: boolean;
    setLoading: (val: boolean) => void;
}>({
    isLoading: false,
    setLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
