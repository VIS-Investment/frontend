import React from "react";

const teamMembers = [
  {
    name: "Si-Hyun Lee",
    position: "Frontend Developer",
    bio: "Charlie oversees project timelines and coordinates team efforts efficiently.",
    photo: "/images/team-sihyun.png",
  },
  {
    name: "Jae-Young Kim",
    position: "Backend Developer",
    bio: "Dana analyzes complex datasets to extract insights and drive innovation.",
    photo: "/images/team-jaeyoung.png",
  },
  {
    name: "Young-Seo Yoon",
    position: "Project Manager",
    bio: "Alice is a skilled frontend developer specializing in React and UX/UI design.",
    photo: "/images/team-youngseo.png",
  },
  {
    name: "Ji-Won Yang",
    position: "Data Scientist",
    bio: "Bob is an expert in backend systems, ensuring performance and scalability.",
    photo: "/images/team-jiwon.png",
  },
];

function TeamIntroduce() {
  return (
    <section className="bg-white dark:bg-black py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-6">
        Meet Our Team
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center text-center space-y-4"
          >
            {/* 팀원 사진 */}
            <div className="rounded-full w-32 h-32 bg-white shadow-lg">
              <img
                src={member.photo}
                alt={member.name}
                className="rounded-full w-32 h-32 object-cover"
              />
            </div>
            {/* 팀원 정보 */}
            <h2 className="text-lg font-semibold text-black dark:text-white">
              {member.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {member.position}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TeamIntroduce;
