import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useController } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command, CommandGroup, CommandItem, CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { AVAILABLE_CATEGORIES } from "@/constants/categories";

interface MultiSelectProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: string;
}

export function MultiSelectCategory<TFieldValues extends FieldValues>({
    control,
    name,
    label,
}: MultiSelectProps<TFieldValues>) {
    
    const { field } = useController({ name, control });
    
    const selectedCategories: string[] = (field.value as string).split(",").map(c => c.trim()).filter(c => c.length > 0);
    
    const [open, setOpen] = useState(false);

    const handleCategoryToggle = (categoryValue: string) => {
        let newSelection;
        
        if (selectedCategories.includes(categoryValue)) {
            newSelection = selectedCategories.filter((c) => c !== categoryValue);
        } else {
            newSelection = [...selectedCategories, categoryValue];
        }

        field.onChange(newSelection.join(", "));
    };
    
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <div className="flex flex-wrap gap-2 mb-2 min-h-[38px] items-center p-2 border border-input rounded-md">
                    {selectedCategories.map((category) => (
                        <Badge 
                            key={category} 
                            variant="secondary"
                            className="flex items-center"
                        >
                            {category}

                        </Badge>
                    ))}
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between h-8 text-sm focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                            >
                                {selectedCategories.length === 0 ? "Select Categories..." : `+ Add Category`}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                            <Command>
                                <CommandList>
                                    <CommandGroup>
                                        {AVAILABLE_CATEGORIES.map((category) => {
                                            const isSelected = selectedCategories.includes(category);
                                            return (
                                                <CommandItem
                                                    key={category}
                                                    value={category}
                                                    onSelect={() => {
                                                        handleCategoryToggle(category);
                                                    }}
                                                >
                                                    <Check
                                                        className={`mr-2 h-4 w-4 ${isSelected ? "opacity-100" : "opacity-0"}`}
                                                    />
                                                    {category}
                                                </CommandItem>
                                            );
                                        })}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}