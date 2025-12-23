"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export default function FreeDiagnosisForm() {
    const [file, setFile] = useState<File | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        setLoading(true);
        setError(null);
        setAnalysis(null);

        // Placeholder for API call
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // In a real app, you would send the file to your API endpoint
            // const formData = new FormData();
            // formData.append('image', file);
            // const response = await fetch('/api/diagnosis', {
            //     method: 'POST',
            //     body: formData,
            // });
            // const result = await response.json();
            // if (!response.ok) {
            //     throw new Error(result.error || 'Something went wrong');
            // }
            // setAnalysis(result.analysis);
            
            setAnalysis("This is a placeholder analysis. The AI would review your image and provide actionable feedback here, such as suggestions for plating improvements, menu layout changes, or branding adjustments.");

        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="font-headline">Get Your Free Analysis</CardTitle>
                <CardDescription>Upload an image to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="diagnosis-file">Upload Image (Dish, Menu, Storefront)</Label>
                        <Input id="diagnosis-file" type="file" onChange={handleFileChange} accept="image/*" />
                    </div>
                    <Button type="submit" className="w-full font-semibold" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {loading ? 'Analyzing...' : 'Get My Diagnosis'}
                    </Button>
                </form>

                {error && (
                    <Alert variant="destructive" className="mt-6">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {analysis && (
                    <div className="mt-6 p-4 border border-primary/20 bg-card rounded-lg">
                        <h3 className="font-headline text-lg font-semibold text-primary">AI Analysis Results:</h3>
                        <p className="mt-2 text-muted-foreground whitespace-pre-wrap">{analysis}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
