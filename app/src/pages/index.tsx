import Head from "next/head";
import Image from "next/image";
import logo from "../../public/Bulge.svg";
import loadingLogo from "../../public/Bulge.gif"
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Player, Rankings, Teams } from "@/typings/types";


export default function Home() {

  const scoresUrl = 'https://live-golf-data.p.rapidapi.com/leaderboard?orgId=1&tournId=014&year=2025';
  const scoresOptions = {
	  method: 'GET',
	  headers: {
	    'x-rapidapi-key': '244f220674msh41be0771b7485eap152c23jsnad1ac3e6b553',
	    'x-rapidapi-host': 'live-golf-data.p.rapidapi.com'
	  }
  };

  const [loading, setLoading] = useState(true);
  const [playerMap, setPlayerMap] = useState(new Map());
  const [teams, setTeams] = useState({} as Teams[]);
  const [rankings, setRankings] = useState(null as unknown as Rankings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scoresResponse, teamsResponse, rankingsResponse] = 
          await Promise.all([
            fetch(scoresUrl, scoresOptions), 
            fetch('/api/teams'),
            fetch('/api/rankings')
          ]);
        const scoresData = await scoresResponse.json();
        const {data: teamsData} = await teamsResponse.json();
        const {data: rankingsData} = await rankingsResponse.json();
        setTeams(teamsData);
        setRankings(rankingsData[0]);
        setPlayerMap(createMap(scoresData.leaderboardRows));
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function createMap(data: Player[]) {
    const map = new Map<string, Player>();
    data.forEach((element) => {
      map.set(`${element.firstName} ${element.lastName}`, element)
    });
    return map;
  }

  function totalScore(data:string[]) {
    let score = 0;
    data.forEach((el) => {
      const player = playerMap.get(el);
      if (player?.total === 'E') score += 0;
      else score += player ? parseInt(player.total) : 0;
    });
    return score;
  }

  function sortTiers(data: string[]) {
    return data.sort((a,  b) => normalizeScoreTotal(playerMap.get(a)?.total) - normalizeScoreTotal(playerMap.get(b)?.total));
  }
 
  function sortPool(data: Teams[]) {
    return data.sort((a, b) => totalScore(a.players) - totalScore(b.players))
  }

  function normalizeScoreTotal(total: string) {
    if (total === 'E') return 0;
    else return parseInt(total) ??  0;
  }

  useEffect(() => {
    if (playerMap && rankings) {
      rankings.T1 = sortTiers(rankings.T1);
      rankings.T2 = sortTiers(rankings.T2);
      rankings.T3 = sortTiers(rankings.T3);
      rankings.T4 = sortTiers(rankings.T4);
      rankings.T5 = sortTiers(rankings.T5);
      rankings.T6 = sortTiers(rankings.T6);
      rankings.T7 = sortTiers(rankings.T7);
    }
  }, [playerMap, rankings]);

  if (loading) return (
    <div className="main">
      <Image
        src={loadingLogo}
        alt="logo"
        width={200}
        height={200}
        priority
        className="mt-4"
      />
    </div>
  );
  
  return (
    <>
      <Head>
        <title>The Bulge Open</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Pochaevsk&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </Head>
      <div className="main">
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={200}
          priority
          className="mt-4"
        />
        {/* <div className="content">
          <div className="mx-auto mt-5">
            <Link href="/registration"
            >
              <button className="default-btn"><strong>Jump In!</strong></button>
            </Link>
          </div>
        </div> */}
        <Accordion defaultActiveKey="0" className="content pb-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="total-score">{totalScore([
              sortTiers(rankings.T1)[0],
              sortTiers(rankings.T2)[0],
              sortTiers(rankings.T3)[0],
              sortTiers(rankings.T4)[0],
              sortTiers(rankings.T5)[0],
              sortTiers(rankings.T6)[0],
              sortTiers(rankings.T7)[0]
            ])}
            </div>
            <div>Perfect Team</div>
          </Accordion.Header>
          <Accordion.Body>
          <table className="scoreboard">
            <thead className="perfect-team-header">
            </thead>
            <tbody>
            <tr className="player-score">
              <td>T1</td>
              <td>{sortTiers(rankings.T1)[0]}</td>
              <td>{playerMap.get(sortTiers(rankings.T1)[0])?.total ?? 0}</td>
            </tr>
            <tr className="player-score">
              <td>T2</td>
              <td>{sortTiers(rankings.T2)[0]}</td>
              <td>{playerMap.get(sortTiers(rankings.T2)[0])?.total ?? 0}</td>
            </tr>
            <tr className="player-score">
              <td>T3a</td>
              <td>{sortTiers(rankings.T3)[0]}</td>
              <td>{playerMap.get(sortTiers(rankings.T3)[0])?.total ?? 0}</td>
            </tr>
            <tr className="player-score">
              <td>T3b</td>
              <td>{sortTiers(rankings.T4)[0]}</td>
              <td>{playerMap.get(sortTiers(rankings.T4)[0])?.total ?? 0}</td>
            </tr>
            <tr className="player-score">
              <td>T4a</td>
              <td>{sortTiers(rankings.T5)[0]}</td>
              <td>{playerMap.get(sortTiers(rankings.T5)[0])?.total ?? 0}</td>
            </tr>
            <tr className="player-score">
              <td>T4b</td>
              <td>{sortTiers(rankings.T6)[0]}</td>
              <td>{playerMap.get(sortTiers(rankings.T6)[0])?.total ?? 0}</td>
            </tr>
            <tr className="player-score">
              <td>T5</td>
              <td>{sortTiers(rankings.T7)[0]}</td>
              <td>{playerMap.get(sortTiers(rankings.T7)[0])?.total ?? 0}</td>
            </tr>
            </tbody>
          </table>
          </Accordion.Body>
        </Accordion.Item>
        {sortPool(teams).map((item, index) => {
            return (
              <Accordion.Item eventKey={index + 1 + ""} key={index}
              >
                <Accordion.Header>
                  <div className="total-score">{totalScore(item.players)}</div>
                  <div>{item.owner}</div>
                </Accordion.Header>
                <Accordion.Body>
                  {item.players.map((player, index) => {
                    return (
                      <table className="scoreboard" key={player}>
                        <thead className="perfect-team-header"></thead>
                        <tbody>
                          <tr className="player-score">
                            <td className="tier-cell">T{index+1}</td>
                            <td className="name-cell">{player}</td>
                            <td className="score-cell">{playerMap.get(player)?.total ?? 0}</td>
                          </tr>
                        </tbody>
                  </table>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            );
        })}
        
        </Accordion>
      </div>
    </>
  );
}
