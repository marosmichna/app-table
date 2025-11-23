import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import { useAnnouncements } from "@/contexts/AnnouncementContext"; 
import { FormFieldWrapper } from "@/components/FormFieldWrapper"; 
import { MultiSelectCategory } from "@/components/MultiSelectCategory"; 

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }), 
    publicationDate: z.string().min(1, { message: "Publication Date is required" }),
    lastUpdate: z
        .string()
        .regex(
            /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4} ([01]\d|2[0-3]):([0-5]\d)$/,
            { message: "Last Update must be in MM/DD/YYYY HH:mm format" }
        ),
    categories: z.string().min(1, { message: "At least one category is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function AnnouncementDetail() {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    
    const { updateAnnouncement, getAnnouncement } = useAnnouncements();
    const currentItem = getAnnouncement(id!); 

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "", 
            publicationDate: "",
            lastUpdate: "",
            categories: "",
        },
    });

    useEffect(() => {
        if (currentItem) {
            form.reset({
                title: currentItem.title,
                content: currentItem.content, 
                publicationDate: currentItem.publicationDate,
                lastUpdate: currentItem.lastUpdate,
                categories: currentItem.categories.join(", "), 
            });
        }
    }, [id, form, currentItem]);

    const onSubmit = (values: FormValues) => {
        
        const updatedFields = {
            title: values.title,
            content: values.content,
            publicationDate: values.publicationDate,
            lastUpdate: values.lastUpdate,
            categories: values.categories.split(",").map((c) => c.trim()).filter(c => c.length > 0),
        };

        updateAnnouncement(id!, updatedFields);

        alert("Data saved (demo)");
        navigate("/announcements"); 
    };

    if (!currentItem) {
        return <div className="p-6 text-red-600">Announcement with ID {id} not found.</div>;
    }

    return (
        <div className="p-6 max-w-lg">
            <h1 className="text-2xl font-bold mb-6">Edit the Announcement</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    
                    <FormFieldWrapper
                        control={form.control}
                        name="title"
                        label="Title"
                    />
                    
                    <FormFieldWrapper
                        control={form.control}
                        name="content"
                        label="Content"
                        component="textarea"
                        placeholder="Enter the main announcement text here..."
                    />

                    <MultiSelectCategory
                        control={form.control}
                        name="categories"
                        label="Categories"
                    />

                    <FormFieldWrapper
                        control={form.control}
                        name="publicationDate"
                        label="Publication Date"
                        placeholder="MM/DD/YYYY HH:mm"
                    />

                    <FormFieldWrapper
                        control={form.control}
                        name="lastUpdate"
                        label="Last Update"
                        placeholder="MM/DD/YYYY HH:mm"
                    />

                    <Button variant="publish" className="flex ml-auto">Publish</Button>
                </form>
            </Form>
        </div>
    );
}