import React from "react";
import CompanyIntroduce from "./CompanyIntroduce";
import TeamIntroduce from "./TeamIntroduce";

function IntroducePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      {/* 기업 소개 */}
      <CompanyIntroduce />
      {/* 팀원 소개 */}
      <TeamIntroduce />
    </div>
  );
}

export default IntroducePage;
