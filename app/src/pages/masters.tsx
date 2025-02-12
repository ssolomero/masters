import { useState, useEffect } from "react";
import RANKINGS from "./api/rankings";
import SELECTIONS from "./api/selections";

export default function NewPage() {

  const [data, setData] = useState(null) as any;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [playerMap, setPlayerMap] = useState<any>();

  useEffect(() => {
    const url = 'https://golf-leaderboard-data.p.rapidapi.com/leaderboard/651';
    const options = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': '244f220674msh41be0771b7485eap152c23jsnad1ac3e6b553',
		    'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com'
	    }
    };
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setLeaderboard(json.results.leaderboard);
        setPlayerMap(createMap(json.results.leaderboard));
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function createMap(data: any) {
    let map = new Map<string, any>();
    data.forEach((element: any) => {
      map.set(`${element.first_name} ${element.last_name}`, element)
    });
    return map;
  }

  function totalScore(data:any) {
    let score = 0;
    data.forEach((el:any) => {
      let player = playerMap.get(el);
      score += player ? player.total_to_par : 0;
    });
    return score;
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="header">Masters of the Bulge</div>
      <ul>
        { 
          leaderboard?.map((item: any, index: number) => {
          return <li key={index}>{item.position}. {item.first_name} {item.last_name} {item.total_to_par}</li>;
        })
        }
      </ul>
      
      <div>
        { 
            SELECTIONS.map((item: any, index: number) => {
              return <div key={index}>{item.name}: {totalScore(item.selections)}</div>;
            }
          )
        }
      </div>
    </div>
  );
}