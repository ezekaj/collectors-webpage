export interface GradingRequest {
  sessionId: string;
  images: GradingImage[];
  carType: "loose" | "carded" | "boxed";
}

export interface GradingImage {
  url: string;
  angle: "top" | "left" | "right" | "bottom" | "card_front" | "card_back";
}

export interface GradingResponse {
  sessionId: string;
  carIdentification: {
    name: string;
    series: string | null;
    year: number | null;
    variant: string | null;
    confidence: number;
    catalogItemId: string | null;
  };
  carBody: {
    numericGrade: number;
    letterGrade: string;
    confidence: number;
    gradeRange: [number, number];
  };
  packaging: {
    numericGrade: number;
    letterGrade: string;
    confidence: number;
    gradeRange: [number, number];
  } | null;
  defects: DefectAnnotation[];
  needsManualReview: boolean;
  modelVersion: string;
  processingTimeMs: number;
}

export interface DefectAnnotation {
  category: "paint" | "chrome" | "base" | "wheels" | "tampo" | "card" | "blister";
  description: string;
  severity: "minor" | "moderate" | "severe";
  location: string;
}
