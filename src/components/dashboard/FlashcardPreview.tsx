
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Book, ArrowRight, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FlashcardPreviewProps {
  className?: string;
}

const flashcards = [
  {
    question: "What is compound interest?",
    answer: "Interest calculated on both the initial principal and the accumulated interest over time, resulting in exponential growth."
  },
  {
    question: "What is diversification in investing?",
    answer: "Spreading investments across various asset classes to reduce risk while maintaining potential returns."
  },
  {
    question: "What does 'bull market' mean?",
    answer: "A market condition where prices are rising or expected to rise, typically accompanied by investor optimism."
  }
];

const FlashcardPreview: React.FC<FlashcardPreviewProps> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 200);
  };
  
  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 200);
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md border border-border/60", className)}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-primary/20 p-2 rounded-full mr-3">
              <Book className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-base font-medium">Financial Flashcards</CardTitle>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>{currentIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{flashcards.length}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 h-[150px] flex items-center justify-center">
        <div 
          className="w-full h-full perspective-[1000px] cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={cn(
              "relative w-full h-full transition-all duration-500 transform-style-3d",
              isFlipped ? "rotate-y-180" : ""
            )}
          >
            <div className="absolute w-full h-full backface-hidden bg-secondary/50 rounded-md p-4 flex items-center justify-center text-center">
              <div>
                <h3 className="font-medium mb-1">{flashcards[currentIndex].question}</h3>
                <p className="text-xs text-muted-foreground">Click to reveal answer</p>
              </div>
            </div>
            <div className="absolute w-full h-full backface-hidden bg-primary/10 rounded-md p-4 flex items-center justify-center rotate-y-180 text-center">
              <p className="text-sm">{flashcards[currentIndex].answer}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-xs p-0 h-auto hover:bg-transparent hover:text-primary">
          <span>All flashcards</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FlashcardPreview;
