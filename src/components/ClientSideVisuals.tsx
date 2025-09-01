"use client";

import React from "react";
import SectionMagazine4 from "./SectionMagazine4"; // adjust the path
import { useLatestVideos } from "@/hooks/api";


const ClientSideVisuals = ({dict}: {dict: any}) => {

    const { data: latestVideos, isLoading, error } = useLatestVideos(8);
    // console.log(latestVideos,"latestVideos");
    const displayPosts = latestVideos?.data || [];
    // console.log(displayPosts);
    
  return (
    <div className="mt-28 bg-[#000000] py-16 lg:py-20 dark:bg-[#0D0D0D]">
      <div className="relative container">
        <SectionMagazine4
          heading={dict.sections.visuals.heading}
          subHeading={dict.sections.visuals.description}
          posts={displayPosts.slice(0, 6) as any}
          headingColor="light"
        />
      </div>
    </div>
  );
};

export default ClientSideVisuals;
