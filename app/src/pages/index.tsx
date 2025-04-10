import Head from "next/head";
import Image from "next/image";
import logo from "../../public/Bulge.svg";
import loadingLogo from "../../public/Bulge.gif"
import { useEffect, useState } from "react";
import RANKINGS from "./api/rankings";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import SELECTIONS from "./api/selections";
import { Player, Selection } from "@/typings/types";


export default function Home() {

  const [loading, setLoading] = useState(true);
  const [playerMap, setPlayerMap] = useState(new Map());

  useEffect(() => {
    const url = 'https://live-golf-data.p.rapidapi.com/leaderboard?orgId=1&tournId=014&year=2025';
    const options = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': '244f220674msh41be0771b7485eap152c23jsnad1ac3e6b553',
		    'x-rapidapi-host': 'live-golf-data.p.rapidapi.com'
	    }
    };
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setPlayerMap(createMap(json.leaderboardRows));
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
    return data.sort((a,  b) => playerMap.get(a)?.total - playerMap.get(b)?.total);
  }

  function sortPool(data: Selection[]) {
    return data.sort((a, b) => totalScore(a.selections) - totalScore(b.selections))
  }

  function getTier(data: number) {
    if (data === 3) return '3a';
    if (data === 4) return '3b';
    if (data === 5) return '4a';
    if (data === 6) return '4b';
    if (data === 7) return '5';
    return data;
  }

  useEffect(() => {
    if (playerMap) {
      RANKINGS.T1 = sortTiers(RANKINGS.T1);
      RANKINGS.T2 = sortTiers(RANKINGS.T2);
      RANKINGS.T3a = sortTiers(RANKINGS.T3a);
      RANKINGS.T3b = sortTiers(RANKINGS.T3b);
      RANKINGS.T4a = sortTiers(RANKINGS.T4a);
      RANKINGS.T4b = sortTiers(RANKINGS.T4b);
      RANKINGS.T5 = sortTiers(RANKINGS.T5);
    }
  }, [playerMap]);

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
              sortTiers(RANKINGS.T1)[0],
              sortTiers(RANKINGS.T2)[0],
              sortTiers(RANKINGS.T3a)[0],
              sortTiers(RANKINGS.T3b)[0],
              sortTiers(RANKINGS.T4a)[0],
              sortTiers(RANKINGS.T4b)[0],
              sortTiers(RANKINGS.T5)[0]
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
              <td>{sortTiers(RANKINGS.T1)[0]}</td>
              <td>{playerMap.get(sortTiers(RANKINGS.T1)[0])?.total ?? 0}</td>
            </tr>
            <tr className="player-score">
              <td>T2</td>
              <td>{sortTiers(RANKINGS.T2)[0]}</td>
              <td>{playerMap.get(sortTiers(RANKINGS.T2)[0])?.total ?? 0}</td>
            </tr>
            <tr className="player-score">
              <td>T3a</td>
              <td>{sortTiers(RANKINGS.T3a)[0]}</td>
              <td>{playerMap.get(sortTiers(RANKINGS.T3a)[0])?.total ?? 0}</td>
            </tr>
            <tr className="player-score">
              <td>T3b</td>
              <td>{sortTiers(RANKINGS.T3b)[0]}</td>
              <td>{playerMap.get(sortTiers(RANKINGS.T3b)[0])?.total ?? 0}</td>
            </tr>
            <tr className="player-score">
              <td>T4a</td>
              <td>{sortTiers(RANKINGS.T4a)[0]}</td>
              <td>{playerMap.get(sortTiers(RANKINGS.T4a)[0])?.total ?? 0}</td>
            </tr>
            <tr className="player-score">
              <td>T4b</td>
              <td>{sortTiers(RANKINGS.T4b)[0]}</td>
              <td>{playerMap.get(sortTiers(RANKINGS.T4b)[0])?.total ?? 0}</td>
            </tr>
            <tr className="player-score">
              <td>T5</td>
              <td>{sortTiers(RANKINGS.T5)[0]}</td>
              <td>{playerMap.get(sortTiers(RANKINGS.T5)[0])?.total ?? 0}</td>
            </tr>
            </tbody>
          </table>
          </Accordion.Body>
        </Accordion.Item>
        {sortPool(SELECTIONS).map((item, index) => {
            return (
              <Accordion.Item eventKey={index + 1 + ""} key={index}
              >
                <Accordion.Header>
                  <div className="total-score">{totalScore(item.selections)}</div>
                  <div>{item.name}</div>
                </Accordion.Header>
                <Accordion.Body>
                  {item.selections.map((player, index) => {
                    return (
                      <table className="scoreboard" key={player}>
                        <thead className="perfect-team-header"></thead>
                        <tbody>
                          <tr className="player-score">
                            <td className="tier-cell">T{getTier(index+1)}</td>
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
