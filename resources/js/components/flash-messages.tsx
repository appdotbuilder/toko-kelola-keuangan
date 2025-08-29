import React from 'react';
import { usePage } from '@inertiajs/react';
import { Alert } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { type SharedData } from '@/types';

export function FlashMessages() {
    const { flash } = usePage<SharedData>().props;

    if (!flash.success && !flash.error && !flash.warning && !flash.info) {
        return null;
    }

    return (
        <div className="space-y-4 mb-6">
            {flash.success && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    <div className="font-medium">{flash.success}</div>
                </Alert>
            )}
            
            {flash.error && (
                <Alert className="border-red-200 bg-red-50 text-red-800">
                    <XCircle className="h-4 w-4" />
                    <div className="font-medium">{flash.error}</div>
                </Alert>
            )}
            
            {flash.warning && (
                <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
                    <AlertCircle className="h-4 w-4" />
                    <div className="font-medium">{flash.warning}</div>
                </Alert>
            )}
            
            {flash.info && (
                <Alert className="border-blue-200 bg-blue-50 text-blue-800">
                    <Info className="h-4 w-4" />
                    <div className="font-medium">{flash.info}</div>
                </Alert>
            )}
        </div>
    );
}