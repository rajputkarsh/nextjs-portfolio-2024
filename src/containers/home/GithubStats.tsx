import { cloneElement, useEffect, useState } from "react";
import Image from "next/image";
import ActivityCalendar, {
  ThemeInput as ReactCalendarThemeInput,
} from "react-activity-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { fetchStats } from "@/actions/github";
import config from "@/constants/config";
import loader from "@/assets/loader.svg";

import "react-tooltip/dist/react-tooltip.css";

interface GithubDayActivity {
  date: string;
  count: number;
  level: number;
}

const GITHUB_CALENDAR_THEME: ReactCalendarThemeInput = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const GITHUB_LABEL = {
  totalCount: `{{count}} contributions since last year`,
};

function GithubStats() {
  const [totalCommits, setTotalCommits] = useState<number>(0);
  const [githubStats, setGithubStats] = useState<
    Array<GithubDayActivity> | undefined
  >(undefined);

  const getActivityLevel = (count: number): number => {
    let level = 0;
    if (count >= 0 && count < 5) {
      level = 1;
    } else if (count >= 5 && count < 10) {
      level = 2;
    } else {
      level = 3;
    }

    return level;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStats();
      const activityData: Array<GithubDayActivity> = Object.entries(data).map(
        ([date, count]) => ({
          date,
          count,
          level: getActivityLevel(count),
        })
      );
      activityData.sort(
        (obj1, obj2) =>
          new Date(obj1.date).getTime() - new Date(obj2.date).getTime()
      );
      setGithubStats(activityData);
      setTotalCommits(
        Object.values(data).reduce((prev, curr) => prev + curr, 0)
      );
    };
    fetchData();
  }, []);

  return (
    <div className="w-full text-center">
      <h2 className="text-5xl my-8 font-bold text-theme-color underline-animation">
        {config.githubStats}
      </h2>
      {githubStats ? (
        <div className="w-full flex flex-row justify-center">
          <ActivityCalendar
            data={githubStats || []}
            renderBlock={(block, activity) => {
              console.log(`activity - `, activity);
              console.log(`block - `, block);
              return cloneElement(block, {
                "data-tooltip-id": "react-tooltip",
                "data-tooltip-html": `${activity.count} commits on ${activity.date}`,
              });
            }}
            theme={GITHUB_CALENDAR_THEME}
            colorScheme="light"
            labels={Object.assign({}, GITHUB_LABEL)}
            totalCount={totalCommits}
          />
          <ReactTooltip id="react-tooltip" />
        </div>
      ) : (
        <Image
          className="m-auto"
          src={loader.src}
          alt=""
          width={200}
          height={200}
        />
      )}
    </div>
  );
}

export default GithubStats;
