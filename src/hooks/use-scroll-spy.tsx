import { useEffect, useState } from "react";

const useScrollSpy = (sectionIds: string[]) => {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150; // Offset for header

            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const id = sectionIds[i];
                const element = document.getElementById(id);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(id);
                        return;
                    }
                }
            }
        };

        // Also use IntersectionObserver as a fallback
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (!element) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                        setActiveSection(id);
                    }
                },
                {
                    threshold: [0, 0.2, 0.5, 1],
                    rootMargin: "-100px 0px -40% 0px"
                }
            );

            observer.observe(element);
            observers.push(observer);
        });

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observers.forEach((observer) => observer.disconnect());
        };
    }, [sectionIds]);

    return activeSection;
};

export default useScrollSpy;

