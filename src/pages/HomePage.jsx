import React from "react";
import Hero from "../components/sections/Hero";
import Achievements from "../components/sections/Achievements";
import LatestArticles from "../components/sections/LatestArticles";
import MediaTabs from "../components/sections/MediaTabs";
import Activities from "../components/sections/Activities";
import MediaCoverage from "../components/sections/MediaCoverage";
import PressStatements from "../components/sections/PressStatements";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Achievements />
      <LatestArticles />
      <MediaTabs />
      <Activities />
      {/* <MediaCoverage /> */}
      <PressStatements />
    </>
  );
};

export default HomePage;
