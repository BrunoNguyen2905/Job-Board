import React, { useMemo, useState } from "react";
import AdzunaJobSearch from "./jobs-source/adzuna-jobs";
import TabBar from "./tab-bar";

type TJobSearchProps = any;

const JobSearch: React.FC<TJobSearchProps> = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const onTabChange = (index: number) => {
    setSelectedTabIndex(index);
  };

  const navigationTabs = useMemo(
    () => [{ label: "Adzuna" }, { label: "Remotive" }, { label: "CareerJet" }],
    []
  );
  return (
    <div className="max-w-6xl mx-auto my-8 px-3 z-10 flex flex-col">
      <h1>Job Search</h1>
      <TabBar
        selectedIndex={selectedTabIndex}
        onTabClick={onTabChange}
        tabs={navigationTabs}
      />
      <div className="my-8 px-3">
        {selectedTabIndex === 0 ? (
          <AdzunaJobSearch />
        ) : selectedTabIndex === 1 ? (
          <div>Remotive Jobs</div>
        ) : (
          <div>CareerJet</div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
