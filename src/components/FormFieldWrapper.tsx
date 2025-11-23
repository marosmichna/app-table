import type { Control, FieldValues, Path } from "react-hook-form";
import {
    FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea"; 

interface FormFieldWrapperProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>; 
    label: string;
    placeholder?: string;
    component?: 'input' | 'textarea'; 
}

export function FormFieldWrapper<TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    component = 'input',
}: FormFieldWrapperProps<TFieldValues>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {component === 'textarea' ? (
                            <Textarea 
                                {...field} 
                                placeholder={placeholder} 
                                rows={4}
                            />
                        ) : (
                            <Input 
                                {...field} 
                                placeholder={placeholder} 
                                type="text"
                            />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}