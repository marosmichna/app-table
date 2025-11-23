import { createContext, useState, useContext, type ReactNode } from 'react';
import initialData from "@/data/tabData.json"; 
import type { Announcement } from "@/types/announcement"; 

interface AnnouncementContextType {
    announcements: Announcement[];
    updateAnnouncement: (id: string, newValues: Partial<Announcement>) => void;
    getAnnouncement: (id: string) => Announcement | undefined;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export const useAnnouncements = (): AnnouncementContextType => {
    const context = useContext(AnnouncementContext);
    if (!context) {
        throw new Error("useAnnouncements must be used within an AnnouncementProvider");
    }
    return context;
};

export const AnnouncementProvider = ({ children }: { children: ReactNode }) => {
    
    const [announcements, setAnnouncements] = useState<Announcement[]>(initialData as Announcement[]);

    const updateAnnouncement = (id: string, newValues: Partial<Announcement>) => {
        
        setAnnouncements(prevData => {
            
            const updatedData = prevData.map((item) => {
                
                if (item.id.toString() !== id.toString()) {
                    return item; 
                }
                
                return {
                    ...item,
                    ...newValues 
                };
            });
            
            return updatedData;
        });
    };
    
    const getAnnouncement = (id: string): Announcement | undefined => {
        return announcements.find(item => item.id.toString() === id.toString());
    };

    const contextValue: AnnouncementContextType = { announcements, updateAnnouncement, getAnnouncement };

    return (
        <AnnouncementContext.Provider value={contextValue}>
            {children}
        </AnnouncementContext.Provider>
    );
};