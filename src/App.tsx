import Index from "@/components/Index";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { IndexProps } from "@/types";

const App = ({ heroData, aboutData, experienceData, projectsData, skillsData, certificationsData, achievementsData, educationData, contactData }: IndexProps) => (
  <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
    <TooltipProvider>
      <Toaster />
      <Index heroData={heroData} aboutData={aboutData} experienceData={experienceData} projectsData={projectsData} skillsData={skillsData} certificationsData={certificationsData} achievementsData={achievementsData} educationData={educationData} contactData={contactData} />
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
