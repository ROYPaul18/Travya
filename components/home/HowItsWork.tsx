'use client';

import { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface StepContent {
    step: number;
    title: string;
    description: string;
    videoPlaceholder: string;
}

const videoMap: Record<number, string> = {
    1: 'Step 1: Map Planning Demo',
    2: 'Step 2: Globe Exploration Demo',
    3: 'Step 3: Calendar Organization Demo',
};


export function HowItWorksClient({ content }: { content: any }) {

    const [activeStep, setActiveStep] = useState<string>('item-1');
    const steps: StepContent[] = useMemo(() => [
        { step: 1, ...content.step1, videoPlaceholder: videoMap[1] },
        { step: 2, ...content.step2, videoPlaceholder: videoMap[2] },
        { step: 3, ...content.step3, videoPlaceholder: videoMap[3] },
    ], [content]);

    const activeStepNumber = parseInt(activeStep.split('-')[1]);
    const currentVideo = steps.find(s => s.step === activeStepNumber)?.videoPlaceholder;


    return (
        <div className="lg:flex-col lg:gap-16 items-start max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-16 lg:mb-20 text-gray-900 lg:text-left text-center">
                {content.howItWorksTitle}
            </h2>
            <div className='flex'>
                <div className="lg:sticky lg:top-24 lg:w-1/2 w-full mb-12 lg:mb-0">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 shadow-2xl bg-gray-200 flex items-center justify-center">
                        <div className="text-center p-8">
                            <ArrowRight className="h-8 w-8 text-gray-400 mx-auto rotate-90 lg:rotate-0 mb-4" />
                            <p className="text-gray-600 font-medium">
                                {currentVideo || 'Demo vidéo non trouvée'}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                (Actuellement affichage de l'étape n°{activeStepNumber})
                            </p>
                        </div>
                    </div>
                </div>


                <div className="lg:w-1/2 w-full">

                    <Accordion
                        type="single"
                        collapsible
                        value={activeStep}
                        onValueChange={(value) => {

                            if (value) {
                                setActiveStep(value);
                            }
                        }}
                        className="w-full relative"
                    >
                        {steps.map((item) => {
                            const itemId = `item-${item.step}`;
                            const isActive = activeStep === itemId;

                            return (
                                <AccordionItem
                                    value={itemId}
                                    key={itemId}
                                    className={`mb-4 border-b-0 rounded-xl transition-all duration-300 ${isActive ? 'shadow-2xl border-2 border-gray-900' : ""}`}

                                    onMouseEnter={() => setActiveStep(itemId)}
                                >
                                    <AccordionTrigger
                                        className={`py-5 px-6 font-medium hover:no-underline transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-700'}`}
                                    >
                                        <div className="flex items-center gap-6">

                                            <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 transition-colors duration-300
                                            
                                        `}>
                                                {item.step}
                                            </div>

                                            <span className="text-lg font-medium">{item.title}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-5 text-gray-600">
                                        {item.description}
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}