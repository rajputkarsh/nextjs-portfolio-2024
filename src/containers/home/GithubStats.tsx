'use client';

import { cloneElement, useEffect, useState } from 'react';
import Image from 'next/image';
import ActivityCalendar, {
  ThemeInput as ReactCalendarThemeInput,
} from 'react-activity-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { fetchStats, savePreviousStats } from "@/actions/github";
import config from '@/constants/config';
import loader from '@/assets/loader.svg';

import 'react-tooltip/dist/react-tooltip.css';
import { formatDate } from '@/utils/common';
import useCurrentTheme from '@/hooks/useCurrentTheme';

interface GithubDayActivity {
  date: string;
  count: number;
  level: number;
}

const GITHUB_CALENDAR_THEME: ReactCalendarThemeInput = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

const GITHUB_LABEL = {
  totalCount: `{{count}} contributions since last year`,
};

function GithubStats() {
  const { theme } = useCurrentTheme() as { theme: 'light' | 'dark' };
  const [streak, setStreak] = useState<{
    currentStreak: number;
    maxStreak: number;
  }>({
    currentStreak: 0,
    maxStreak: 0,
  });
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

  const getStreak = (
    dates: Array<string>
  ): { maxStreak: number; currentStreak: number } => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentStreak = 0,
      maxStreak = 0;
    let lastDate;

    for (const date of dates) {
      const currentDate = new Date(date);
      currentDate.setHours(0, 0, 0, 0);
      if (lastDate && currentDate.getTime() - lastDate.getTime() === 86400000) {
        currentStreak++;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      } else {
        currentStreak = 1;
      }
      lastDate = currentDate;
    }

    if (lastDate && today.getTime() === lastDate.getTime() + 86400000) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    }

    return { currentStreak, maxStreak };
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStats() || [];
      const activityDateArray: Array<string> = Object.keys(data).sort(
        (date1, date2) => new Date(date1).getTime() - new Date(date2).getTime()
      );
      const currentStreak = getStreak(activityDateArray);
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
      setStreak((_) => currentStreak);
      setGithubStats(activityData);
      setTotalCommits(
        Object.values(data).reduce((prev, curr) => prev + curr, 0)
      );
    };
    fetchData();
    savePreviousStats();
  }, []);

  return (
    <div className="w-full text-center">
      <h2 className="text-4xl md:text-5xl my-8 font-bold text-theme-color underline-animation">
        {config.githubStats}
      </h2>
      {githubStats ? (
        <div className="w-full flex flex-row justify-center pl-4 pr-6">
          <ActivityCalendar
            data={githubStats || []}
            renderBlock={(block, activity) => {
              return cloneElement(block, {
                'data-tooltip-id': 'react-tooltip',
                'data-tooltip-html': `${activity.count} commits on ${formatDate(
                  activity.date,
                  true
                )}`,
              });
            }}
            theme={GITHUB_CALENDAR_THEME}
            colorScheme={theme}
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
      {(githubStats || []).length > 0 && (
        <div className="w-full flex flex-row font-semibold gap-4 text-sm justify-around mt-8 pl-4 pr-6">
          <span>Current Streak - {streak.currentStreak}</span>
          <span>Max Streak - {streak.maxStreak}</span>
        </div>
      )}      
    </div>
  );
}

export default GithubStats;
