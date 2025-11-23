import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAnnouncements } from "@/contexts/AnnouncementContext"; 

import type { Announcement } from "@/types/announcement";

const MyTable = () => {
    const navigate = useNavigate();
    
    const { announcements: tabData } = useAnnouncements(); 

    const sortedData: Announcement[] = [...tabData].sort(
        (a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
    );

    return (
        <div className="w-full mt-8">
            <h1 className="text-xl mb-4 font-bold text-left">Announcements</h1>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Publication Date</TableHead>
                            <TableHead>Last Update</TableHead>
                            <TableHead>Categories</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="text-left">
                        {sortedData.map((item) => (
                            <TableRow key={item.id}> 
                                <TableCell className="font-medium">{item.title}</TableCell>
                                <TableCell>{item.publicationDate}</TableCell>
                                <TableCell>{item.lastUpdate}</TableCell>
                                <TableCell>{item.categories.join(", ")}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        className="cursor-pointer p-2"
                                        onClick={() => navigate(`/announcements/${item.id}`)} 
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MyTable;
