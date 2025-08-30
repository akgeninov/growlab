import React from "react";
import HeroSection from "../../components/career/hero-section/HeroSection";
import Section_2 from "../../components/career/section_2/Section_2";
import MomenSection from "../../components/career/momen-section/MomenSection";
import KerjaSection from "../../components/career/kerja-section/KerjaSection";
import JoinKerjaSection from "../../components/career/join-kerja-section/JoinKerjaSection";


function Career() {
  return (
    <div className=" flex flex-col justify-center items-center shrink-0">
      <HeroSection />
      <Section_2 />
      <MomenSection />
      <KerjaSection /> 
      <JoinKerjaSection />
    </div>
  );
}

export default Career;
