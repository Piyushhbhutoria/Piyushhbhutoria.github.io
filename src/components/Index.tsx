import About from "@/components/About";
// import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RecentBlogs from "@/components/RecentBlogs";
import Projects from "@/components/Projects";
import OpenSourceProjects from "@/components/OpenSourceProjects";
import Skills from "@/components/Skills";
import SkipLink from "@/components/SkipLink";
import type { IndexProps } from "@/types";

const Index = ({ heroData, aboutData, experienceData, projectsData, openSourceProjectsData, skillsData, certificationsData, achievementsData, educationData, contactData, recentBlogs }: IndexProps) => {
    return (
        <div className="min-h-screen">
            <SkipLink />
            <Header />
            <main id="main-content">
                <Hero {...heroData} />
                <About {...aboutData} />
                <RecentBlogs posts={recentBlogs} />
                <Projects {...projectsData} />
                <OpenSourceProjects {...openSourceProjectsData} />
                <Experience {...experienceData} />
                <Skills {...skillsData} />
                <Certifications {...certificationsData} />
                <Education {...educationData} />
                {/* <Achievements {...achievementsData} /> */}
                <Contact {...contactData} />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
