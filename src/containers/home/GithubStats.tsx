
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {fetchStats} from '@/actions/github';
import config from '@/constants/config';
import loader from '@/assets/loader.svg';

function GithubStats() {

  const [githubStats, setGithubStats] = useState<{[key: string]: number} | undefined>(undefined);

  useEffect(()=> {
    const fetchData = async () => {
      const data = await fetchStats();
      setGithubStats(data);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full text-center">
      <h2 className="text-6xl font-bold text-theme-color underline-animation">
        {config.githubStats}
      </h2>    

      {githubStats ? (
        'hello'
        ) : (
          <Image
          src={loader.src}
          alt=""
          width={100}
          height={100}
        />
        )
      }  

    </div>
  )
}

export default GithubStats;
